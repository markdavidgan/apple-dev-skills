# Network.framework — Comprehensive Reference

> Full API reference for Network.framework on iOS 12+/26. For quick patterns, use essentials/network.md instead.
> Sources: Apple Developer Documentation, WWDC sessions

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [NWConnection (Bidirectional Data Connection)](#nwconnection-bidirectional-data-connection)
3. [NWListener (Incoming Connection Listener)](#nwlistener-incoming-connection-listener)
4. [NWBrowser (Service Discovery)](#nwbrowser-service-discovery)
5. [NWEndpoint (Network Addresses)](#nwendpoint-network-addresses)
6. [NWParameters (Connection Configuration)](#nwparameters-connection-configuration)
7. [Protocol Options (TCP, UDP, TLS)](#protocol-options-tcp-udp-tls)
8. [NWProtocolFramer (Custom Protocol Parsing)](#nwprotocolframer-custom-protocol-parsing)
9. [NWConnectionGroup and NWMulticastGroup (Multicast UDP)](#nwconnectiongroup-and-nwmulticastgroup-multicast-udp)
10. [NWPathMonitor (Network Path Monitoring)](#nwpathmonitor-network-path-monitoring)
11. [NWPath (Network Path State)](#nwpath-network-path-state)
12. [NWError (Error Types)](#nwerror-error-types)
13. [Connection Lifecycle State Machine](#connection-lifecycle-state-machine)
14. [Send and Receive Patterns](#send-and-receive-patterns)
15. [Binary Protocol Parsing Patterns](#binary-protocol-parsing-patterns)
16. [Local Network Privacy (Info.plist and Entitlements)](#local-network-privacy-infoplist-and-entitlements)
17. [Thread Safety and Swift 6 Concurrency](#thread-safety-and-swift-6-concurrency)
18. [Binary Protocol over UDP Transport Reference](#binary-protocol-over-udp-transport-reference)
19. [Complete Working Examples](#complete-working-examples)
20. [Crash Prevention Checklist](#crash-prevention-checklist)

---

## Architecture Overview

Network.framework (introduced iOS 12, macOS 10.14) replaces BSD sockets with a modern, asynchronous networking API. It provides:

- **Connection-oriented networking** via `NWConnection` (TCP and UDP)
- **Listener/server functionality** via `NWListener`
- **Service discovery** via `NWBrowser` (Bonjour/mDNS)
- **Multicast group communication** via `NWConnectionGroup` (iOS 14+)
- **Network path monitoring** via `NWPathMonitor`
- **Custom protocol framing** via `NWProtocolFramer` (iOS 13+)
- **TLS/DTLS integration** built into the protocol stack

```
Application Layer
    │
    ├── NWConnection ──── send/receive data ──── NWEndpoint (remote)
    │       │
    │       ├── stateUpdateHandler  (connection lifecycle)
    │       ├── pathUpdateHandler   (network path changes)
    │       └── viabilityUpdateHandler (connection health)
    │
    ├── NWListener ──── accept connections ──── newConnectionHandler
    │       │
    │       └── serviceRegistrationUpdateHandler (Bonjour)
    │
    ├── NWBrowser ──── discover services ──── browseResultsChangedHandler
    │
    └── NWConnectionGroup ──── multicast ──── setReceiveHandler
            │
            └── NWMulticastGroup (IP multicast descriptor)

Protocol Stack (configured via NWParameters)
    │
    ├── Application Protocols:  NWProtocolFramer.Options (custom)
    ├── Transport Protocol:     NWProtocolTCP.Options / NWProtocolUDP.Options
    ├── Security Protocol:      NWProtocolTLS.Options (TLS/DTLS)
    └── Internet Protocol:      NWProtocolIP.Options
```

### Platform Availability

| Component | iOS | macOS | watchOS | tvOS |
|-----------|-----|-------|---------|------|
| NWConnection | 12.0+ | 10.14+ | 5.0+ | 12.0+ |
| NWListener | 12.0+ | 10.14+ | 5.0+ | 12.0+ |
| NWBrowser | 13.0+ | 10.15+ | 6.0+ | 13.0+ |
| NWProtocolFramer | 13.0+ | 10.15+ | 6.0+ | 13.0+ |
| NWConnectionGroup | 14.0+ | 11.0+ | 7.0+ | 14.0+ |
| NWMulticastGroup | 14.0+ | 11.0+ | 7.0+ | 14.0+ |
| NWPathMonitor | 12.0+ | 10.14+ | 5.0+ | 12.0+ |

### Key Design Principles

- **Asynchronous by default:** All operations use completion handlers on specified dispatch queues
- **Queue-based threading:** Every object requires a dispatch queue at start time; all callbacks fire on that queue
- **Explicit lifecycle:** Objects must be started and cancelled; no automatic cleanup
- **Protocol stack composition:** Layers stack (IP -> TCP/UDP -> TLS -> Custom Framer -> Application)
- **No BSD socket exposure:** The framework manages file descriptors internally

---

## NWConnection (Bidirectional Data Connection)

The primary object for reading and writing data between a local and remote endpoint.

### Declaration

```swift
@available(macOS 10.14, iOS 12.0, watchOS 5.0, tvOS 12.0, *)
public final class NWConnection : CustomDebugStringConvertible
```

### Initializers

```swift
// Connect to a specific endpoint (most flexible)
public init(to: NWEndpoint, using: NWParameters)

// Convenience: connect to host and port
public convenience init(host: NWEndpoint.Host, port: NWEndpoint.Port, using: NWParameters)
```

### Properties

```swift
// Immutable (set at creation)
public let endpoint: NWEndpoint              // The remote endpoint
public let parameters: NWParameters          // Connection parameters

// State
public var state: NWConnection.State         // Current connection state (read-only)
public var queue: DispatchQueue?             // Queue for callbacks (read-only, set at start)

// Path information
public var currentPath: NWPath?              // Current network path (read-only)

// UDP-specific
@available(macOS 10.15, iOS 13.0, watchOS 6.0, tvOS 13.0, *)
public var maximumDatagramSize: Int          // Max UDP datagram size for current path
```

### Handler Properties

```swift
// Connection state changes (CRITICAL - set before calling start)
public var stateUpdateHandler: ((_ state: NWConnection.State) -> Void)?

// Network path changes
public var pathUpdateHandler: ((_ newPath: NWPath) -> Void)?

// Connection viability (can data still flow?)
public var viabilityUpdateHandler: ((_ isViable: Bool) -> Void)?

// Better path available (e.g., WiFi became available while on cellular)
public var betterPathUpdateHandler: ((_ betterPathAvailable: Bool) -> Void)?
```

### Lifecycle Methods

```swift
// Start the connection (begins resolution, handshake, etc.)
// IMPORTANT: Set stateUpdateHandler BEFORE calling start
public func start(queue: DispatchQueue)

// Graceful close (waits for pending operations)
public func cancel()

// Immediate close (drops pending operations)
public func forceCancel()

// Cancel current endpoint and try next resolved address
public func cancelCurrentEndpoint()

// Restart a failed/cancelled connection
public func restart()
```

### Send Methods

```swift
// Send data with context and completion
public func send(
    content: Data?,
    contentContext: NWConnection.ContentContext = .defaultMessage,
    isComplete: Bool = true,
    completion: NWConnection.SendCompletion
)

// Generic version accepting any DataProtocol
public func send<Content: DataProtocol>(
    content: Content?,
    contentContext: NWConnection.ContentContext = .defaultMessage,
    isComplete: Bool = true,
    completion: NWConnection.SendCompletion
)
```

### Receive Methods

```swift
// Receive with byte range (for streaming protocols like TCP)
public func receive(
    minimumIncompleteLength: Int,
    maximumLength: Int,
    completion: @escaping (
        _ content: Data?,
        _ contentContext: NWConnection.ContentContext?,
        _ isComplete: Bool,
        _ error: NWError?
    ) -> Void
)

// Receive a complete message (for message-oriented protocols like UDP)
public func receiveMessage(
    completion: @escaping (
        _ completeContent: Data?,
        _ contentContext: NWConnection.ContentContext?,
        _ isComplete: Bool,
        _ error: NWError?
    ) -> Void
)
```

### Utility Methods

```swift
// Batch multiple send/receive calls for efficiency
public func batch(_ block: () -> Void)

// Access protocol-specific metadata
public func metadata(definition: NWProtocolDefinition) -> NWProtocolMetadata?

// Connection establishment diagnostics (iOS 13+)
@available(macOS 10.15, iOS 13.0, watchOS 6.0, tvOS 13.0, *)
public func requestEstablishmentReport(
    queue: DispatchQueue,
    completion: @escaping (NWConnection.EstablishmentReport?) -> Void
)

// Data transfer performance monitoring (iOS 13+)
@available(macOS 10.15, iOS 13.0, watchOS 6.0, tvOS 13.0, *)
public func startDataTransferReport() -> NWConnection.PendingDataTransferReport
```

### State Enum

```swift
public enum State : Equatable {
    case setup             // Initial state, connection not yet started
    case waiting(NWError)  // Waiting for network conditions (retryable)
    case preparing         // Resolving, connecting, handshaking
    case ready             // Connection established, can send/receive
    case failed(NWError)   // Unrecoverable error
    case cancelled         // Explicitly cancelled by the app
}
```

### SendCompletion Enum

```swift
public enum SendCompletion {
    // Callback when content has been processed by the protocol stack
    case contentProcessed((_ error: NWError?) -> Void)
    
    // No callback; content may be re-sent on failure (safe for idempotent data)
    case idempotent
}
```

### ContentContext Class

Controls how data is sent and provides access to protocol metadata.

```swift
public class ContentContext {
    // Properties
    public let identifier: String
    public let expirationMilliseconds: UInt64
    public let relativePriority: Double       // 0.0 to 1.0
    public let antecedent: NWConnection.ContentContext?
    public let isFinal: Bool
    public var protocolMetadata: [NWProtocolMetadata]
    
    // Full initializer
    public init(
        identifier: String,
        expiration: UInt64 = 0,
        priority: Double = 0.5,
        isFinal: Bool = false,
        antecedent: NWConnection.ContentContext? = nil,
        metadata: [NWProtocolMetadata]? = []
    )
    
    // Access metadata for a specific protocol
    public func protocolMetadata(definition: NWProtocolDefinition) -> NWProtocolMetadata?
    
    // Predefined contexts
    public static let defaultMessage: NWConnection.ContentContext
    public static let finalMessage: NWConnection.ContentContext   // isFinal = true
    public static let defaultStream: NWConnection.ContentContext
}
```

**Context usage guide:**

| Context | Use When | Protocol |
|---------|----------|----------|
| `.defaultMessage` | Sending a discrete message (default) | TCP or UDP |
| `.finalMessage` | Last message before closing (sends FIN for TCP) | TCP |
| `.defaultStream` | Continuous stream of data chunks | TCP |
| Custom context | Need priority, expiration, or protocol metadata | Any |

### EstablishmentReport (iOS 13+)

```swift
@available(macOS 10.15, iOS 13.0, watchOS 6.0, tvOS 13.0, *)
public struct EstablishmentReport {
    public let duration: TimeInterval
    public let attemptStartedAfterInterval: TimeInterval
    public let previousAttemptCount: Int
    public let usedProxy: Bool
    public let proxyConfigured: Bool
    public let proxyEndpoint: NWEndpoint?
    public let resolutions: [Resolution]
    public let handshakes: [Handshake]
}
```

---

## NWListener (Incoming Connection Listener)

Listens for incoming network connections. The Network.framework equivalent of a passive socket / `accept()` loop.

### Declaration

```swift
@available(macOS 10.14, iOS 12.0, watchOS 5.0, tvOS 12.0, *)
public final class NWListener : CustomDebugStringConvertible
```

### Initializers

```swift
// Listen with parameters and optional specific port
public init(using: NWParameters, on: NWEndpoint.Port = .any) throws
```

### Properties

```swift
// Configuration (immutable)
public let parameters: NWParameters

// State
public var port: NWEndpoint.Port?            // Assigned port (available after .ready)
public var queue: DispatchQueue?             // Callback queue (read-only)

// Bonjour service registration
public var service: NWListener.Service?      // Bonjour service to advertise

// Connection limit (iOS 13+)
@available(macOS 10.15, iOS 13.0, watchOS 6.0, tvOS 13.0, *)
public var newConnectionLimit: Int           // Max pending connections (default: unlimited)
```

### Handler Properties

```swift
// CRITICAL: Set BEFORE calling start()
public var stateUpdateHandler: ((NWListener.State) -> Void)?

// Called for each new incoming connection
// CRITICAL: You MUST set this or connections will be rejected
public var newConnectionHandler: ((NWConnection) -> Void)?

// Bonjour service registration changes
public var serviceRegistrationUpdateHandler: ((NWListener.ServiceRegistrationChange) -> Void)?
```

### Methods

```swift
public func start(queue: DispatchQueue)
public func cancel()
```

### State Enum

```swift
public enum State : Equatable {
    case setup
    case waiting(NWError)
    case ready              // Listening and accepting connections
    case failed(NWError)
    case cancelled
}
```

### Service Struct (Bonjour Registration)

```swift
public struct Service {
    public var name: String?        // nil = system-assigned name
    public var type: String         // e.g., "_myapp._tcp"
    public var domain: String?      // nil = default domain
    public var txtRecord: Data?     // Raw TXT record data
    
    @available(macOS 10.15, iOS 13.0, watchOS 6.0, tvOS 13.0, *)
    public var txtRecordObject: NWTXTRecord?
    
    @available(macOS 10.15, iOS 13.0, watchOS 6.0, tvOS 13.0, *)
    public var noAutoRename: Bool   // Prevent auto-rename on conflict
    
    public init(
        name: String? = nil,
        type: String,
        domain: String? = nil,
        txtRecord: Data? = nil
    )
    
    @available(macOS 10.15, iOS 13.0, watchOS 6.0, tvOS 13.0, *)
    public init(
        name: String? = nil,
        type: String,
        domain: String? = nil,
        txtRecord: NWTXTRecord
    )
}
```

### ServiceRegistrationChange Enum

```swift
public enum ServiceRegistrationChange {
    case add(NWEndpoint)     // Service was registered
    case remove(NWEndpoint)  // Service was unregistered
}
```

---

## NWBrowser (Service Discovery)

Discovers network services on the local network using Bonjour (mDNS/DNS-SD).

### Declaration

```swift
@available(macOS 10.15, iOS 13.0, watchOS 6.0, tvOS 13.0, *)
public final class NWBrowser : CustomDebugStringConvertible
```

### Initializer

```swift
public init(for descriptor: NWBrowser.Descriptor, using parameters: NWParameters)
```

### Properties

```swift
public let descriptor: NWBrowser.Descriptor        // What to browse for
public let parameters: NWParameters                // Browse parameters
public var state: NWBrowser.State                  // Current state (read-only)
public var browseResults: Set<NWBrowser.Result>    // Current results (read-only)
public var queue: DispatchQueue?                   // Callback queue
```

### Handler Properties

```swift
public var stateUpdateHandler: ((NWBrowser.State) -> Void)?

// Called when browse results change
// Parameters: (currentResults, setOfChanges)
public var browseResultsChangedHandler: ((Set<NWBrowser.Result>, Set<NWBrowser.Result.Change>) -> Void)?
```

### Methods

```swift
public func start(queue: DispatchQueue)
public func cancel()
```

### Descriptor Enum

```swift
public enum Descriptor : Equatable {
    // Browse for Bonjour services (metadata not included)
    case bonjour(type: String, domain: String?)
    
    // Browse for Bonjour services with TXT record metadata
    case bonjourWithTXTRecord(type: String, domain: String?)
}
```

### Result Struct

```swift
public struct Result : Hashable {
    public let endpoint: NWEndpoint              // Discovered endpoint
    public let interfaces: [NWInterface]         // Available interfaces
    public let metadata: NWBrowser.Result.Metadata
    
    public enum Metadata : Equatable {
        case none
        case bonjour(_ record: NWTXTRecord)
    }
    
    public enum Change : Equatable {
        case identical
        case added(NWBrowser.Result)
        case removed(NWBrowser.Result)
        case changed(old: Result, new: Result, flags: Change.Flags)
        
        public struct Flags : OptionSet {
            public static let identical: Flags
            public static let interfaceAdded: Flags
            public static let interfaceRemoved: Flags
            public static let metadataChanged: Flags
        }
    }
}
```

### State Enum

```swift
public enum State : Equatable {
    case setup
    case ready           // Actively browsing
    case failed(NWError)
    case cancelled
    // Note: NWBrowser does NOT have a .waiting state (unlike NWConnection/NWListener)
}
```

---

## NWEndpoint (Network Addresses)

Represents a network address that a connection can reach. This is an enum with multiple cases for different address types.

### Declaration

```swift
@available(macOS 10.14, iOS 12.0, watchOS 5.0, tvOS 12.0, *)
public enum NWEndpoint : Hashable, CustomDebugStringConvertible
```

### Enum Cases

```swift
public enum NWEndpoint {
    // IP host and port (most common for direct connections)
    case hostPort(host: NWEndpoint.Host, port: NWEndpoint.Port)
    
    // Bonjour service (discovered via NWBrowser)
    case service(name: String, type: String, domain: String, interface: NWInterface?)
    
    // Unix domain socket
    case unix(path: String)
    
    // URL-based endpoint (iOS 13+)
    @available(macOS 10.15, iOS 13.0, watchOS 6.0, tvOS 13.0, *)
    case url(_ url: URL)
}
```

### Properties

```swift
public var interface: NWInterface? { get }   // Scoped interface (if any)
public var debugDescription: String { get }
```

### NWEndpoint.Host

```swift
public enum Host : Hashable, CustomDebugStringConvertible, ExpressibleByStringLiteral {
    case name(String, NWInterface?)      // Hostname (resolved via DNS)
    case ipv4(IPv4Address)               // IPv4 address
    case ipv6(IPv6Address)               // IPv6 address
    
    // Create from string (auto-detects IP vs hostname)
    public init(_ string: String)
    public init(stringLiteral: String)
    
    public var interface: NWInterface? { get }
}
```

### NWEndpoint.Port

```swift
public struct Port : Hashable, CustomDebugStringConvertible, 
                     ExpressibleByIntegerLiteral, RawRepresentable {
    public var rawValue: UInt16
    
    public init?(rawValue: UInt16)
    public init(integerLiteral: UInt16)
    public init?(_ string: String)       // From service name (e.g., "http")
    
    // Well-known ports
    public static let any: Port          // 0 (system-assigned)
    public static let ssh: Port          // 22
    public static let smtp: Port         // 25
    public static let http: Port         // 80
    public static let pop: Port          // 110
    public static let imap: Port         // 143
    public static let https: Port        // 443
    public static let imaps: Port        // 993
    public static let socks: Port        // 1080
}
```

### IPv4Address and IPv6Address

```swift
// IPv4 static addresses
public struct IPv4Address {
    public static let any: IPv4Address           // 0.0.0.0
    public static let broadcast: IPv4Address     // 255.255.255.255
    public static let loopback: IPv4Address      // 127.0.0.1
    public static let allHostsGroup: IPv4Address // 224.0.0.1
    public static let allRoutersGroup: IPv4Address // 224.0.0.2
    public static let allReportsGroup: IPv4Address
    public static let mdnsGroup: IPv4Address     // 224.0.0.251
    
    public init?(_ string: String)
    public init(_ rawValue: in_addr, _ interface: NWInterface? = nil)
}

// IPv6 static addresses
public struct IPv6Address {
    public static let any: IPv6Address
    public static let broadcast: IPv6Address
    public static let loopback: IPv6Address
    public static let nodeLocalNodes: IPv6Address
    public static let linkLocalNodes: IPv6Address
    public static let linkLocalRouters: IPv6Address
    
    public var isLinkLocal: Bool
    public var isMulticast: Bool
    public var isIPv4Mapped: Bool
    public var asIPv4: IPv4Address?
    public var multicastScope: Scope?
    
    public enum Scope {
        case nodeLocal, linkLocal, siteLocal, organizationLocal, global
    }
}
```

---

## NWParameters (Connection Configuration)

Configures the protocol stack and connection behavior. This is the central configuration object passed to NWConnection, NWListener, and NWBrowser.

### Declaration

```swift
@available(macOS 10.14, iOS 12.0, watchOS 5.0, tvOS 12.0, *)
public final class NWParameters : CustomDebugStringConvertible
```

### Initializers

```swift
// Empty parameters (configure manually)
public init()

// TCP with optional TLS
public convenience init(
    tls: NWProtocolTLS.Options?,
    tcp: NWProtocolTCP.Options = NWProtocolTCP.Options()
)

// UDP with optional DTLS
public convenience init(
    dtls: NWProtocolTLS.Options?,
    udp: NWProtocolUDP.Options = NWProtocolUDP.Options()
)
```

### Factory Properties (Convenience)

```swift
public class var tcp: NWParameters { get }    // Plain TCP (no TLS)
public class var udp: NWParameters { get }    // Plain UDP (no DTLS)
public class var tls: NWParameters { get }    // TCP + TLS
public class var dtls: NWParameters { get }   // UDP + DTLS
```

### Interface Filtering

```swift
// Require a specific interface
public var requiredInterface: NWInterface?

// Require a specific interface type
public var requiredInterfaceType: NWInterface.InterfaceType  // .wifi, .cellular, etc.

// Exclude specific interfaces
public var prohibitedInterfaces: [NWInterface]?

// Exclude specific interface types
public var prohibitedInterfaceTypes: [NWInterface.InterfaceType]?
```

### Path Constraints

```swift
// Block expensive paths (cellular, hotspot)
public var prohibitExpensivePaths: Bool

// Block constrained paths (Low Data Mode) — iOS 13+
@available(macOS 10.15, iOS 13.0, watchOS 6.0, tvOS 13.0, *)
public var prohibitConstrainedPaths: Bool

// Bypass proxies
public var preferNoProxies: Bool
```

### Local Endpoint and Reuse

```swift
// Bind to a specific local address/port
public var requiredLocalEndpoint: NWEndpoint?

// Allow port reuse (SO_REUSEADDR / SO_REUSEPORT equivalent)
public var allowLocalEndpointReuse: Bool

// Only accept connections from the local machine
public var acceptLocalOnly: Bool
```

### Service Configuration

```swift
// Include peer-to-peer interfaces (Bluetooth, WiFi Direct)
public var includePeerToPeer: Bool

// QoS class for the connection
public var serviceClass: NWParameters.ServiceClass

// Multipath TCP service type
public var multipathServiceType: NWParameters.MultipathServiceType

// TCP Fast Open (TFO)
public var allowFastOpen: Bool

// DNS behavior when cached records expire
public var expiredDNSBehavior: NWParameters.ExpiredDNSBehavior
```

### Protocol Stack

```swift
// Access the full protocol stack for customization
public var defaultProtocolStack: NWParameters.ProtocolStack

// Copy parameters (for creating variants)
public func copy() -> NWParameters
```

### ServiceClass Enum

```swift
public enum ServiceClass {
    case bestEffort         // Default
    case background         // Bulk data, low priority
    case interactiveVideo   // Video streaming, low latency
    case interactiveVoice   // Voice, lowest latency
    case responsiveData     // User-initiated, important
    case signaling          // Control signaling
}
```

### MultipathServiceType Enum

```swift
public enum MultipathServiceType {
    case disabled           // No multipath (default)
    case handover           // Seamless handover between interfaces
    case interactive        // Low-latency interactive traffic
    case aggregate          // Aggregate bandwidth across interfaces
}
```

### ExpiredDNSBehavior Enum

```swift
public enum ExpiredDNSBehavior {
    case systemDefault
    case allow              // Use expired DNS records
    case prohibit           // Require fresh DNS resolution
}
```

### ProtocolStack Class

```swift
public class ProtocolStack {
    // Application-level protocols (custom framers go here)
    public var applicationProtocols: [NWProtocolOptions]
    
    // Transport protocol (TCP or UDP)
    public var transportProtocol: NWProtocolOptions?
    
    // Internet protocol (IP options)
    public var internetProtocol: NWProtocolOptions?
}
```

---

## Protocol Options (TCP, UDP, TLS)

### NWProtocolTCP.Options

```swift
@available(macOS 10.14, iOS 12.0, watchOS 5.0, tvOS 12.0, *)
public class NWProtocolTCP.Options : NWProtocolOptions {
    public init()
    
    // Disable Nagle's algorithm (send immediately, don't buffer small packets)
    // CRITICAL for low-latency protocols like hardware device control
    public var noDelay: Bool                    // Default: false
    
    // Disable connection timeout
    public var noPush: Bool                     // Default: false
    
    // Enable TCP keepalive
    public var enableKeepalive: Bool            // Default: false
    
    // Seconds of idle before first keepalive probe
    public var keepaliveIdle: Int               // Default: system
    
    // Seconds between keepalive probes
    public var keepaliveInterval: Int           // Default: system
    
    // Number of keepalive probes before considering dead
    public var keepaliveCount: Int              // Default: system
    
    // Connection timeout in seconds
    public var connectionTimeout: Int           // Default: system
    
    // Persist timeout in seconds
    public var persistTimeout: Int
    
    // Retransmit connection drops
    public var retransmitConnectionDropTime: Int
    
    // Retransmit fin drop
    public var retransmitFinDrop: Bool
    
    // Disable ECN (Explicit Congestion Notification)
    public var disableECN: Bool
    
    // Enable TCP Fast Open
    public var enableFastOpen: Bool
    
    // Disable Acknowledgment Stretching
    public var disableAckStretching: Bool
    
    // Maximum segment size
    public var maximumSegmentSize: Int
}
```

### NWProtocolUDP.Options

```swift
@available(macOS 10.14, iOS 12.0, watchOS 5.0, tvOS 12.0, *)
public class NWProtocolUDP.Options : NWProtocolOptions {
    public init()
    
    // Prefer not to fragment packets
    public var preferNoChecksum: Bool           // Default: false
}
```

### NWProtocolTLS.Options

```swift
@available(macOS 10.14, iOS 12.0, watchOS 5.0, tvOS 12.0, *)
public class NWProtocolTLS.Options : NWProtocolOptions {
    public init()
    
    // Access the Security framework options
    public var securityProtocolOptions: sec_protocol_options_t
}
```

**Configuring TLS:**
```swift
let tlsOptions = NWProtocolTLS.Options()

// Set minimum TLS version
sec_protocol_options_set_min_tls_protocol_version(
    tlsOptions.securityProtocolOptions,
    .TLSv12
)

// Skip certificate verification (development only!)
sec_protocol_options_set_verify_block(
    tlsOptions.securityProtocolOptions,
    { _, _, completion in completion(true) },
    .main
)

let params = NWParameters(tls: tlsOptions, tcp: NWProtocolTCP.Options())
```

---

## NWProtocolFramer (Custom Protocol Parsing)

Defines custom application-level protocol parsers that integrate into the Network.framework protocol stack. This is the key component for implementing binary protocols over TCP or UDP.

### Available iOS 13.0+, macOS 10.15+

### NWProtocolFramerImplementation Protocol

```swift
public protocol NWProtocolFramerImplementation : AnyObject {
    // Unique label for debugging/logging
    static var label: String { get }
    
    // Create a new instance for a connection
    init(framer: NWProtocolFramer.Instance)
    
    // Called when the framer is ready to start
    // Return .ready if immediately ready, .willMarkReady if async
    func start(framer: NWProtocolFramer.Instance) -> NWProtocolFramer.StartResult
    
    // Called when incoming data is available
    // Return: number of additional bytes needed before calling again
    func handleInput(framer: NWProtocolFramer.Instance) -> Int
    
    // Called when the application sends data
    func handleOutput(
        framer: NWProtocolFramer.Instance,
        message: NWProtocolFramer.Message,
        messageLength: Int,
        isComplete: Bool
    )
    
    // Called on scheduled wakeup
    func wakeup(framer: NWProtocolFramer.Instance)
    
    // Called when the framer should stop
    // Return true if stopped immediately, false if async
    func stop(framer: NWProtocolFramer.Instance) -> Bool
    
    // Called for final cleanup
    func cleanup(framer: NWProtocolFramer.Instance)
}
```

### NWProtocolFramer.Definition

```swift
public class Definition : NWProtocolDefinition {
    public init(implementation: NWProtocolFramerImplementation.Type)
}
```

### NWProtocolFramer.Options

```swift
public class Options : NWProtocolOptions {
    public init(definition: NWProtocolFramer.Definition)
}
```

### NWProtocolFramer.Instance

The handle passed to all framer callbacks. Provides parsing and output methods.

```swift
public class Instance {
    // Mark the framer as ready (if start returned .willMarkReady)
    public func markReady()
    
    // Mark the framer as failed
    public func markFailed(error: NWError?)
    
    // --- INPUT PARSING ---
    
    // Parse incoming data from the transport
    // minimumIncompleteLength: min bytes before the parse block is called
    // maximumLength: max bytes to deliver to the parse block
    // parse closure returns: number of bytes consumed (0 = need more data)
    // Returns: true if parse block was called, false if not enough data
    public func parseInput(
        minimumIncompleteLength: Int,
        maximumLength: Int,
        parse: (UnsafeMutableRawBufferPointer?, Bool) -> Int
    ) -> Bool
    
    // Deliver parsed data to the application layer (copies data)
    public func deliverInput(
        data: Data,
        message: NWProtocolFramer.Message,
        isComplete: Bool
    )
    
    // Deliver parsed data without copying (zero-copy, more efficient)
    // length: number of bytes from the current parse position to deliver
    public func deliverInputNoCopy(
        length: Int,
        message: NWProtocolFramer.Message,
        isComplete: Bool
    ) -> Bool
    
    // Pass all remaining input through without framing
    public func passThroughInput()
    
    // --- OUTPUT WRITING ---
    
    // Parse outgoing data from the application layer
    public func parseOutput(
        minimumIncompleteLength: Int,
        maximumLength: Int,
        parse: (UnsafeMutableRawBufferPointer?, Bool) -> Int
    ) -> Bool
    
    // Write data to the transport layer
    public func writeOutput(data: Data)
    
    // Generic version for any DataProtocol
    public func writeOutput<Output: DataProtocol>(data: Output)
    
    // Write data from the current output buffer without copying
    public func writeOutputNoCopy(length: Int) throws
    
    // Pass all remaining output through without framing
    public func passThroughOutput()
    
    // --- SCHEDULING ---
    
    // Schedule a wakeup call
    public func scheduleWakeup(wakeupTime: NWProtocolFramer.WakeupTime)
    
    // Execute a block asynchronously on the framer's queue
    public func async(execute: @escaping () -> Void)
    
    // Prepend a protocol to the stack
    public func prependApplicationProtocol(options: NWProtocolOptions) throws
    
    // --- ENDPOINT ACCESS ---
    
    public var remote: NWEndpoint? { get }
    public var local: NWEndpoint? { get }
    public var parameters: NWParameters? { get }
}
```

### NWProtocolFramer.Message

Carries protocol-specific metadata between the framer and application code.

```swift
public class Message : NWProtocolMetadata {
    public init(definition: NWProtocolFramer.Definition)
    public init(instance: NWProtocolFramer.Instance)
    
    // Key-value storage for custom metadata
    public subscript(key: String) -> Any?
}
```

### NWProtocolFramer.WakeupTime

```swift
public enum WakeupTime {
    case milliseconds(UInt64)
    case forever                 // Never wake up
}
```

### NWProtocolFramer.StartResult

```swift
public enum StartResult {
    case ready                   // Framer is immediately ready
    case willMarkReady           // Framer will call markReady() later
}
```

### Adding a Framer to NWParameters

```swift
let definition = NWProtocolFramer.Definition(implementation: MyProtocol.self)
let framerOptions = NWProtocolFramer.Options(definition: definition)

// For TCP:
let params = NWParameters(tls: nil, tcp: NWProtocolTCP.Options())
params.defaultProtocolStack.applicationProtocols.insert(framerOptions, at: 0)

// For UDP:
let params = NWParameters(dtls: nil, udp: NWProtocolUDP.Options())
params.defaultProtocolStack.applicationProtocols.insert(framerOptions, at: 0)
```

### Accessing Framer Metadata in Application Code

```swift
connection.receiveMessage { data, context, isComplete, error in
    guard let message = context?.protocolMetadata(
        definition: MyProtocol.definition
    ) as? NWProtocolFramer.Message else { return }
    
    // Access custom metadata
    let myValue = message["myKey"] as? MyType
}
```

---

## NWConnectionGroup and NWMulticastGroup (Multicast UDP)

For joining IP multicast groups and sending/receiving multicast UDP packets.

### NWMulticastGroup

```swift
@available(macOS 11.0, iOS 14.0, watchOS 7.0, tvOS 14.0, *)
public class NWMulticastGroup {
    // Create from one or more multicast endpoints
    public init(for endpoints: [NWEndpoint]) throws
    
    // Create from a single endpoint
    public init(for endpoint: NWEndpoint) throws
}
```

### NWConnectionGroup

```swift
@available(macOS 11.0, iOS 14.0, watchOS 7.0, tvOS 14.0, *)
public final class NWConnectionGroup {
    // Create a connection group from a multicast group descriptor
    public init(from multicastGroup: NWMulticastGroup, using parameters: NWParameters)
    
    // State
    public var stateUpdateHandler: ((NWConnectionGroup.State) -> Void)?
    
    // Start/stop
    public func start(queue: DispatchQueue)
    public func cancel()
    
    // Set receive handler for incoming multicast messages
    public func setReceiveHandler(
        maximumMessageSize: Int,
        rejectOversizedMessages: Bool,
        handler: @escaping (
            _ message: NWConnectionGroup.Message,
            _ content: Data?,
            _ isComplete: Bool
        ) -> Void
    )
    
    // Send to the entire multicast group
    public func send(
        content: Data?,
        to: NWEndpoint? = nil,          // nil = send to group
        completion: @escaping (NWError?) -> Void
    )
}
```

### NWConnectionGroup.Message

```swift
public class Message {
    // The endpoint that sent this message
    public var remoteEndpoint: NWEndpoint? { get }
    
    // Reply to the sender
    public func reply(content: Data?)
    
    // Extract a new connection from this group member
    public func extractConnection() -> NWConnection?
}
```

### NWConnectionGroup.State

```swift
public enum State {
    case setup
    case waiting(NWError)
    case ready
    case failed(NWError)
    case cancelled
}
```

### Complete Multicast Example

```swift
import Network

// REQUIRES: com.apple.developer.networking.multicast entitlement

// Step 1: Create multicast group descriptor
guard let multicastGroup = try? NWMulticastGroup(
    for: [.hostPort(host: "239.255.0.1", port: 9910)]
) else {
    fatalError("Failed to create multicast group")
}

// Step 2: Create connection group with UDP
let group = NWConnectionGroup(from: multicastGroup, using: .udp)

// Step 3: Set receive handler
group.setReceiveHandler(maximumMessageSize: 16384, rejectOversizedMessages: true) {
    message, content, isComplete in
    
    if let data = content {
        print("Received \(data.count) bytes from \(message.remoteEndpoint?.debugDescription ?? "unknown")")
    }
    
    // Optionally reply to sender
    message.reply(content: Data("ACK".utf8))
}

// Step 4: Monitor state
group.stateUpdateHandler = { state in
    switch state {
    case .ready:
        print("Joined multicast group")
    case .failed(let error):
        print("Multicast group failed: \(error)")
    default:
        break
    }
}

// Step 5: Start
group.start(queue: .main)

// Step 6: Send to group
group.send(content: Data("discovery".utf8)) { error in
    if let error = error {
        print("Multicast send error: \(error)")
    }
}

// Step 7: Cleanup
// group.cancel()
```

---

## NWPathMonitor (Network Path Monitoring)

Monitors network interface changes and connectivity.

### Declaration

```swift
@available(macOS 10.14, iOS 12.0, watchOS 5.0, tvOS 12.0, *)
public final class NWPathMonitor
```

### Initializers

```swift
// Monitor all interface types
public init()

// Monitor a specific interface type
public init(requiredInterfaceType: NWInterface.InterfaceType)
```

### Properties

```swift
public var currentPath: NWPath                          // Current network path
public var pathUpdateHandler: ((NWPath) -> Void)?       // Path change callback
public var queue: DispatchQueue?                        // Callback queue
```

### Methods

```swift
public func start(queue: DispatchQueue)
public func cancel()
```

### Usage Example

```swift
let monitor = NWPathMonitor()

monitor.pathUpdateHandler = { path in
    switch path.status {
    case .satisfied:
        print("Network available")
        if path.usesInterfaceType(.wifi) {
            print("Connected via WiFi")
        } else if path.usesInterfaceType(.cellular) {
            print("Connected via Cellular")
        }
    case .unsatisfied:
        print("No network")
    case .requiresConnection:
        print("Requires connection activation")
    @unknown default:
        break
    }
    
    print("Is expensive: \(path.isExpensive)")
    print("Available interfaces: \(path.availableInterfaces.map(\.name))")
}

monitor.start(queue: DispatchQueue(label: "NetworkMonitor"))
```

---

## NWPath (Network Path State)

Represents the state of a network path at a point in time.

### Declaration

```swift
@available(macOS 10.14, iOS 12.0, watchOS 5.0, tvOS 12.0, *)
public struct NWPath
```

### Properties

```swift
public var status: NWPath.Status                    // .satisfied, .unsatisfied, .requiresConnection
public var availableInterfaces: [NWInterface]       // Ordered by preference
public var isExpensive: Bool                        // Cellular or personal hotspot
public var supportsIPv4: Bool
public var supportsIPv6: Bool
public var supportsDNS: Bool
public var localEndpoint: NWEndpoint?
public var remoteEndpoint: NWEndpoint?

@available(macOS 10.15, iOS 13.0, watchOS 6.0, tvOS 13.0, *)
public var isConstrained: Bool                      // Low Data Mode
public var gateways: [NWEndpoint]                   // Gateway endpoints
```

### Methods

```swift
// Check if the path uses a specific interface type
public func usesInterfaceType(_ type: NWInterface.InterfaceType) -> Bool
```

### Status Enum

```swift
public enum Status {
    case satisfied          // A usable path exists
    case unsatisfied        // No usable path
    case requiresConnection // Path available but needs user action (e.g., captive portal)
}
```

### NWInterface

```swift
public struct NWInterface {
    public var type: InterfaceType
    public var name: String              // e.g., "en0", "pdp_ip0"
    public var index: Int
    
    public enum InterfaceType {
        case other
        case wifi
        case cellular
        case wiredEthernet
        case loopback
    }
}
```

---

## NWError (Error Types)

All errors from Network.framework are delivered as `NWError`.

### Declaration

```swift
@available(macOS 10.14, iOS 12.0, watchOS 5.0, tvOS 12.0, *)
public enum NWError : Error, CustomDebugStringConvertible
```

### Cases

```swift
public enum NWError {
    // POSIX system errors (errno values)
    case posix(POSIXErrorCode)
    
    // DNS resolution errors
    case dns(DNSServiceErrorType)
    
    // TLS/SSL errors (Security framework OSStatus codes)
    case tls(OSStatus)
}
```

### Common POSIX Errors

| Error Code | Meaning | Typical Cause |
|-----------|---------|---------------|
| `ECONNREFUSED` (61) | Connection refused | No server listening on port |
| `ECONNRESET` (54) | Connection reset by peer | Server forcefully closed |
| `ETIMEDOUT` (60) | Connection timed out | Server unreachable |
| `ENETDOWN` (50) | Network is down | No network interface |
| `ENETUNREACH` (51) | Network is unreachable | No route to host |
| `ENOTCONN` (57) | Socket is not connected | Send before connection ready |
| `ECANCELED` (89) | Operation canceled | Connection cancelled |
| `ENOBUFS` (55) | No buffer space | Memory pressure |

### Common DNS Errors

| Error Code | Meaning |
|-----------|---------|
| `kDNSServiceErr_NoSuchName` | Hostname not found |
| `kDNSServiceErr_Timeout` | DNS lookup timed out |
| `kDNSServiceErr_PolicyDenied` | Local network permission denied |

### Error Handling Pattern

```swift
connection.stateUpdateHandler = { state in
    switch state {
    case .failed(let error):
        switch error {
        case .posix(let code):
            switch code {
            case .ECONNREFUSED:
                print("Connection refused - is the device powered on?")
            case .ETIMEDOUT:
                print("Connection timed out - check network")
            case .ECONNRESET:
                print("Connection reset - device disconnected")
            default:
                print("POSIX error: \(code)")
            }
        case .dns(let errorCode):
            print("DNS error: \(errorCode)")
        case .tls(let status):
            print("TLS error: \(status)")
        @unknown default:
            print("Unknown error: \(error)")
        }
        
    case .waiting(let error):
        // Network temporarily unavailable, will retry automatically
        print("Waiting: \(error)")
        
    default:
        break
    }
}
```

---

## Connection Lifecycle State Machine

### State Transitions

```
                    ┌──────────┐
                    │  setup   │  (initial state)
                    └────┬─────┘
                         │ start(queue:)
                         ▼
                    ┌──────────┐
               ┌───▶│preparing │  (DNS resolution, TCP handshake, TLS negotiation)
               │    └────┬─────┘
               │         │
               │    ┌────┴────────────────────────────┐
               │    │                                  │
               │    ▼                                  ▼
          ┌──────────┐                          ┌──────────┐
          │ waiting   │◀─── retry on change ───▶│  ready   │
          │ (error)   │                          │          │
          └────┬──────┘                          └────┬─────┘
               │                                      │
               │ unrecoverable                        │ cancel() or
               │                                      │ connection lost
               ▼                                      ▼
          ┌──────────┐                          ┌──────────┐
          │  failed   │                          │cancelled │
          │  (error)  │                          │          │
          └──────────┘                          └──────────┘
          (terminal)                             (terminal)
```

### State Details

| State | Description | Action |
|-------|-------------|--------|
| `.setup` | Initial state after `init()` | Call `start(queue:)` |
| `.preparing` | Resolving DNS, establishing TCP, TLS handshake | Wait for `.ready` or `.failed` |
| `.waiting(error)` | Recoverable error; waiting for better conditions | Connection auto-retries when path changes |
| `.ready` | Connected and ready for data transfer | Call `send()` and `receive()` |
| `.failed(error)` | Unrecoverable error (terminal) | Create a new connection |
| `.cancelled` | Explicitly cancelled (terminal) | Create a new connection |

### Critical Rules

1. **Set `stateUpdateHandler` BEFORE calling `start()`** -- you will miss state transitions otherwise
2. **`.waiting` is NOT terminal** -- the connection will automatically retry when conditions improve
3. **`.failed` IS terminal** -- you must create a new `NWConnection` to reconnect
4. **`.cancelled` IS terminal** -- once cancelled, a connection cannot be restarted
5. **Always call `cancel()`** on connections you no longer need to prevent resource leaks
6. **Set `stateUpdateHandler = nil` before `cancel()`** to avoid receiving the `.cancelled` state callback

### Proper Cleanup Pattern

```swift
func disconnect() {
    // Prevent callback during teardown
    connection.stateUpdateHandler = nil
    connection.pathUpdateHandler = nil
    connection.viabilityUpdateHandler = nil
    connection.betterPathUpdateHandler = nil
    
    // Cancel the connection
    connection.cancel()
}
```

---

## Send and Receive Patterns

### Pattern 1: Send Binary Data (TCP)

```swift
func send(data: Data) {
    connection.send(
        content: data,
        contentContext: .defaultMessage,
        isComplete: false,    // false = more data coming (TCP stream)
        completion: .contentProcessed { [weak self] error in
            if let error = error {
                self?.handleError(error)
            }
        }
    )
}
```

### Pattern 2: Send Final Message and Close (TCP)

```swift
func sendAndClose(data: Data) {
    connection.send(
        content: data,
        contentContext: .finalMessage,  // Sends TCP FIN after this data
        isComplete: true,
        completion: .contentProcessed { error in
            // Connection will transition to cancelled after send completes
        }
    )
}
```

### Pattern 3: Send UDP Datagram

```swift
func sendDatagram(data: Data) {
    connection.send(
        content: data,
        contentContext: .defaultMessage,
        isComplete: true,     // true = complete message (UDP datagram)
        completion: .contentProcessed { error in
            if let error = error {
                print("UDP send error: \(error)")
            }
        }
    )
}
```

### Pattern 4: Idempotent Send (Fire and Forget)

```swift
// No callback — framework may resend on failure
connection.send(
    content: data,
    contentContext: .defaultMessage,
    isComplete: true,
    completion: .idempotent
)
```

### Pattern 5: Continuous TCP Receive Loop

```swift
func startReceiving() {
    connection.receive(minimumIncompleteLength: 1, maximumLength: 65536) {
        [weak self] data, context, isComplete, error in
        
        if let data = data, !data.isEmpty {
            self?.processData(data)
        }
        
        if isComplete {
            // Remote end closed the connection (received FIN)
            self?.handleConnectionClosed()
        } else if let error = error {
            self?.handleError(error)
        } else {
            // Schedule next receive (recursive call for continuous reading)
            self?.startReceiving()
        }
    }
}
```

### Pattern 6: Receive Complete UDP Message

```swift
func receiveMessage() {
    connection.receiveMessage { [weak self] data, context, isComplete, error in
        if let data = data {
            self?.processMessage(data)
        }
        if let error = error {
            self?.handleError(error)
        }
        // Schedule next receive for continuous listening
        self?.receiveMessage()
    }
}
```

### Pattern 7: Receive Exact Number of Bytes (Binary Protocol Header)

```swift
// Read exactly 12 bytes (e.g., a binary protocol header)
func receiveHeader() {
    connection.receive(minimumIncompleteLength: 12, maximumLength: 12) {
        [weak self] data, context, isComplete, error in
        
        guard let data = data, data.count == 12 else {
            self?.handleError(error)
            return
        }
        
        // Parse header to determine payload length
        let payloadLength = self?.parseHeaderLength(data) ?? 0
        
        if payloadLength > 0 {
            self?.receivePayload(length: payloadLength)
        } else {
            self?.receiveHeader() // Next packet
        }
    }
}

func receivePayload(length: Int) {
    connection.receive(minimumIncompleteLength: length, maximumLength: length) {
        [weak self] data, context, isComplete, error in
        
        guard let data = data else { return }
        self?.processPayload(data)
        self?.receiveHeader() // Continue with next header
    }
}
```

### Pattern 8: Batch Send (Multiple Messages)

```swift
func sendMultiple(messages: [Data]) {
    connection.batch {
        for (index, message) in messages.enumerated() {
            let isLast = index == messages.count - 1
            connection.send(
                content: message,
                contentContext: isLast ? .finalMessage : .defaultMessage,
                isComplete: isLast,
                completion: .contentProcessed { error in
                    if let error = error {
                        print("Batch send error at \(index): \(error)")
                    }
                }
            )
        }
    }
}
```

### Pattern 9: Flow-Controlled Sequential Send

```swift
func sendSequentially(messages: [Data], index: Int = 0) {
    guard index < messages.count else { return }
    
    connection.send(
        content: messages[index],
        contentContext: .defaultMessage,
        isComplete: true,
        completion: .contentProcessed { [weak self] error in
            if error == nil {
                // Previous send completed — safe to send next
                self?.sendSequentially(messages: messages, index: index + 1)
            }
        }
    )
}
```

### receive() vs receiveMessage()

| Method | Use Case | Behavior |
|--------|----------|----------|
| `receive(minimumIncompleteLength:maximumLength:)` | TCP streams, binary protocols | Returns between min and max bytes; may return partial data |
| `receiveMessage()` | UDP datagrams, framed protocols | Returns one complete message; waits for message boundary |

**Key difference:** `receive()` can return any amount of data between min and max. For TCP, a single `send()` may be split across multiple `receive()` calls. For binary protocols, always use length-prefixed framing or `NWProtocolFramer`.

---

## Binary Protocol Parsing Patterns

### Pattern 1: Length-Prefixed Messages (Without Framer)

Manual parsing of length-prefixed binary messages over TCP.

```swift
/// Read a 2-byte big-endian length prefix, then read that many bytes of payload
func receiveLengthPrefixed() {
    // Step 1: Read the 2-byte length header
    connection.receive(minimumIncompleteLength: 2, maximumLength: 2) {
        [weak self] data, _, isComplete, error in
        
        guard let self = self else { return }
        guard let data = data, data.count == 2 else {
            if isComplete { self.handleConnectionClosed() }
            return
        }
        
        // Parse big-endian UInt16 length
        let length = Int(data.withUnsafeBytes { $0.load(as: UInt16.self).bigEndian })
        
        guard length > 0 else {
            self.receiveLengthPrefixed() // Empty message, read next
            return
        }
        
        // Step 2: Read the payload
        self.connection.receive(minimumIncompleteLength: length, maximumLength: length) {
            data, _, isComplete, error in
            
            guard let data = data else { return }
            self.processPayload(data)
            self.receiveLengthPrefixed() // Continue reading
        }
    }
}
```

### Pattern 2: Byte Order Handling for Binary Protocols

```swift
extension Data {
    /// Read a big-endian UInt16 at the given offset
    func readUInt16BE(at offset: Int) -> UInt16 {
        return self.withUnsafeBytes { buffer in
            buffer.load(fromByteOffset: offset, as: UInt16.self).bigEndian
        }
    }
    
    /// Read a big-endian UInt32 at the given offset
    func readUInt32BE(at offset: Int) -> UInt32 {
        return self.withUnsafeBytes { buffer in
            buffer.load(fromByteOffset: offset, as: UInt32.self).bigEndian
        }
    }
    
    /// Read a 4-byte ASCII string at the given offset
    func readASCII(at offset: Int, length: Int) -> String {
        let bytes = self[offset..<(offset + length)]
        return String(bytes: bytes, encoding: .ascii) ?? ""
    }
    
    /// Write a big-endian UInt16 at the given offset
    mutating func writeUInt16BE(_ value: UInt16, at offset: Int) {
        var bigEndian = value.bigEndian
        withUnsafeBytes(of: &bigEndian) { bytes in
            for i in 0..<2 {
                self[offset + i] = bytes[i]
            }
        }
    }
    
    /// Write a big-endian UInt32 at the given offset
    mutating func writeUInt32BE(_ value: UInt32, at offset: Int) {
        var bigEndian = value.bigEndian
        withUnsafeBytes(of: &bigEndian) { bytes in
            for i in 0..<4 {
                self[offset + i] = bytes[i]
            }
        }
    }
}
```

### Pattern 3: Building Binary Packets

```swift
/// Build a binary packet with header + payload
func buildPacket(flags: UInt8, sessionId: UInt16, sequenceNumber: UInt16, payload: Data) -> Data {
    let headerSize = 12
    let totalSize = headerSize + payload.count
    
    var packet = Data(count: totalSize)
    
    // Byte 0: Flags + high bits of length
    packet[0] = flags | UInt8((totalSize >> 8) & 0x07)
    
    // Byte 1: Low bits of length
    packet[1] = UInt8(totalSize & 0xFF)
    
    // Bytes 2-3: Session ID (big-endian)
    packet.writeUInt16BE(sessionId, at: 2)
    
    // Bytes 4-5: Acknowledgement number
    packet.writeUInt16BE(0, at: 4)
    
    // Bytes 6-7: Reserved / Remote sequence
    packet.writeUInt16BE(0, at: 6)
    
    // Bytes 8-9: Local sequence number
    packet.writeUInt16BE(sequenceNumber, at: 8)
    
    // Bytes 10-11: Reserved
    packet[10] = 0
    packet[11] = 0
    
    // Payload
    if !payload.isEmpty {
        packet[headerSize...] = payload[...]
    }
    
    return packet
}
```

### Pattern 4: Custom NWProtocolFramer for Binary Protocol

Complete example of a binary protocol framer for header+payload protocols over UDP:

```swift
import Network

// MARK: - Protocol Definition

final class DeviceProtocolFramer: NWProtocolFramerImplementation {
    static let label = "DeviceProtocol"
    static let definition = NWProtocolFramer.Definition(implementation: DeviceProtocolFramer.self)
    
    // Minimum packet size (fixed header = 12 bytes)
    private static let headerSize = 12
    
    required init(framer: NWProtocolFramer.Instance) {}
    
    func start(framer: NWProtocolFramer.Instance) -> NWProtocolFramer.StartResult {
        return .ready
    }
    
    func stop(framer: NWProtocolFramer.Instance) -> Bool {
        return true
    }
    
    func wakeup(framer: NWProtocolFramer.Instance) {}
    
    func cleanup(framer: NWProtocolFramer.Instance) {}
    
    // MARK: - Input Parsing (Receiving)
    
    func handleInput(framer: NWProtocolFramer.Instance) -> Int {
        while true {
            // Try to parse a complete packet
            var packetLength: Int = 0
            var flags: UInt8 = 0
            var sessionId: UInt16 = 0
            var ackNumber: UInt16 = 0
            var remoteSeq: UInt16 = 0
            var localSeq: UInt16 = 0
            
            // Step 1: Parse header (need at least 12 bytes)
            let headerParsed = framer.parseInput(
                minimumIncompleteLength: Self.headerSize,
                maximumLength: Self.headerSize
            ) { buffer, isComplete in
                guard let buffer = buffer, buffer.count >= Self.headerSize else { return 0 }
                
                let ptr = buffer.bindMemory(to: UInt8.self)
                
                // Parse flags and length from first 2 bytes
                flags = ptr[0] >> 3  // Top 5 bits are flags
                packetLength = (Int(ptr[0] & 0x07) << 8) | Int(ptr[1])
                sessionId = UInt16(ptr[2]) << 8 | UInt16(ptr[3])
                ackNumber = UInt16(ptr[4]) << 8 | UInt16(ptr[5])
                remoteSeq = UInt16(ptr[6]) << 8 | UInt16(ptr[7])
                localSeq = UInt16(ptr[8]) << 8 | UInt16(ptr[9])
                
                return Self.headerSize  // Consume header bytes
            }
            
            guard headerParsed, packetLength >= Self.headerSize else {
                return Self.headerSize  // Need more data
            }
            
            // Step 2: Create message with parsed header metadata
            let message = NWProtocolFramer.Message(definition: Self.definition)
            message["flags"] = flags
            message["sessionId"] = sessionId
            message["ackNumber"] = ackNumber
            message["remoteSeq"] = remoteSeq
            message["localSeq"] = localSeq
            message["packetLength"] = packetLength
            
            // Step 3: Deliver payload (packet length - header size)
            let payloadLength = packetLength - Self.headerSize
            if payloadLength > 0 {
                guard framer.deliverInputNoCopy(
                    length: payloadLength,
                    message: message,
                    isComplete: true
                ) else {
                    return payloadLength  // Need more data for payload
                }
            } else {
                // Header-only packet (e.g., ACK)
                framer.deliverInput(data: Data(), message: message, isComplete: true)
            }
        }
    }
    
    // MARK: - Output Handling (Sending)
    
    func handleOutput(
        framer: NWProtocolFramer.Instance,
        message: NWProtocolFramer.Message,
        messageLength: Int,
        isComplete: Bool
    ) {
        // Read metadata from the message
        let flags = message["flags"] as? UInt8 ?? 0
        let sessionId = message["sessionId"] as? UInt16 ?? 0
        let ackNumber = message["ackNumber"] as? UInt16 ?? 0
        let localSeq = message["localSeq"] as? UInt16 ?? 0
        
        let totalLength = Self.headerSize + messageLength
        
        // Build the header
        var header = Data(count: Self.headerSize)
        header[0] = (flags << 3) | UInt8((totalLength >> 8) & 0x07)
        header[1] = UInt8(totalLength & 0xFF)
        header[2] = UInt8(sessionId >> 8)
        header[3] = UInt8(sessionId & 0xFF)
        header[4] = UInt8(ackNumber >> 8)
        header[5] = UInt8(ackNumber & 0xFF)
        header[6] = 0 // Remote sequence (filled by receiver)
        header[7] = 0
        header[8] = UInt8(localSeq >> 8)
        header[9] = UInt8(localSeq & 0xFF)
        header[10] = 0 // Reserved
        header[11] = 0
        
        // Write header
        framer.writeOutput(data: header)
        
        // Write payload from application data (zero-copy)
        if messageLength > 0 {
            try? framer.writeOutputNoCopy(length: messageLength)
        }
    }
}

// MARK: - Message Extensions

extension NWProtocolFramer.Message {
    var protocolFlags: UInt8 {
        get { self["flags"] as? UInt8 ?? 0 }
        set { self["flags"] = newValue }
    }
    
    var protocolSessionId: UInt16 {
        get { self["sessionId"] as? UInt16 ?? 0 }
        set { self["sessionId"] = newValue }
    }
    
    var protocolAckNumber: UInt16 {
        get { self["ackNumber"] as? UInt16 ?? 0 }
        set { self["ackNumber"] = newValue }
    }
    
    var protocolLocalSeq: UInt16 {
        get { self["localSeq"] as? UInt16 ?? 0 }
        set { self["localSeq"] = newValue }
    }
}

// MARK: - NWParameters Extension

extension NWParameters {
    static var deviceProtocol: NWParameters {
        let udpOptions = NWProtocolUDP.Options()
        let params = NWParameters(dtls: nil, udp: udpOptions)
        
        let framerOptions = NWProtocolFramer.Options(definition: DeviceProtocolFramer.definition)
        params.defaultProtocolStack.applicationProtocols.insert(framerOptions, at: 0)
        
        return params
    }
}
```

---

## Local Network Privacy (Info.plist and Entitlements)

### Required Info.plist Keys

```xml
<!-- REQUIRED for ANY local network access (iOS 14+) -->
<key>NSLocalNetworkUsageDescription</key>
<string>MyNetworkApp connects to your network hardware device on the local network for communication and control.</string>

<!-- REQUIRED if using Bonjour discovery (NWBrowser) -->
<key>NSBonjourServices</key>
<array>
    <string>_mydevice._tcp</string>
    <!-- Add all Bonjour service types your app discovers -->
</array>
```

### Multicast Entitlement

For IP multicast (NWConnectionGroup + NWMulticastGroup), you need a restricted entitlement:

```xml
<!-- In your .entitlements file -->
<key>com.apple.developer.networking.multicast</key>
<true/>
```

**To request this entitlement:** https://developer.apple.com/contact/request/networking-multicast

**NOTE:** The Simulator does NOT require this entitlement. Physical devices DO.

### When the Privacy Prompt Triggers

The local network permission dialog appears when your app first attempts to:
- Create an `NWBrowser` for Bonjour discovery
- Connect to a local network IP address via `NWConnection`
- Join a multicast group via `NWConnectionGroup`
- Use any API that accesses devices on the local network

### What Happens When Permission is Denied

- `NWBrowser` will not discover any services
- `NWConnection` to local addresses will fail with `kDNSServiceErr_PolicyDenied`
- There is **no direct API** to check local network permission status (as of iOS 18)
- Networking APIs wait silently until permission is granted or denied

### Handling Denial

```swift
connection.stateUpdateHandler = { state in
    switch state {
    case .waiting(let error):
        // Check for policy denied (local network permission denied)
        if case .dns(let dnsError) = error,
           dnsError == kDNSServiceErr_PolicyDenied {
            // Show user guidance to enable in Settings > Privacy > Local Network
            self.showLocalNetworkPermissionNeeded()
        }
    default:
        break
    }
}
```

### Testing Tips

- **Simulator:** Local network permission is always granted (no prompt)
- **Physical device:** First launch triggers the prompt
- **Reset permission:** Settings > General > Transfer or Reset > Reset > Reset Location & Privacy
- **iOS 18+:** Settings > Privacy & Security > Local Network shows per-app toggles

---

## Thread Safety and Swift 6 Concurrency

### Queue Model

Network.framework uses a **dispatch queue-based concurrency model**. Every object (`NWConnection`, `NWListener`, `NWBrowser`, `NWPathMonitor`, `NWConnectionGroup`) requires a dispatch queue at `start()` time. **All callbacks fire on that queue.**

```swift
// CORRECT: Dedicated queue for networking
let networkQueue = DispatchQueue(label: "com.myapp.network", qos: .userInitiated)
connection.start(queue: networkQueue)

// CORRECT: Main queue (if you need to update UI directly in callbacks)
connection.start(queue: .main)

// WRONG: Global concurrent queue (causes data races)
// connection.start(queue: .global())  // DO NOT USE
```

### Swift 6 Strict Concurrency Compatibility

Network.framework was designed before Swift concurrency. Key facts:

1. **NWConnection is NOT Sendable** -- do not pass between isolation domains
2. **NWListener is NOT Sendable** -- same restriction
3. **Callback closures are NOT @Sendable** -- they run on the specified queue
4. **NWPath IS Sendable** (value type / struct)
5. **NWError IS Sendable** (enum with Sendable payloads)

### Recommended Pattern: Actor Wrapper

```swift
/// Network manager that bridges Network.framework to Swift concurrency
@MainActor
final class DeviceConnectionManager: @preconcurrency Sendable {
    private var connection: NWConnection?
    private let networkQueue = DispatchQueue(label: "com.myapp.device")
    
    // Published state for SwiftUI observation
    private(set) var connectionState: ConnectionState = .disconnected
    
    enum ConnectionState: Sendable {
        case disconnected
        case connecting
        case connected
        case failed(String)
    }
    
    func connect(host: String, port: UInt16) {
        let connection = NWConnection(
            host: NWEndpoint.Host(host),
            port: NWEndpoint.Port(integerLiteral: port),
            using: .udp
        )
        
        connection.stateUpdateHandler = { [weak self] state in
            // Dispatch back to MainActor for UI updates
            Task { @MainActor [weak self] in
                guard let self = self else { return }
                switch state {
                case .ready:
                    self.connectionState = .connected
                case .failed(let error):
                    self.connectionState = .failed(error.debugDescription)
                case .preparing:
                    self.connectionState = .connecting
                case .cancelled:
                    self.connectionState = .disconnected
                default:
                    break
                }
            }
        }
        
        self.connection = connection
        connection.start(queue: networkQueue)
    }
    
    func disconnect() {
        connection?.stateUpdateHandler = nil
        connection?.cancel()
        connection = nil
        connectionState = .disconnected
    }
    
    func send(data: Data) {
        connection?.send(
            content: data,
            contentContext: .defaultMessage,
            isComplete: true,
            completion: .contentProcessed { error in
                if let error = error {
                    print("Send error: \(error)")
                }
            }
        )
    }
}
```

### Using @preconcurrency Import

If you get strict concurrency warnings from Network.framework:

```swift
@preconcurrency import Network

// This suppresses warnings about NWConnection not being Sendable
// when passing it to closures across isolation boundaries
```

### AsyncStream Bridge

Wrap NWConnection receive into an AsyncStream for modern Swift concurrency:

```swift
extension NWConnection {
    /// Bridge receive callbacks to AsyncStream
    func receiveStream(maxSize: Int = 65536) -> AsyncStream<Data> {
        AsyncStream { continuation in
            func scheduleReceive() {
                self.receiveMessage { data, _, isComplete, error in
                    if let data = data, !data.isEmpty {
                        continuation.yield(data)
                    }
                    if isComplete || error != nil {
                        continuation.finish()
                    } else {
                        scheduleReceive()
                    }
                }
            }
            
            continuation.onTermination = { _ in
                self.cancel()
            }
            
            scheduleReceive()
        }
    }
}

// Usage:
func startListening() async {
    for await data in connection.receiveStream() {
        processPacket(data)
    }
    print("Connection closed")
}
```

---

## Binary Protocol over UDP Transport Reference

This section covers patterns for implementing reliable binary protocols over UDP -- protocols that reimplement TCP-like reliability (sequence numbers, ACKs, retransmission) on top of UDP for low-latency hardware device communication.

### Why Reliable UDP?

Many network hardware devices (video switchers, lighting controllers, audio mixers) use custom UDP protocols instead of TCP because:
- **Lower latency:** No TCP head-of-line blocking or Nagle buffering
- **Custom retransmission:** Application-specific retry logic (e.g., skip stale state updates)
- **Connectionless base:** Allows multicast and broadcast patterns
- **Proprietary legacy:** Many hardware protocols predate modern TCP optimizations

### Packet Header Structure (Generic Pattern)

A typical reliable UDP protocol uses a fixed-size header (commonly 8-16 bytes):

```
Offset  Size    Field                   Description
------  ----    -----                   -----------
0       1 byte  Flags + Length[hi]      Top N bits: flags, remaining bits: length high byte
1       1 byte  Length[lo]              Packet length low byte (total including header)
2-3     2 bytes Session ID              Client identifier (big-endian UInt16)
4-5     2 bytes Acknowledgement Number  Last received remote sequence number
6-7     2 bytes Remote Sequence Number  Peer's packet counter
8-9     2 bytes Local Sequence Number   Sender's packet counter
10-11   2 bytes Reserved                Protocol-specific or padding (usually 0x0000)
```

**Byte order:** Always big-endian (network byte order) for multi-byte fields.

### Flag Bits (Common Pattern)

```
Bit 7 (0x80): Reliable      — Requires ACK response
Bit 6 (0x40): SYN           — Connection handshake
Bit 5 (0x20): Retransmission — Resent packet
Bit 4 (0x10): Request Retransmit — Ask peer to resend
Bit 3 (0x08): ACK           — Acknowledgment packet
```

### Three-Way Handshake (Connection Establishment)

Many reliable UDP protocols use a TCP-like three-way handshake:

```
Client                          Device
  │                                │
  │─── SYN (session=random) ──────▶│   Flag: 0x40, Payload: init request
  │                                │
  │◀── SYN-ACK (session=assigned)──│   Flag: 0x40, Payload: accept/reject
  │                                │
  │─── ACK ────────────────────────▶│   Flag: 0x08
  │                                │
  │◀══ State dumps begin ═════════▶│   Device sends full state
```

**Key implementation details:**
1. Client generates a random session ID in the SYN packet
2. Device may assign a different session ID in the SYN-ACK
3. After the handshake, the device typically sends a full state dump
4. Both sides track sequence numbers independently from this point

### Heartbeat / Keep-Alive

To detect disconnection over a stateless UDP transport:

```swift
// Schedule periodic heartbeat (typically every 1-5 seconds)
private var heartbeatTimer: DispatchSourceTimer?

func startHeartbeat(interval: TimeInterval = 2.0) {
    let timer = DispatchSource.makeTimerSource(queue: networkQueue)
    timer.schedule(deadline: .now() + interval, repeating: interval)
    timer.setEventHandler { [weak self] in
        self?.sendAck(ackNumber: self?.remoteSequenceNumber ?? 0)
    }
    timer.resume()
    heartbeatTimer = timer
}

func stopHeartbeat() {
    heartbeatTimer?.cancel()
    heartbeatTimer = nil
}
```

**Timeout detection:** If no packet is received within N heartbeat intervals (typically 3-5x the heartbeat period), consider the connection dead and trigger reconnection.

### Command/Field TLV Structure

Commands within packets (after the fixed header) commonly use a Type-Length-Value (TLV) format:

```
Offset  Size    Field           Description
------  ----    -----           -----------
0-1     2 bytes Field Length    Total length of this field (including this header)
2-3     2 bytes Padding/Type    Padding or sub-type indicator
4-7     4 bytes Field Type      ASCII command name (e.g., 4 characters)
8+      N bytes Field Data      Command-specific binary data
```

Multiple commands can be concatenated within a single packet payload. Parse by reading field length, consuming that many bytes, then reading the next field.

### Sequence Number and ACK Management

```swift
/// Track sequence numbers for reliable delivery
private var localSequenceNumber: UInt16 = 0
private var remoteSequenceNumber: UInt16 = 0
private var pendingAcks: [UInt16: (data: Data, timestamp: Date)] = [:]

/// Send a packet that requires acknowledgment
func sendReliable(payload: Data) {
    localSequenceNumber &+= 1  // Wrapping increment
    let packet = buildPacket(
        flags: 0x10,  // Reliable flag
        sessionId: sessionId,
        sequenceNumber: localSequenceNumber,
        payload: payload
    )
    pendingAcks[localSequenceNumber] = (data: packet, timestamp: Date())
    sendRaw(packet)
}

/// Handle incoming ACK -- remove from pending
func handleAck(ackNumber: UInt16) {
    pendingAcks.removeValue(forKey: ackNumber)
}

/// Retransmit unacknowledged packets older than timeout
func retransmitStale(timeout: TimeInterval = 0.5) {
    let cutoff = Date().addingTimeInterval(-timeout)
    for (seq, entry) in pendingAcks where entry.timestamp < cutoff {
        sendRaw(entry.data)
        pendingAcks[seq] = (data: entry.data, timestamp: Date())
    }
}
```

### NWConnection Configuration for Hardware Devices

```swift
/// Create an NWConnection configured for local network hardware device communication
func createDeviceConnection(host: String, port: UInt16) -> NWConnection {
    let udpOptions = NWProtocolUDP.Options()
    let params = NWParameters(dtls: nil, udp: udpOptions)
    
    // Allow port reuse for multiple connections
    params.allowLocalEndpointReuse = true
    
    // Require WiFi (local network device)
    params.requiredInterfaceType = .wifi
    
    // Set QoS for real-time control
    params.serviceClass = .interactiveVideo
    
    let connection = NWConnection(
        host: NWEndpoint.Host(host),
        port: NWEndpoint.Port(integerLiteral: port),
        using: params
    )
    
    return connection
}
```

### Handshake State Machine

```swift
enum HandshakeState {
    case idle
    case synSent           // SYN sent, waiting for SYN-ACK
    case established       // Handshake complete, ready for data
    case disconnecting     // Teardown in progress
}

private var handshakeState: HandshakeState = .idle

func processPacket(_ data: Data) {
    guard data.count >= 12 else { return }
    
    let flags = data[0] >> 3
    let isSyn = flags & 0x08 != 0   // SYN flag
    let isAck = flags & 0x01 != 0   // ACK flag
    let isReliable = flags & 0x10 != 0
    
    switch handshakeState {
    case .synSent:
        if isSyn {
            // SYN-ACK received -- complete handshake
            handshakeState = .established
            sendAck(ackNumber: parseRemoteSeq(data))
        }
    case .established:
        if isReliable {
            // Data packet requiring ACK
            sendAck(ackNumber: parseRemoteSeq(data))
        }
        parsePayloadCommands(data)
    default:
        break
    }
}
```

---

## Complete Working Examples

### Example 1: TCP Client Connection

```swift
import Network

class TCPClient {
    private var connection: NWConnection?
    private let queue = DispatchQueue(label: "TCPClient")
    
    func connect(host: String, port: UInt16) {
        let connection = NWConnection(
            host: NWEndpoint.Host(host),
            port: NWEndpoint.Port(integerLiteral: port),
            using: .tcp
        )
        
        connection.stateUpdateHandler = { [weak self] state in
            switch state {
            case .ready:
                print("Connected to \(host):\(port)")
                self?.startReceiving()
            case .waiting(let error):
                print("Waiting: \(error)")
            case .failed(let error):
                print("Failed: \(error)")
                self?.connection = nil
            case .cancelled:
                print("Cancelled")
                self?.connection = nil
            default:
                break
            }
        }
        
        self.connection = connection
        connection.start(queue: queue)
    }
    
    func send(_ data: Data) {
        connection?.send(
            content: data,
            completion: .contentProcessed { error in
                if let error = error {
                    print("Send error: \(error)")
                }
            }
        )
    }
    
    private func startReceiving() {
        connection?.receive(minimumIncompleteLength: 1, maximumLength: 65536) {
            [weak self] data, _, isComplete, error in
            
            if let data = data, !data.isEmpty {
                self?.handleData(data)
            }
            if isComplete {
                self?.disconnect()
            } else if error == nil {
                self?.startReceiving()
            }
        }
    }
    
    func handleData(_ data: Data) {
        // Override in subclass or use delegate
    }
    
    func disconnect() {
        connection?.stateUpdateHandler = nil
        connection?.cancel()
        connection = nil
    }
}
```

### Example 2: UDP Client/Server

```swift
import Network

// --- UDP Server ---

class UDPServer {
    private var listener: NWListener?
    private var connections: [NWConnection] = []
    private let queue = DispatchQueue(label: "UDPServer")
    
    func start(port: UInt16) throws {
        listener = try NWListener(
            using: .udp,
            on: NWEndpoint.Port(integerLiteral: port)
        )
        
        listener?.stateUpdateHandler = { state in
            switch state {
            case .ready:
                print("UDP Server listening on port \(port)")
            case .failed(let error):
                print("Server failed: \(error)")
            default:
                break
            }
        }
        
        listener?.newConnectionHandler = { [weak self] connection in
            self?.handleNewConnection(connection)
        }
        
        listener?.start(queue: queue)
    }
    
    private func handleNewConnection(_ connection: NWConnection) {
        connections.append(connection)
        
        connection.stateUpdateHandler = { [weak self] state in
            if case .cancelled = state {
                self?.connections.removeAll { $0 === connection }
            }
        }
        
        connection.start(queue: queue)
        receiveMessage(on: connection)
    }
    
    private func receiveMessage(on connection: NWConnection) {
        connection.receiveMessage { [weak self] data, _, _, error in
            if let data = data {
                self?.handleMessage(data, from: connection)
            }
            if error == nil {
                self?.receiveMessage(on: connection)
            }
        }
    }
    
    func handleMessage(_ data: Data, from connection: NWConnection) {
        // Process incoming UDP message
    }
    
    func stop() {
        listener?.cancel()
        connections.forEach { $0.cancel() }
        connections.removeAll()
    }
}

// --- UDP Client ---

class UDPClient {
    private var connection: NWConnection?
    private let queue = DispatchQueue(label: "UDPClient")
    
    func connect(host: String, port: UInt16) {
        connection = NWConnection(
            host: NWEndpoint.Host(host),
            port: NWEndpoint.Port(integerLiteral: port),
            using: .udp
        )
        
        connection?.stateUpdateHandler = { state in
            if state == .ready {
                print("UDP ready to \(host):\(port)")
            }
        }
        
        connection?.start(queue: queue)
    }
    
    func send(_ data: Data) {
        connection?.send(
            content: data,
            contentContext: .defaultMessage,
            isComplete: true,
            completion: .contentProcessed { error in
                if let error = error {
                    print("UDP send error: \(error)")
                }
            }
        )
    }
    
    func disconnect() {
        connection?.cancel()
        connection = nil
    }
}
```

### Example 3: Bonjour Service Discovery

```swift
import Network

class ServiceDiscovery {
    private var browser: NWBrowser?
    private let queue = DispatchQueue(label: "ServiceDiscovery")
    
    var discoveredDevices: [(name: String, endpoint: NWEndpoint)] = []
    var onDevicesChanged: (() -> Void)?
    
    func startBrowsing(serviceType: String = "_mydevice._tcp") {
        let params = NWParameters()
        params.includePeerToPeer = true
        
        browser = NWBrowser(
            for: .bonjourWithTXTRecord(type: serviceType, domain: nil),
            using: params
        )
        
        browser?.stateUpdateHandler = { state in
            switch state {
            case .ready:
                print("Browser ready, searching for \(serviceType)")
            case .failed(let error):
                print("Browser failed: \(error)")
            default:
                break
            }
        }
        
        browser?.browseResultsChangedHandler = { [weak self] results, changes in
            self?.discoveredDevices = results.compactMap { result in
                if case .service(let name, _, _, _) = result.endpoint {
                    return (name: name, endpoint: result.endpoint)
                }
                return nil
            }
            
            // Handle specific changes
            for change in changes {
                switch change {
                case .added(let result):
                    print("Found: \(result.endpoint)")
                case .removed(let result):
                    print("Lost: \(result.endpoint)")
                case .changed(let old, let new, _):
                    print("Changed: \(old.endpoint) -> \(new.endpoint)")
                default:
                    break
                }
            }
            
            self?.onDevicesChanged?()
        }
        
        browser?.start(queue: queue)
    }
    
    func connectToDevice(_ endpoint: NWEndpoint) -> NWConnection {
        let connection = NWConnection(to: endpoint, using: .tcp)
        return connection
    }
    
    func stopBrowsing() {
        browser?.cancel()
        browser = nil
        discoveredDevices.removeAll()
    }
}
```

### Example 4: NWListener with Bonjour Advertisement

```swift
import Network

class NetworkServer {
    private var listener: NWListener?
    private let queue = DispatchQueue(label: "NetworkServer")
    
    func start(serviceName: String, serviceType: String, port: UInt16 = 0) throws {
        let params = NWParameters.tcp
        
        listener = try NWListener(
            using: params,
            on: port == 0 ? .any : NWEndpoint.Port(integerLiteral: port)
        )
        
        // Advertise via Bonjour
        listener?.service = NWListener.Service(
            name: serviceName,
            type: serviceType
        )
        
        listener?.serviceRegistrationUpdateHandler = { change in
            switch change {
            case .add(let endpoint):
                print("Registered service at \(endpoint)")
            case .remove(let endpoint):
                print("Unregistered service at \(endpoint)")
            @unknown default:
                break
            }
        }
        
        listener?.stateUpdateHandler = { [weak self] state in
            if case .ready = state {
                print("Listening on port \(self?.listener?.port?.rawValue ?? 0)")
            }
        }
        
        listener?.newConnectionHandler = { connection in
            print("New connection from \(connection.endpoint)")
            connection.start(queue: self.queue)
            // Handle connection...
        }
        
        listener?.start(queue: queue)
    }
    
    func stop() {
        listener?.cancel()
        listener = nil
    }
}
```

### Example 5: Hardware Device UDP Connection

```swift
import Network

@MainActor
@Observable
final class DeviceConnection {
    // Connection state
    private(set) var isConnected = false
    private(set) var deviceState: [String: Any] = [:]
    
    // Internal state
    private var connection: NWConnection?
    private let queue = DispatchQueue(label: "com.myapp.device", qos: .userInitiated)
    private var sessionId: UInt16 = 0
    private var localSequenceNumber: UInt16 = 0
    private var remoteSequenceNumber: UInt16 = 0
    
    // MARK: - Connection
    
    func connect(to host: String, port: UInt16) {
        disconnect()
        
        let params = NWParameters.udp
        params.requiredInterfaceType = .wifi
        params.serviceClass = .interactiveVideo
        
        let conn = NWConnection(
            host: NWEndpoint.Host(host),
            port: NWEndpoint.Port(integerLiteral: port),
            using: params
        )
        
        conn.stateUpdateHandler = { [weak self] state in
            Task { @MainActor [weak self] in
                guard let self else { return }
                switch state {
                case .ready:
                    self.sendHandshake()
                    self.startReceiving()
                case .failed:
                    self.isConnected = false
                case .cancelled:
                    self.isConnected = false
                default:
                    break
                }
            }
        }
        
        self.connection = conn
        conn.start(queue: queue)
    }
    
    func disconnect() {
        connection?.stateUpdateHandler = nil
        connection?.cancel()
        connection = nil
        isConnected = false
        sessionId = 0
        localSequenceNumber = 0
        remoteSequenceNumber = 0
    }
    
    // MARK: - Handshake
    
    private func sendHandshake() {
        // Generate random session ID
        sessionId = UInt16.random(in: 1...UInt16.max)
        
        // SYN packet: flags=0x40 (SYN), payload=init request
        var packet = Data(count: 20)  // 12-byte header + 8-byte payload
        
        // Header
        let totalLength: UInt16 = 20
        packet[0] = 0x40 | UInt8((totalLength >> 8) & 0x07)  // SYN flag + length high
        packet[1] = UInt8(totalLength & 0xFF)                  // Length low
        packet[2] = UInt8(sessionId >> 8)                      // Session ID high
        packet[3] = UInt8(sessionId & 0xFF)                    // Session ID low
        // Bytes 4-11: zeros (ack, remote seq, local seq, reserved)
        
        // Payload: connection request
        packet[12] = 0x01
        // Bytes 13-19: zeros
        
        connection?.send(
            content: packet,
            contentContext: .defaultMessage,
            isComplete: true,
            completion: .contentProcessed { error in
                if let error = error {
                    print("Handshake send error: \(error)")
                }
            }
        )
    }
    
    // MARK: - Receive Loop
    
    private func startReceiving() {
        connection?.receiveMessage { [weak self] data, _, _, error in
            if let data = data {
                Task { @MainActor [weak self] in
                    self?.processPacket(data)
                }
            }
            if error == nil {
                self?.startReceiving()
            }
        }
    }
    
    // MARK: - Packet Processing
    
    private func processPacket(_ data: Data) {
        guard data.count >= 12 else { return }
        
        let flags = data[0] >> 3
        let packetLength = (Int(data[0] & 0x07) << 8) | Int(data[1])
        let remoteSeq = UInt16(data[6]) << 8 | UInt16(data[7])
        
        // Handle SYN-ACK (handshake response)
        if flags & 0x08 != 0 {  // SYN flag in response
            if data.count > 12 && data[12] == 0x02 {
                isConnected = true
                sendAck(ackNumber: remoteSeq)
            }
        }
        
        // Handle data that requires ACK
        if flags & 0x10 != 0 {  // Reliable flag
            remoteSequenceNumber = remoteSeq
            sendAck(ackNumber: remoteSeq)
        }
        
        // Parse commands in payload
        if packetLength > 12 {
            parseCommands(from: data[12...])
        }
    }
    
    private func parseCommands(from data: Data.SubSequence) {
        var offset = data.startIndex
        
        while offset < data.endIndex - 7 {
            let fieldLength = Int(data[offset]) << 8 | Int(data[offset + 1])
            guard fieldLength >= 8, offset + fieldLength <= data.endIndex else { break }
            
            // Read 4-byte ASCII command name (offset + 4 to offset + 7)
            let cmdBytes = data[(offset + 4)..<(offset + 8)]
            let command = String(bytes: cmdBytes, encoding: .ascii) ?? ""
            let fieldData = data[(offset + 8)..<(offset + fieldLength)]
            
            handleCommand(command, data: Data(fieldData))
            
            offset += fieldLength
        }
    }
    
    private func handleCommand(_ command: String, data: Data) {
        // Process device-specific commands
        // Store state updates in deviceState dictionary
        deviceState[command] = data
    }
    
    // MARK: - Send Commands
    
    private func sendAck(ackNumber: UInt16) {
        var packet = Data(count: 12)
        let totalLength: UInt16 = 12
        
        packet[0] = 0x08 | UInt8((totalLength >> 8) & 0x07)  // ACK flag
        packet[1] = UInt8(totalLength & 0xFF)
        packet[2] = UInt8(sessionId >> 8)
        packet[3] = UInt8(sessionId & 0xFF)
        packet[4] = UInt8(ackNumber >> 8)
        packet[5] = UInt8(ackNumber & 0xFF)
        
        connection?.send(
            content: packet,
            contentContext: .defaultMessage,
            isComplete: true,
            completion: .idempotent
        )
    }
    
    func sendCommand(_ command: String, data: Data) {
        localSequenceNumber += 1
        
        let fieldLength = 8 + data.count  // 2 length + 2 padding + 4 command + N data
        let totalLength = 12 + fieldLength
        
        var packet = Data(count: totalLength)
        
        // Header: Reliable flag (0x10)
        packet[0] = 0x10 | UInt8((totalLength >> 8) & 0x07)
        packet[1] = UInt8(totalLength & 0xFF)
        packet[2] = UInt8(sessionId >> 8)
        packet[3] = UInt8(sessionId & 0xFF)
        packet[4] = 0  // ACK number (not acking anything)
        packet[5] = 0
        packet[6] = 0  // Remote sequence
        packet[7] = 0
        packet[8] = UInt8(localSequenceNumber >> 8)
        packet[9] = UInt8(localSequenceNumber & 0xFF)
        packet[10] = 0
        packet[11] = 0
        
        // Command field
        let fieldOffset = 12
        packet[fieldOffset] = UInt8(fieldLength >> 8)
        packet[fieldOffset + 1] = UInt8(fieldLength & 0xFF)
        packet[fieldOffset + 2] = 0  // Padding
        packet[fieldOffset + 3] = 0
        
        // Command name (4 ASCII bytes)
        let cmdData = command.data(using: .ascii)!
        packet[(fieldOffset + 4)..<(fieldOffset + 8)] = cmdData[0..<4]
        
        // Command data
        if !data.isEmpty {
            packet[(fieldOffset + 8)..<(fieldOffset + 8 + data.count)] = data[...]
        }
        
        connection?.send(
            content: packet,
            contentContext: .defaultMessage,
            isComplete: true,
            completion: .contentProcessed { error in
                if let error = error {
                    print("Command send error: \(error)")
                }
            }
        )
    }
}
```

---

## Crash Prevention Checklist

### Before Writing Code

- [ ] Read this reference for the specific API you need
- [ ] Understand the threading model (dispatch queue based, NOT Swift concurrency native)
- [ ] Plan your error handling for all NWError cases
- [ ] Identify if you need multicast entitlement

### Connection Setup

- [ ] Set `stateUpdateHandler` BEFORE calling `start()`
- [ ] Use a dedicated `DispatchQueue` (not `.global()`)
- [ ] Handle ALL state cases in `stateUpdateHandler` (especially `.waiting` and `.failed`)
- [ ] Set `newConnectionHandler` on NWListener BEFORE calling `start()`

### Data Transfer

- [ ] TCP: Use `receive()` with `minimumIncompleteLength` for streaming
- [ ] UDP: Use `receiveMessage()` for complete datagrams
- [ ] Always reschedule `receive` after processing (the callback fires exactly once)
- [ ] Check `isComplete` flag to detect connection close
- [ ] Use `.contentProcessed` completion for flow control on send

### Cleanup

- [ ] Set all handlers to `nil` before calling `cancel()`
- [ ] Call `cancel()` on every NWConnection, NWListener, NWBrowser, NWConnectionGroup
- [ ] Remove strong references to cancelled objects
- [ ] Cancel NWPathMonitor when no longer needed

### Info.plist (Local Network)

- [ ] Add `NSLocalNetworkUsageDescription` with clear user-facing explanation
- [ ] Add `NSBonjourServices` array if using NWBrowser
- [ ] Request multicast entitlement if using NWConnectionGroup

### Swift 6 Concurrency

- [ ] Use `@preconcurrency import Network` if needed
- [ ] Do NOT pass NWConnection across isolation boundaries
- [ ] Bridge to `@MainActor` with `Task { @MainActor in ... }` for UI updates
- [ ] Wrap receive in `AsyncStream` if using Swift concurrency patterns

### Binary Protocol

- [ ] Use big-endian byte order for all multi-byte values
- [ ] Validate packet length before parsing
- [ ] Handle partial reads (TCP) or dropped packets (UDP)
- [ ] Implement ACK responses for reliable packets
- [ ] Track sequence numbers for retransmission detection
- [ ] Implement keepalive/heartbeat to maintain connection

---

## NWTXTRecord (Bonjour Metadata)

```swift
@available(macOS 10.15, iOS 13.0, watchOS 6.0, tvOS 13.0, *)
public struct NWTXTRecord : Equatable, CustomDebugStringConvertible, Collection {
    // Create from dictionary
    public init(_ dictionary: [String: String] = [:])
    
    // Key-value access
    public subscript(key: String) -> String?
    
    // Entry management
    public func getEntry(for key: String) -> NWTXTRecord.Entry?
    public mutating func setEntry(_ entry: NWTXTRecord.Entry, for key: String) -> Bool
    public mutating func removeEntry(key: String) -> Bool
    
    // Convert to dictionary
    public var dictionary: [String: String]
    
    public enum Entry {
        case none           // Key exists with no value
        case empty          // Key exists with empty value
        case string(String) // Key exists with string value
    }
}
```

---

## Quick Reference Card

### Create TCP Connection
```swift
let conn = NWConnection(host: "192.168.1.100", port: 80, using: .tcp)
```

### Create UDP Connection
```swift
let conn = NWConnection(host: "192.168.1.100", port: 9000, using: .udp)
```

### Create TCP Listener
```swift
let listener = try NWListener(using: .tcp, on: 8080)
```

### Create UDP Listener
```swift
let listener = try NWListener(using: .udp, on: 9000)
```

### Browse for Bonjour Services
```swift
let browser = NWBrowser(for: .bonjour(type: "_http._tcp", domain: nil), using: .tcp)
```

### Monitor Network Path
```swift
let monitor = NWPathMonitor()
monitor.pathUpdateHandler = { path in print(path.status) }
monitor.start(queue: .main)
```

### Join Multicast Group
```swift
let group = try NWMulticastGroup(for: [.hostPort(host: "239.255.0.1", port: 5353)])
let connGroup = NWConnectionGroup(from: group, using: .udp)
```

---

*Last verified: 2026-04-07 against iOS SDK Swift interface files and Apple Developer Documentation.*
