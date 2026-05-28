# Network.framework — iOS 26 Essentials

> For deep reference: load `reference/network-reference.md`

---

## Correct Patterns (vs Common Mistakes)

| Concept | CORRECT | WRONG (Common Mistake) |
|---------|---------|------------------------|
| Connection queue | Dedicated `DispatchQueue` (serial) | `.global()` concurrent queue (causes data races) |
| Handler setup | Set `stateUpdateHandler` BEFORE `start()` | Setting handler after start (misses transitions) |
| `.waiting` state | NOT terminal — connection auto-retries on path change | Treating as fatal error |
| `.failed` state | IS terminal — must create new `NWConnection` | Calling `restart()` or reusing the connection |
| TCP receive | `receive(minimumIncompleteLength:maximumLength:)` | `receiveMessage()` for TCP (designed for UDP/framed) |
| UDP receive | `receiveMessage()` | `receive()` for UDP (may split datagrams) |
| Receive scheduling | Re-call receive in completion handler (fires exactly once) | Expecting continuous callbacks from a single call |
| Cleanup order | Set all handlers to `nil`, then `cancel()` | Just calling `cancel()` (gets spurious callbacks) |
| NWProtocolFramer | Implement `NWProtocolFramerImplementation` protocol | Subclassing or ad-hoc parsing |
| NWConnection Sendable | NOT Sendable — do not pass across isolation domains | Sharing between actors/tasks |
| Binary byte order | Always big-endian (network byte order) for protocols | Little-endian or host byte order |

---

## Crash Prevention Patterns

### 1. Set stateUpdateHandler BEFORE start()

```swift
// WRONG — misses state transitions, may never see .ready
connection.start(queue: networkQueue)
connection.stateUpdateHandler = { state in ... }

// RIGHT — handler first, then start
connection.stateUpdateHandler = { [weak self] state in
    switch state {
    case .ready:
        self?.startReceiving()
    case .failed(let error):
        self?.handleFailure(error)
    case .waiting(let error):
        // NOT fatal — connection will retry automatically
        print("Waiting: \(error)")
    case .cancelled:
        self?.cleanup()
    default:
        break
    }
}
connection.start(queue: networkQueue)
```

### 2. Continuous Receive Loop (TCP)

```swift
// WRONG — receive fires exactly once, no more data after first callback
connection.receive(minimumIncompleteLength: 1, maximumLength: 65536) { data, _, _, _ in
    if let data { processData(data) }
    // Missing: re-schedule receive!
}

// RIGHT — re-schedule in completion handler
func startReceiving() {
    connection.receive(minimumIncompleteLength: 1, maximumLength: 65536) {
        [weak self] data, context, isComplete, error in

        if let data = data, !data.isEmpty {
            self?.processData(data)
        }
        if isComplete {
            self?.handleConnectionClosed()
        } else if let error = error {
            self?.handleError(error)
        } else {
            self?.startReceiving()  // Schedule next receive
        }
    }
}
```

### 3. Proper Cleanup Pattern

```swift
// WRONG — calling cancel without clearing handlers causes spurious callbacks
connection.cancel()

// RIGHT — clear handlers first, then cancel
func disconnect() {
    connection.stateUpdateHandler = nil
    connection.pathUpdateHandler = nil
    connection.viabilityUpdateHandler = nil
    connection.betterPathUpdateHandler = nil
    connection.cancel()
}
```

### 4. NWListener Must Set newConnectionHandler

```swift
// WRONG — connections are silently rejected
let listener = try NWListener(using: .tcp, on: 8080)
listener.start(queue: queue)

// RIGHT — set handler before start
let listener = try NWListener(using: .tcp, on: 8080)
listener.newConnectionHandler = { [weak self] connection in
    self?.handleNewConnection(connection)
}
listener.stateUpdateHandler = { state in ... }
listener.start(queue: queue)
```

### 5. Never Use Global Concurrent Queue

```swift
// WRONG — data races in callbacks
connection.start(queue: .global())

// RIGHT — dedicated serial queue
let networkQueue = DispatchQueue(label: "com.myapp.network", qos: .userInitiated)
connection.start(queue: networkQueue)

// ALSO RIGHT — main queue for simple UI-driven use
connection.start(queue: .main)
```

---

## NWConnection State Machine

```
                +---------+
                |  setup  |  (initial state)
                +----+----+
                     | start(queue:)
                     v
                +---------+
           +--->|preparing|  (DNS, TCP handshake, TLS)
           |    +----+----+
           |         |
           |    +----+--------------------+
           |    |                          |
           |    v                          v
      +---------+                    +---------+
      | waiting |<--- retry -------->|  ready  |
      | (error) |    on change       |         |
      +----+----+                    +----+----+
           |                              |
           | unrecoverable                | cancel() or
           |                              | connection lost
           v                              v
      +---------+                    +---------+
      | failed  |                    |cancelled|
      | (error) |                    |         |
      +---------+                    +---------+
      (terminal)                     (terminal)
```

| State | Terminal? | Action |
|-------|-----------|--------|
| `.setup` | No | Call `start(queue:)` |
| `.preparing` | No | Wait |
| `.waiting(error)` | **No** | Auto-retries when network changes |
| `.ready` | No | Send/receive data |
| `.failed(error)` | **Yes** | Create new `NWConnection` |
| `.cancelled` | **Yes** | Create new `NWConnection` |

---

## NWProtocolFramer Quick Pattern

For custom binary protocols over TCP or UDP, implement `NWProtocolFramerImplementation`:

```swift
final class MyProtocolFramer: NWProtocolFramerImplementation {
    static let label = "MyProtocol"
    static let definition = NWProtocolFramer.Definition(implementation: MyProtocolFramer.self)

    private static let headerSize = 12

    required init(framer: NWProtocolFramer.Instance) {}

    func start(framer: NWProtocolFramer.Instance) -> NWProtocolFramer.StartResult { .ready }
    func stop(framer: NWProtocolFramer.Instance) -> Bool { true }
    func wakeup(framer: NWProtocolFramer.Instance) {}
    func cleanup(framer: NWProtocolFramer.Instance) {}

    func handleInput(framer: NWProtocolFramer.Instance) -> Int {
        while true {
            var packetLength = 0

            let parsed = framer.parseInput(
                minimumIncompleteLength: Self.headerSize,
                maximumLength: Self.headerSize
            ) { buffer, isComplete in
                guard let buffer = buffer, buffer.count >= Self.headerSize else { return 0 }
                let ptr = buffer.bindMemory(to: UInt8.self)
                packetLength = (Int(ptr[0] & 0x07) << 8) | Int(ptr[1])
                return Self.headerSize  // Consume header bytes
            }

            guard parsed, packetLength >= Self.headerSize else {
                return Self.headerSize  // Need more data
            }

            let message = NWProtocolFramer.Message(definition: Self.definition)
            let payloadLength = packetLength - Self.headerSize

            if payloadLength > 0 {
                guard framer.deliverInputNoCopy(
                    length: payloadLength, message: message, isComplete: true
                ) else {
                    return payloadLength
                }
            } else {
                framer.deliverInput(data: Data(), message: message, isComplete: true)
            }
        }
    }

    func handleOutput(
        framer: NWProtocolFramer.Instance,
        message: NWProtocolFramer.Message,
        messageLength: Int,
        isComplete: Bool
    ) {
        // Build header, write it, then pass through payload
        var header = Data(count: Self.headerSize)
        let totalLength = Self.headerSize + messageLength
        header[0] = UInt8((totalLength >> 8) & 0x07)
        header[1] = UInt8(totalLength & 0xFF)
        framer.writeOutput(data: header)
        if messageLength > 0 {
            try? framer.writeOutputNoCopy(length: messageLength)
        }
    }
}

// Add framer to NWParameters
let definition = NWProtocolFramer.Definition(implementation: MyProtocolFramer.self)
let framerOptions = NWProtocolFramer.Options(definition: definition)
let params = NWParameters(dtls: nil, udp: NWProtocolUDP.Options())
params.defaultProtocolStack.applicationProtocols.insert(framerOptions, at: 0)
```

---

## Known Gotchas

### Local Network Privacy (iOS 14+)
- **Must** add `NSLocalNetworkUsageDescription` to Info.plist
- **Must** add `NSBonjourServices` array if using `NWBrowser`
- Multicast requires `com.apple.developer.networking.multicast` entitlement (request from Apple)
- Simulator does NOT require entitlement; physical devices DO
- No direct API to check local network permission status
- Denial shows as `kDNSServiceErr_PolicyDenied` in `.waiting` state

### TCP receive() Can Return Partial Data
A single `send()` call may be split across multiple `receive()` callbacks. For binary protocols, always use length-prefixed framing or `NWProtocolFramer`. Do not assume one send equals one receive.

### receive() Fires Exactly Once
Each `receive()` / `receiveMessage()` call delivers exactly one callback. You must re-schedule in the callback for continuous reading. Forgetting this causes the app to stop receiving after one message.

### NWBrowser Has No .waiting State
Unlike `NWConnection` and `NWListener`, `NWBrowser` goes directly to `.ready` or `.failed`. Do not check for `.waiting` in browser state handlers.

### Binary Protocol Byte Order
All network protocols use big-endian (network byte order). Use `.bigEndian` on Swift integer types:

```swift
// Reading big-endian UInt16 from Data
let value = data.withUnsafeBytes {
    $0.load(fromByteOffset: offset, as: UInt16.self).bigEndian
}

// Writing big-endian UInt16 to Data
var bigEndian = value.bigEndian
withUnsafeBytes(of: &bigEndian) { bytes in
    for i in 0..<2 { data[offset + i] = bytes[i] }
}
```

### Swift 6 Strict Concurrency
- `NWConnection`, `NWListener`, `NWBrowser` are **NOT Sendable**
- `NWPath` and `NWError` ARE Sendable
- Use `@preconcurrency import Network` ONLY if the compiler specifically demands it on that import
- Bridge to `@MainActor` with `Task { @MainActor in ... }` for UI updates
- Wrap receive in `AsyncStream` for modern Swift concurrency patterns

### send() Completion Types
| Type | Behavior |
|------|----------|
| `.contentProcessed { error in }` | Callback when data is processed; use for flow control |
| `.idempotent` | No callback; framework may resend on failure (fire-and-forget) |

---

## Quick Checklist

### Connection Setup
- [ ] Set `stateUpdateHandler` BEFORE calling `start()`
- [ ] Use a dedicated serial `DispatchQueue` (not `.global()`)
- [ ] Handle ALL state cases (especially `.waiting` is NOT terminal)
- [ ] For NWListener: set `newConnectionHandler` BEFORE `start()`

### Data Transfer
- [ ] TCP: use `receive(minimumIncompleteLength:maximumLength:)` for streaming
- [ ] UDP: use `receiveMessage()` for complete datagrams
- [ ] Re-schedule `receive` in every completion handler
- [ ] Check `isComplete` flag to detect connection close (TCP FIN)
- [ ] Use `.contentProcessed` for flow control on send

### Binary Protocol
- [ ] Big-endian byte order for all multi-byte values
- [ ] Validate packet length before parsing
- [ ] Use `NWProtocolFramer` for structured protocol parsing
- [ ] Handle partial reads (TCP) or dropped packets (UDP)

### Cleanup
- [ ] Set all handlers to `nil` before calling `cancel()`
- [ ] Call `cancel()` on every NWConnection, NWListener, NWBrowser, NWConnectionGroup
- [ ] Remove strong references to cancelled objects
- [ ] Cancel `NWPathMonitor` when no longer needed

### Info.plist
- [ ] `NSLocalNetworkUsageDescription` with clear user-facing explanation
- [ ] `NSBonjourServices` array if using NWBrowser
- [ ] Multicast entitlement if using NWConnectionGroup

### Swift 6
- [ ] `@preconcurrency import Network` ONLY if the compiler specifically demands it
- [ ] Do NOT pass NWConnection across isolation boundaries
- [ ] Bridge callbacks to `@MainActor` with `Task { @MainActor in ... }`
- [ ] Wrap receive in `AsyncStream` for async/await patterns

---

### References

- [Network Framework](https://developer.apple.com/documentation/network)
- [NWConnection](https://developer.apple.com/documentation/network/nwconnection)
- [NWListener](https://developer.apple.com/documentation/network/nwlistener)
- [NWBrowser](https://developer.apple.com/documentation/network/nwbrowser)
- [NWProtocolFramer](https://developer.apple.com/documentation/network/nwprotocolframer)
- [NWConnectionGroup](https://developer.apple.com/documentation/network/nwconnectiongroup)
- [NWPathMonitor](https://developer.apple.com/documentation/network/nwpathmonitor)
- [WWDC18 Session 715: Introducing Network.framework](https://developer.apple.com/videos/play/wwdc2018/715/)
- [WWDC19 Session 713: Advances in Networking, Part 1](https://developer.apple.com/videos/play/wwdc2019/713/)
