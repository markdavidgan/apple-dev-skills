---
name: networking
category: engineering
description: Modern Swift networking with URLSession and async/await — typed requests, Codable decoding, HTTP status & error handling, retry with backoff, offline/connectivity handling, and a Sendable API client. Use when calling a REST/JSON API, building an API client/service layer, decoding responses, handling network errors or timeouts, adding retry logic, or detecting offline state. Trigger on "URLSession", "API client", "networking", "fetch data", "JSONDecoder", "retry", or "offline".
---

# Networking (URLSession + async/await)

**Build a correct, Sendable networking layer with structured concurrency.** No third-party library needed for most apps. Concurrency/isolation rules follow `ios-standards`.

---

## The core call

```swift
let (data, response) = try await URLSession.shared.data(for: request)
guard let http = response as? HTTPURLResponse else { throw APIError.nonHTTP }
guard 200..<300 ~= http.statusCode else { throw APIError.status(http.statusCode, data) }
let value = try decoder.decode(T.self, from: data)
```

Three things people skip and regret:
1. **Cast to `HTTPURLResponse` and check the status code** — `URLSession` does *not* throw on 4xx/5xx; you get a normal response with an error body.
2. **Decode errors are not network errors** — keep them distinct so you can log the payload.
3. **Build URLs with `URLComponents`** (proper percent-encoding of query items), never string concatenation.

---

## A typed, Sendable client

```swift
struct Endpoint<Response: Decodable> {
    var path: String
    var method = "GET"
    var query: [URLQueryItem] = []
    var body: Data? = nil
}

actor APIClient {
    private let base: URL
    private let session: URLSession
    private let decoder: JSONDecoder

    init(base: URL, session: URLSession = .shared) {
        self.base = base
        self.session = session
        decoder = JSONDecoder()
        decoder.keyDecodingStrategy = .convertFromSnakeCase
        decoder.dateDecodingStrategy = .iso8601
    }

    func send<R>(_ endpoint: Endpoint<R>) async throws -> R {
        var comps = URLComponents(url: base.appending(path: endpoint.path),
                                  resolvingAgainstBaseURL: false)!
        if !endpoint.query.isEmpty { comps.queryItems = endpoint.query }
        var req = URLRequest(url: comps.url!)
        req.httpMethod = endpoint.method
        req.httpBody = endpoint.body
        if endpoint.body != nil { req.setValue("application/json", forHTTPHeaderField: "Content-Type") }

        let (data, response) = try await session.data(for: req)
        guard let http = response as? HTTPURLResponse else { throw APIError.nonHTTP }
        guard 200..<300 ~= http.statusCode else { throw APIError.status(http.statusCode, data) }
        do { return try decoder.decode(R.self, from: data) }
        catch { throw APIError.decoding(error) }
    }
}

enum APIError: Error { case nonHTTP, status(Int, Data), decoding(Error), offline }
```

An `actor` client gives you a thread-safe place for caches/tokens. `URLSession`'s async methods are cancellation-aware — cancelling the `Task` cancels the request.

---

## Parallelism

```swift
// Independent calls — run concurrently
async let user = client.send(Endpoint<User>(path: "me"))
async let feed = client.send(Endpoint<[Post]>(path: "feed"))
let (u, f) = try await (user, feed)

// Dynamic fan-out
let posts = try await withThrowingTaskGroup(of: Post.self) { group in
    for id in ids { group.addTask { try await client.send(Endpoint<Post>(path: "posts/\(id)")) } }
    var out: [Post] = []
    for try await p in group { out.append(p) }
    return out
}
```

Don't `await` independent requests serially — it's the most common avoidable latency bug.

---

## Retry with exponential backoff + jitter

Retry only **idempotent** requests and only **transient** failures (timeouts, 429, 5xx). Never retry a non-idempotent POST blindly.

```swift
func withRetry<T>(max: Int = 3, _ op: () async throws -> T) async throws -> T {
    var attempt = 0
    while true {
        do { return try await op() }
        catch {
            attempt += 1
            guard attempt < max, isTransient(error) else { throw error }
            let backoff = pow(2.0, Double(attempt)) * 0.2
            let jitter = Double.random(in: 0...0.1)
            try await Task.sleep(for: .seconds(backoff + jitter))
        }
    }
}
```

Honor a `Retry-After` header on 429/503 when present instead of your own backoff.

---

## Offline & connectivity

- **Let requests wait** for connectivity when appropriate: set `configuration.waitsForConnectivity = true` and a sensible `timeoutIntervalForResource`.
- **Observe the path** with `NWPathMonitor` (Network framework) to drive UI ("You're offline") and to decide whether to even attempt a call.
- **Cache** with `URLCache` / `Cache-Control`, and consider a local store (SwiftData) as the source of truth with the network as a sync layer — see `cloudkit-sync`.
- Distinguish *offline* (`URLError.notConnectedToInternet`) from *server error* so the UI message is honest.

---

## Other essentials

- **Auth:** inject a bearer token in the client; refresh on 401 once, then fail. Keep tokens in the Keychain, not `UserDefaults` (see `app-security`).
- **Background transfers:** large up/downloads that must survive app suspension use a **background `URLSession`** (`URLSessionConfiguration.background(withIdentifier:)`) with a delegate, not async/await.
- **Don't pin blindly** — if you need certificate pinning, see `app-security`.
- **Testing:** inject a stub `URLProtocol` or a protocol-abstracted client so tests don't hit the network — see `swift-testing`.
