# Visual Patterns for Apple Architecture Diagrams

Ready-to-copy SVG patterns for common Apple app architectures. Use as building blocks in `apple-architecture-diagram` skill.

## Pattern 1: MVVM + @Observable (Standard)

The bread and butter of modern SwiftUI apps. View → ViewModel → Service → Data.

```svg
<!-- View Layer -->
<g id="mvvm-views">
  <rect x="80" y="100" width="140" height="56" rx="12" fill="#1C1C1E" stroke="#5E5CE6" stroke-width="1.5"/>
  <text x="150" y="125" text-anchor="middle" fill="#fff" font-size="13" font-weight="500">TimerView</text>
  <text x="150" y="142" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">SwiftUI.View</text>
  
  <rect x="80" y="180" width="140" height="56" rx="12" fill="#1C1C1E" stroke="#5E5CE6" stroke-width="1.5"/>
  <text x="150" y="205" text-anchor="middle" fill="#fff" font-size="13" font-weight="500">HistoryView</text>
  <text x="150" y="222" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">SwiftUI.View</text>
</g>

<!-- ViewModel Layer -->
<g id="mvvm-viewmodels">
  <rect x="340" y="100" width="160" height="56" rx="12" fill="rgba(191,90,242,0.12)" stroke="#BF5AF2" stroke-width="1.5"/>
  <text x="420" y="125" text-anchor="middle" fill="#fff" font-size="13" font-weight="500">TimerViewModel</text>
  <text x="420" y="142" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">@Observable</text>
  
  <rect x="340" y="180" width="160" height="56" rx="12" fill="rgba(191,90,242,0.12)" stroke="#BF5AF2" stroke-width="1.5"/>
  <text x="420" y="205" text-anchor="middle" fill="#fff" font-size="13" font-weight="500">HistoryViewModel</text>
  <text x="420" y="222" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">@Observable</text>
</g>

<!-- Service Layer -->
<g id="mvvm-services">
  <rect x="620" y="100" width="160" height="56" rx="12" fill="rgba(255,159,10,0.12)" stroke="#FF9F0A" stroke-width="1.5"/>
  <text x="700" y="125" text-anchor="middle" fill="#fff" font-size="13" font-weight="500">TimerService</text>
  <text x="700" y="142" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">actor</text>
  
  <rect x="620" y="180" width="160" height="56" rx="12" fill="rgba(255,159,10,0.12)" stroke="#FF9F0A" stroke-width="1.5"/>
  <text x="700" y="205" text-anchor="middle" fill="#fff" font-size="13" font-weight="500">NotificationService</text>
  <text x="700" y="222" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">@MainActor</text>
</g>

<!-- Data Layer -->
<g id="mvvm-data">
  <rect x="620" y="280" width="160" height="56" rx="12" fill="rgba(48,209,88,0.12)" stroke="#30D158" stroke-width="1.5"/>
  <text x="700" y="305" text-anchor="middle" fill="#fff" font-size="13" font-weight="500">SwiftData</text>
  <text x="700" y="322" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">@Model</text>
  
  <rect x="620" y="360" width="160" height="56" rx="12" fill="rgba(48,209,88,0.12)" stroke="#30D158" stroke-width="1.5"/>
  <text x="700" y="385" text-anchor="middle" fill="#fff" font-size="13" font-weight="500">UserDefaults</text>
  <text x="700" y="402" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">Foundation</text>
</g>

<!-- Arrows: View → ViewModel -->
<path d="M220,128 L340,128" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" marker-end="url(#arrow)"/>
<path d="M220,208 L340,208" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" marker-end="url(#arrow)"/>

<!-- Arrows: ViewModel → Service -->
<path d="M500,128 L620,128" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" marker-end="url(#arrow)"/>
<path d="M500,208 L620,208" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" marker-end="url(#arrow)"/>

<!-- Arrows: Service → Data -->
<path d="M700,156 L700,280" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" stroke-dasharray="4,4" marker-end="url(#arrow)"/>

<!-- Boundaries -->
<rect x="60" y="70" width="180" height="190" rx="16" fill="none" stroke="rgba(94,92,230,0.3)" stroke-width="1" stroke-dasharray="8,4"/>
<text x="70" y="95" fill="#5E5CE6" font-size="11" font-weight="600">Presentation</text>

<rect x="320" y="70" width="200" height="190" rx="16" fill="none" stroke="rgba(191,90,242,0.3)" stroke-width="1" stroke-dasharray="8,4"/>
<text x="330" y="95" fill="#BF5AF2" font-size="11" font-weight="600">Domain</text>

<rect x="600" y="70" width="200" height="370" rx="16" fill="none" stroke="rgba(255,159,10,0.3)" stroke-width="1" stroke-dasharray="8,4"/>
<text x="610" y="95" fill="#FF9F0A" font-size="11" font-weight="600">Data &amp; Infrastructure</text>
```

## Pattern 2: Multi-Platform with Shared Services

iPhone + Apple Watch + Vision Pro sharing a core service layer.

```svg
<!-- iPhone -->
<g transform="translate(80, 80)">
  <rect x="0" y="0" width="140" height="280" rx="24" fill="#0A0A0A" stroke="#38383A" stroke-width="2"/>
  <rect x="42" y="10" width="56" height="20" rx="10" fill="#000"/>
  <rect x="8" y="40" width="124" height="220" rx="10" fill="#1C1C1E"/>
  <text x="70" y="235" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="10">iOS App</text>
</g>

<!-- Apple Watch -->
<g transform="translate(280, 140)">
  <rect x="0" y="0" width="100" height="120" rx="32" fill="#0A0A0A" stroke="#38383A" stroke-width="2"/>
  <rect x="8" y="8" width="84" height="104" rx="24" fill="#1C1C1E"/>
  <text x="50" y="110" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="9">watchOS</text>
</g>

<!-- Vision Pro -->
<g transform="translate(260, 300)">
  <rect x="0" y="0" width="140" height="90" rx="40" fill="#0A0A0A" stroke="#38383A" stroke-width="2"/>
  <rect x="10" y="10" width="120" height="70" rx="30" fill="#1C1C1E"/>
  <text x="70" y="80" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="9">visionOS</text>
</g>

<!-- Shared Services -->
<rect x="480" y="120" width="180" height="200" rx="16" fill="none" stroke="rgba(255,159,10,0.4)" stroke-width="1.5" stroke-dasharray="8,4"/>
<text x="495" y="145" fill="#FF9F0A" font-size="12" font-weight="600">Shared Core</text>

<rect x="500" y="160" width="140" height="40" rx="8" fill="rgba(255,159,10,0.12)" stroke="#FF9F0A" stroke-width="1"/>
<text x="570" y="185" text-anchor="middle" fill="#fff" font-size="11">SessionService</text>

<rect x="500" y="210" width="140" height="40" rx="8" fill="rgba(255,159,10,0.12)" stroke="#FF9F0A" stroke-width="1"/>
<text x="570" y="235" text-anchor="middle" fill="#fff" font-size="11">SyncEngine</text>

<rect x="500" y="260" width="140" height="40" rx="8" fill="rgba(255,159,10,0.12)" stroke="#FF9F0A" stroke-width="1"/>
<text x="570" y="285" text-anchor="middle" fill="#fff" font-size="11">HealthKitService</text>

<!-- CloudKit -->
<rect x="520" y="380" width="100" height="48" rx="8" fill="rgba(255,214,10,0.12)" stroke="#FFD60A" stroke-width="1"/>
<text x="570" y="400" text-anchor="middle" fill="#fff" font-size="11" font-weight="500">CloudKit</text>
<text x="570" y="415" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="9">Apple Service</text>

<!-- Connections -->
<path d="M220,220 L480,200" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" marker-end="url(#arrow)"/>
<path d="M380,200 L480,200" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" marker-end="url(#arrow)"/>
<path d="M330,345 L480,280" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" marker-end="url(#arrow)"/>
<path d="M570,308 L570,380" stroke="rgba(255,214,10,0.4)" stroke-width="1.5" stroke-dasharray="4,4" marker-end="url(#arrow)"/>
```

## Pattern 3: TCA (The Composable Architecture)

Store-driven unidirectional data flow with Effects.

```svg
<!-- Store -->
<rect x="400" y="100" width="160" height="60" rx="12" fill="rgba(10,132,255,0.15)" stroke="#0A84FF" stroke-width="2"/>
<text x="480" y="130" text-anchor="middle" fill="#fff" font-size="14" font-weight="600">StoreOf&lt;Feature&gt;</text>
<text x="480" y="148" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">ComposableArchitecture</text>

<!-- State -->
<rect x="200" y="220" width="140" height="50" rx="10" fill="rgba(191,90,242,0.12)" stroke="#BF5AF2" stroke-width="1.5"/>
<text x="270" y="245" text-anchor="middle" fill="#fff" font-size="12" font-weight="500">Feature.State</text>
<text x="270" y="260" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">@ObservableState</text>

<!-- Action -->
<rect x="420" y="220" width="120" height="50" rx="10" fill="rgba(255,159,10,0.12)" stroke="#FF9F0A" stroke-width="1.5"/>
<text x="480" y="245" text-anchor="middle" fill="#fff" font-size="12" font-weight="500">Feature.Action</text>
<text x="480" y="260" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">enum</text>

<!-- Reducer -->
<rect x="620" y="220" width="140" height="50" rx="10" fill="rgba(255,69,58,0.12)" stroke="#FF453A" stroke-width="1.5"/>
<text x="690" y="245" text-anchor="middle" fill="#fff" font-size="12" font-weight="500">Feature</text>
<text x="690" y="260" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">Reducer</text>

<!-- Effect -->
<rect x="620" y="320" width="140" height="50" rx="10" fill="rgba(48,209,88,0.12)" stroke="#30D158" stroke-width="1.5"/>
<text x="690" y="345" text-anchor="middle" fill="#fff" font-size="12" font-weight="500">Effect&lt;Action&gt;</text>
<text x="690" y="360" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">async / Combine</text>

<!-- View -->
<rect x="200" y="100" width="120" height="50" rx="10" fill="rgba(94,92,230,0.12)" stroke="#5E5CE6" stroke-width="1.5"/>
<text x="260" y="125" text-anchor="middle" fill="#fff" font-size="12" font-weight="500">FeatureView</text>
<text x="260" y="140" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">View</text>

<!-- Arrows -->
<!-- View sends Action to Store -->
<path d="M320,125 L400,130" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" marker-end="url(#arrow)"/>
<text x="355" y="118" fill="rgba(255,255,255,0.4)" font-size="9">send(action)</text>

<!-- Store holds State -->
<path d="M450,160 L310,220" stroke="rgba(191,90,242,0.5)" stroke-width="1.5" stroke-dasharray="4,4" marker-end="url(#arrow)"/>

<!-- Store dispatches to Reducer -->
<path d="M560,130 L660,220" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" marker-end="url(#arrow)"/>

<!-- Reducer returns Effect -->
<path d="M690,270 L690,320" stroke="rgba(48,209,88,0.5)" stroke-width="1.5" stroke-dasharray="4,4" marker-end="url(#arrow)"/>

<!-- Effect feeds back to Store -->
<path d="M620,345 L520,160" stroke="rgba(48,209,88,0.4)" stroke-width="1.5" stroke-dasharray="6,3" marker-end="url(#arrow)"/>
<text x="590" y="280" fill="rgba(48,209,88,0.7)" font-size="9">Effect output</text>

<!-- State drives View -->
<path d="M260,220 L260,150" stroke="rgba(94,92,230,0.5)" stroke-width="1.5" marker-end="url(#arrow)"/>
<text x="230" y="185" fill="rgba(94,92,230,0.7)" font-size="9">@Bindable</text>
```

## Pattern 4: SwiftData Stack

SwiftUI → @Query → ModelContext → @Model → Persistence.

```svg
<!-- SwiftUI View with @Query -->
<rect x="100" y="100" width="160" height="60" rx="12" fill="rgba(94,92,230,0.12)" stroke="#5E5CE6" stroke-width="1.5"/>
<text x="180" y="125" text-anchor="middle" fill="#fff" font-size="13" font-weight="500">SessionListView</text>
<text x="180" y="142" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">@Query</text>

<!-- ModelContext -->
<rect x="340" y="100" width="160" height="60" rx="12" fill="rgba(191,90,242,0.12)" stroke="#BF5AF2" stroke-width="1.5"/>
<text x="420" y="125" text-anchor="middle" fill="#fff" font-size="13" font-weight="500">ModelContext</text>
<text x="420" y="142" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">SwiftData</text>

<!-- @Model -->
<rect x="340" y="220" width="160" height="60" rx="12" fill="rgba(48,209,88,0.12)" stroke="#30D158" stroke-width="1.5"/>
<text x="420" y="245" text-anchor="middle" fill="#fff" font-size="13" font-weight="500">FocusSession</text>
<text x="420" y="262" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">@Model</text>

<!-- Persistence -->
<rect x="340" y="360" width="160" height="50" rx="10" fill="rgba(100,210,255,0.12)" stroke="#64D2FF" stroke-width="1.5"/>
<text x="420" y="380" text-anchor="middle" fill="#fff" font-size="12" font-weight="500">SQLite</text>
<text x="420" y="395" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">.sqlite</text>

<!-- iCloud Sync -->
<rect x="580" y="220" width="140" height="50" rx="10" fill="rgba(255,214,10,0.12)" stroke="#FFD60A" stroke-width="1.5"/>
<text x="650" y="240" text-anchor="middle" fill="#fff" font-size="12" font-weight="500">CloudKit</text>
<text x="650" y="255" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">iCloud Sync</text>

<!-- Arrows -->
<path d="M260,130 L340,130" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" marker-end="url(#arrow)"/>
<text x="295" y="122" fill="rgba(255,255,255,0.4)" font-size="9">fetch</text>

<path d="M420,160 L420,220" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" marker-end="url(#arrow)"/>
<text x="430" y="195" fill="rgba(255,255,255,0.4)" font-size="9">manages</text>

<path d="M420,280 L420,360" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" stroke-dasharray="4,4" marker-end="url(#arrow)"/>
<text x="430" y="325" fill="rgba(255,255,255,0.4)" font-size="9">persists</text>

<path d="M500,245 L580,245" stroke="rgba(255,214,10,0.4)" stroke-width="1.5" stroke-dasharray="6,3" marker-end="url(#arrow)"/>
<text x="535" y="238" fill="rgba(255,214,10,0.6)" font-size="9">sync</text>

<!-- Annotation: automatic -->
<rect x="100" y="200" width="180" height="32" rx="6" fill="rgba(120,120,128,0.24)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
<text x="190" y="220" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="10">ModelContext auto-injected via @Environment</text>
```

## Pattern 5: Widget + Live Activity Extension

App + WidgetExtension + LiveActivity sharing timeline data.

```svg
<!-- App Group Container -->
<rect x="300" y="60" width="380" height="420" rx="20" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" stroke-dasharray="10,5"/>
<text x="320" y="90" fill="rgba(255,255,255,0.6)" font-size="12" font-weight="600">App Group Container</text>

<!-- Main App -->
<rect x="340" y="110" width="140" height="100" rx="12" fill="#0A0A0A" stroke="#38383A" stroke-width="2"/>
<text x="410" y="140" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">Main App</text>
<rect x="355" y="155" width="110" height="30" rx="6" fill="rgba(94,92,230,0.12)" stroke="#5E5CE6" stroke-width="1"/>
<text x="410" y="174" text-anchor="middle" fill="#fff" font-size="10">TimerView</text>

<!-- Widget Extension -->
<rect x="340" y="240" width="140" height="100" rx="12" fill="#0A0A0A" stroke="#38383A" stroke-width="2"/>
<text x="410" y="270" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">Widget</text>
<rect x="355" y="285" width="110" height="30" rx="6" fill="rgba(48,209,88,0.12)" stroke="#30D158" stroke-width="1"/>
<text x="410" y="304" text-anchor="middle" fill="#fff" font-size="10">TimerWidget</text>

<!-- Live Activity -->
<rect x="340" y="370" width="140" height="80" rx="12" fill="#0A0A0A" stroke="#38383A" stroke-width="2"/>
<text x="410" y="400" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">Live Activity</text>
<rect x="355" y="410" width="110" height="24" rx="6" fill="rgba(255,159,10,0.12)" stroke="#FF9F0A" stroke-width="1"/>
<text x="410" y="426" text-anchor="middle" fill="#fff" font-size="10">ActivityWidget</text>

<!-- Shared -->
<rect x="530" y="180" width="120" height="160" rx="12" fill="rgba(100,210,255,0.08)" stroke="#64D2FF" stroke-width="1.5" stroke-dasharray="6,3"/>
<text x="590" y="205" text-anchor="middle" fill="#64D2FF" font-size="11" font-weight="600">Shared</text>
<rect x="545" y="220" width="90" height="28" rx="6" fill="rgba(100,210,255,0.12)" stroke="#64D2FF" stroke-width="1"/>
<text x="590" y="238" text-anchor="middle" fill="#fff" font-size="10">TimerEntry</text>
<rect x="545" y="258" width="90" height="28" rx="6" fill="rgba(100,210,255,0.12)" stroke="#64D2FF" stroke-width="1"/>
<text x="590" y="276" text-anchor="middle" fill="#fff" font-size="10">Provider</text>
<rect x="545" y="296" width="90" height="28" rx="6" fill="rgba(100,210,255,0.12)" stroke="#64D2FF" stroke-width="1"/>
<text x="590" y="314" text-anchor="middle" fill="#fff" font-size="10">AppIntent</text>

<!-- AppIntents -->
<rect x="80" y="200" width="120" height="60" rx="10" fill="rgba(255,214,10,0.12)" stroke="#FFD60A" stroke-width="1.5"/>
<text x="140" y="225" text-anchor="middle" fill="#fff" font-size="12" font-weight="500">App Intents</text>
<text x="140" y="242" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">Shortcuts</text>

<!-- Connections -->
<path d="M480,160 L530,240" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" marker-end="url(#arrow)"/>
<path d="M480,290 L530,290" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" marker-end="url(#arrow)"/>
<path d="M480,410 L530,330" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" marker-end="url(#arrow)"/>
<path d="M200,230 L340,290" stroke="rgba(255,214,10,0.4)" stroke-width="1.5" stroke-dasharray="4,4" marker-end="url(#arrow)"/>
```

## Pattern 6: Security / Keychain Flow

Sensitive data boundary with Keychain, Biometry, and Secure Enclave.

```svg
<!-- User -->
<circle cx="120" cy="140" r="30" fill="rgba(10,132,255,0.15)" stroke="#0A84FF" stroke-width="1.5"/>
<text x="120" y="145" text-anchor="middle" fill="#fff" font-size="12" font-weight="500">User</text>

<!-- App -->
<rect x="240" y="100" width="140" height="80" rx="12" fill="rgba(94,92,230,0.12)" stroke="#5E5CE6" stroke-width="1.5"/>
<text x="310" y="130" text-anchor="middle" fill="#fff" font-size="13" font-weight="500">App</text>
<text x="310" y="148" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10">Presentation Layer</text>

<!-- Security Boundary -->
<rect x="460" y="60" width="220" height="200" rx="16" fill="none" stroke="rgba(255,69,58,0.4)" stroke-width="2" stroke-dasharray="6,4"/>
<text x="475" y="85" fill="#FF453A" font-size="11" font-weight="600">Security Boundary</text>

<!-- LocalAuthentication -->
<rect x="480" y="100" width="180" height="50" rx="8" fill="rgba(255,69,58,0.12)" stroke="#FF453A" stroke-width="1"/>
<text x="570" y="122" text-anchor="middle" fill="#fff" font-size="11" font-weight="500">LocalAuthentication</text>
<text x="570" y="138" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="9">Face ID / Touch ID</text>

<!-- Keychain -->
<rect x="480" y="170" width="180" height="50" rx="8" fill="rgba(255,69,58,0.12)" stroke="#FF453A" stroke-width="1"/>
<text x="570" y="192" text-anchor="middle" fill="#fff" font-size="11" font-weight="500">Keychain Services</text>
<text x="570" y="208" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="9">kSecClassGenericPassword</text>

<!-- Secure Enclave -->
<rect x="740" y="135" width="160" height="50" rx="8" fill="rgba(255,55,95,0.12)" stroke="#FF375F" stroke-width="1.5"/>
<text x="820" y="157" text-anchor="middle" fill="#fff" font-size="11" font-weight="500">Secure Enclave</text>
<text x="820" y="173" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="9">Hardware-isolated</text>

<!-- Arrows -->
<path d="M150,140 L240,140" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" marker-end="url(#arrow)"/>
<path d="M380,140 L460,125" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" marker-end="url(#arrow)"/>
<path d="M570,150 L570,170" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" marker-end="url(#arrow)"/>
<path d="M660,195 L740,160" stroke="rgba(255,69,58,0.4)" stroke-width="1.5" stroke-dasharray="4,4" marker-end="url(#arrow)"/>

<!-- Auth success annotation -->
<rect x="200" y="200" width="180" height="28" rx="6" fill="rgba(120,120,128,0.24)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
<text x="290" y="218" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="10">Biometric match → decrypt key</text>
```

## Common Marker Definition

Always include this in `<defs>`:

```svg
<defs>
  <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
    <path d="M0,0 L0,6 L9,3 z" fill="rgba(255,255,255,0.4)"/>
  </marker>
  <marker id="arrow-dashed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
    <path d="M0,0 L0,6 L9,3 z" fill="rgba(255,255,255,0.25)"/>
  </marker>
</defs>
```
