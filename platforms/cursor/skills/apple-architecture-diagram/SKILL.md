---
name: apple-architecture-diagram
description: Create WWDC-Keynote-ready, self-contained HTML architecture diagrams for Apple platform apps (iOS, macOS, watchOS, tvOS, visionOS). Activates when users ask for app architecture, system design, data flow, module structure, or technical documentation for Apple apps. Produces ultra-beautiful, drill-down capable diagrams with Apple-native design language.
invoke: "/arch-diagram [topic] — Create a self-contained HTML architecture diagram for the given topic or system."
---

# Apple Architecture Diagram

Create WWDC-Keynote-ready architecture diagrams for Apple platform apps. Self-contained HTML+SVG, dark cinematic aesthetic, interactive drill-down across four architectural layers.

> **Embody a WWDC presenter.** Your diagrams are shown on a 40-foot screen to thousands of developers. Every pixel earns its place. No filler. No generic tech aesthetics.

## When to Use

- "Draw the architecture of this app" / "Show me how this is structured"
- "Document our iOS app architecture" / "Create a system diagram"
- "What's the data flow?" / "How do the modules interact?"
- "Show me the MVVM structure" / "SwiftData architecture"
- "Keynote-ready diagram" / "WWDC-style architecture doc"
- Comparing before/after refactoring architectures

## Core Philosophy

### 1. Apple Design Language, Not Generic Tech

**Anti-AI-slop rules specific to Apple diagrams:**

| Avoid | Use Instead |
|-------|-------------|
| Purple gradients | Apple system colors on true black |
| JetBrains Mono | SF Mono or ui-monospace |
| Material Design cards | Apple glass material with purposeful blur |
| Generic server icons | Apple device frames (iPhone, Mac, Vision Pro) |
| Flat color fills | Subtle depth, 1px borders, ambient glow |
| Cluttered boxes everywhere | Progressive disclosure — show layers on demand |
| Random hex colors | Apple semantic palette (see below) |

### 2. Four-Layer Drill-Down

Every architecture diagram supports four zoom levels. Default to **Logical**, let user drill:

| Layer | Question Answered | Detail Level |
|-------|-------------------|--------------|
| **Conceptual** | What problem does this solve? | User flows, business value, metrics |
| **Logical** | What are the major parts? | MVVM/TCA layers, modules, boundaries |
| **Physical** | Where does it run? | Devices, processes, threads, Darwin layers |
| **Implementation** | What are the actual files? | Xcode groups, specific classes, frameworks |

### 3. Cinematic Reveal

WWDC keynotes don't show everything at once. They **build**. Your diagrams should:
- Load with the Conceptual layer visible, others dimmed
- Animate elements in with staggered CSS transitions (0.3s ease-out)
- Use opacity + translateY for entrance, never jarring pops
- Reserve "hero moments" for the most important connection or boundary

---

## Apple Design System

### Color Palette

Use Apple system colors on true black `#000000`. Never tint neutrals toward purple.

| Component Type | Fill | Stroke | Glow (optional) |
|---------------|------|--------|-----------------|
| **User / Client** | `rgba(10, 132, 255, 0.12)` | `#0A84FF` | `0 0 20px rgba(10,132,255,0.15)` |
| **SwiftUI / UIKit View** | `rgba(94, 92, 230, 0.12)` | `#5E5CE6` | `0 0 20px rgba(94,92,230,0.15)` |
| **ViewModel / @Observable** | `rgba(191, 90, 242, 0.12)` | `#BF5AF2` | `0 0 20px rgba(191,90,242,0.15)` |
| **Service / Manager** | `rgba(255, 159, 10, 0.12)` | `#FF9F0A` | `0 0 20px rgba(255,159,10,0.15)` |
| **Data / SwiftData / Core Data** | `rgba(48, 209, 88, 0.12)` | `#30D158` | `0 0 20px rgba(48,209,88,0.15)` |
| **Cloud / Network** | `rgba(100, 210, 255, 0.12)` | `#64D2FF` | `0 0 20px rgba(100,210,255,0.15)` |
| **Apple Service** (CloudKit, APNS, etc.) | `rgba(255, 214, 10, 0.10)` | `#FFD60A` | `0 0 20px rgba(255,214,10,0.12)` |
| **Security / Keychain** | `rgba(255, 69, 58, 0.12)` | `#FF453A` | `0 0 20px rgba(255,69,58,0.15)` |
| **External API** | `rgba(255, 55, 95, 0.12)` | `#FF375F` | `0 0 20px rgba(255,55,95,0.15)` |
| **Combine / Event Bus** | `rgba(175, 82, 222, 0.12)` | `#AF52DE` | — |
| **Surface / Background** | `#1C1C1E` | `#38383A` | — |
| **Glass Panel** | `rgba(120, 120, 128, 0.24)` | `rgba(255,255,255,0.1)` | `backdrop-filter: blur(20px)` |

**Text colors:**
- Primary: `#FFFFFF`
- Secondary: `rgba(255, 255, 255, 0.6)`
- Tertiary: `rgba(255, 255, 255, 0.3)`
- Label on colored fill: `#FFFFFF` with `text-shadow: 0 1px 2px rgba(0,0,0,0.5)`

### Typography

```html
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  /* Fallback chain: SF Pro → Inter → system-ui */
  :root {
    --font-display: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif;
    --font-mono: 'SF Mono', SFMono-Regular, ui-monospace, Menlo, monospace;
  }
</style>
```

| Role | Size | Weight | Usage |
|------|------|--------|-------|
| Hero Title | 48px | 700 | Diagram title, top of page |
| Section Label | 14px | 600 | Layer titles, group headers |
| Component Name | 13px | 500 | Box labels inside SVG |
| Sublabel / Type | 11px | 400 | Protocol names, file references |
| Annotation | 10px | 400 | Arrows, small notes |
| Code / Mono | 12px | 400 | Class names, framework refs |

### Spacing System

Apple 8-point grid, adapted for SVG diagrams:

| Token | Value | Usage |
|-------|-------|-------|
| `space-xs` | 8px | Tight internal padding |
| `space-sm` | 16px | Component internal padding |
| `space-md` | 24px | Between related components |
| `space-lg` | 32px | Between groups |
| `space-xl` | 48px | Section breaks |
| `space-2xl` | 64px | Major boundaries |

**Vertical stacking rule:** Minimum 40px gap between component rows. Inline connectors (event buses) sit centered in the gap.

### Component Shape Language

- **Standard node:** `rx="12"` (Apple's large corner radius), 1.5px stroke
- **Device frame:** `rx="24"` for iPhone, `rx="16"` for Mac, `rx="40"` for Vision Pro
- **Security boundary:** Dashed stroke `stroke-dasharray="6,4"`, red tint, no fill
- **Module boundary:** Dashed stroke `stroke-dasharray="10,5"`, white 20% opacity, `rx="16"`
- **Glass detail panel:** `backdrop-filter: blur(20px)`, `background: rgba(120,120,128,0.24)`, `border: 1px solid rgba(255,255,255,0.1)`, `rx="16"`

---

## SVG Component Library

### Standard Service Node

```svg
<g class="node" data-layer="logical">
  <!-- Opaque backing to mask arrows behind -->
  <rect x="140" y="80" width="160" height="60" rx="12" fill="#1C1C1E"/>
  <!-- Styled surface -->
  <rect x="140" y="80" width="160" height="60" rx="12" fill="rgba(94,92,230,0.12)" stroke="#5E5CE6" stroke-width="1.5"/>
  <!-- Label -->
  <text x="220" y="108" text-anchor="middle" fill="#FFFFFF" font-family="var(--font-display)" font-size="13" font-weight="500">TimerView</text>
  <text x="220" y="125" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-family="var(--font-mono)" font-size="10">SwiftUI.View</text>
</g>
```

### Device Frame — iPhone

```svg
<g class="device-frame" transform="translate(40, 40)">
  <rect x="0" y="0" width="200" height="400" rx="32" fill="#0A0A0A" stroke="#38383A" stroke-width="2"/>
  <!-- Dynamic Island -->
  <rect x="60" y="12" width="80" height="28" rx="14" fill="#000"/>
  <!-- Screen content area -->
  <rect x="8" y="50" width="184" height="320" rx="8" fill="#1C1C1E"/>
  <!-- Home indicator -->
  <rect x="70" y="384" width="60" height="4" rx="2" fill="rgba(255,255,255,0.3)"/>
</g>
```

### Device Frame — Mac

```svg
<g class="device-frame" transform="translate(40, 40)">
  <!-- Top bar -->
  <rect x="0" y="0" width="400" height="28" rx="8" fill="#2C2C2E"/>
  <circle cx="20" cy="14" r="6" fill="#FF453A"/>
  <circle cx="40" cy="14" r="6" fill="#FFD60A"/>
  <circle cx="60" cy="14" r="6" fill="#30D158"/>
  <!-- Screen -->
  <rect x="0" y="28" width="400" height="272" rx="0 0 8 8" fill="#1C1C1E"/>
</g>
```

### Arrow / Connection

```svg
<defs>
  <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
    <path d="M0,0 L0,6 L9,3 z" fill="rgba(255,255,255,0.4)"/>
  </marker>
</defs>
<!-- Data flow (solid) -->
<path d="M300,190 L460,190" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" fill="none" marker-end="url(#arrow)"/>
<!-- Async / Event flow (dashed) -->
<path d="M300,230 L460,230" stroke="rgba(191,90,242,0.6)" stroke-width="1.5" stroke-dasharray="6,4" fill="none" marker-end="url(#arrow)"/>
```

### Glass Detail Panel (for drill-down)

```svg
<foreignObject x="520" y="80" width="280" height="200">
  <div xmlns="http://www.w3.org/1999/xhtml" style="
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    background: rgba(120,120,128,0.24);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px;
    padding: 16px;
    color: white;
    font-family: var(--font-display);
  ">
    <div style="font-size: 13px; font-weight: 600; margin-bottom: 8px;">TimerViewModel</div>
    <div style="font-size: 11px; color: rgba(255,255,255,0.6); font-family: var(--font-mono);">
      @MainActor @Observable<br/>
      Sources/ViewModels/
    </div>
  </div>
</foreignObject>
```

---

## Drill-Down Architecture

### Layer Toggle UI

Place a segmented control above the SVG for layer switching:

```html
<div class="layer-switcher" style="display: flex; gap: 4px; margin-bottom: 24px;">
  <button onclick="showLayer('conceptual')" class="layer-btn active">Conceptual</button>
  <button onclick="showLayer('logical')" class="layer-btn">Logical</button>
  <button onclick="showLayer('physical')" class="layer-btn">Physical</button>
  <button onclick="showLayer('implementation')" class="layer-btn">Implementation</button>
</div>
```

```css
.layer-btn {
  background: rgba(120,120,128,0.24);
  border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.6);
  padding: 6px 16px;
  border-radius: 8px;
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
.layer-btn.active {
  background: rgba(255,255,255,0.15);
  color: #fff;
  border-color: rgba(255,255,255,0.3);
}
```

### JavaScript Layer Controller

```html
<script>
function showLayer(layerName) {
  document.querySelectorAll('.layer-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  
  const layers = ['conceptual', 'logical', 'physical', 'implementation'];
  layers.forEach(l => {
    const g = document.getElementById('layer-' + l);
    if (g) {
      g.style.opacity = l === layerName ? '1' : '0.15';
      g.style.pointerEvents = l === layerName ? 'all' : 'none';
    }
  });
}
</script>
```

### SVG Layer Groups

```svg
<svg viewBox="0 0 1000 640" style="width: 100%; height: auto;">
  <!-- Background grid (subtle) -->
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="#000"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>
  
  <!-- Conceptual layer: user flows, value prop -->
  <g id="layer-conceptual" style="transition: opacity 0.5s ease;">
    <!-- User personas, business value, key metrics -->
  </g>
  
  <!-- Logical layer: MVVM, modules, boundaries -->
  <g id="layer-logical" style="transition: opacity 0.5s ease;">
    <!-- Views, ViewModels, Services, Data stores -->
  </g>
  
  <!-- Physical layer: devices, processes, Darwin -->
  <g id="layer-physical" style="transition: opacity 0.5s ease;">
    <!-- iPhone process, watch extension, CloudKit daemon -->
  </g>
  
  <!-- Implementation layer: Xcode groups, files -->
  <g id="layer-implementation" style="transition: opacity 0.5s ease;">
    <!-- File tree, framework dependencies, build phases -->
  </g>
</svg>
```

---

## HTML Template Structure

Every diagram follows this exact structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[App Name] — Architecture</title>
  <!-- Fonts -->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    :root {
      --font-display: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif;
      --font-mono: 'SF Mono', SFMono-Regular, ui-monospace, Menlo, monospace;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #000;
      color: #fff;
      font-family: var(--font-display);
      padding: 48px;
      min-height: 100vh;
    }
    /* ... all styles ... */
  </style>
</head>
<body>
  <!-- 1. Header -->
  <header style="margin-bottom: 32px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <div style="width: 8px; height: 8px; border-radius: 50%; background: #30D158; box-shadow: 0 0 12px #30D158;"></div>
      <h1 style="font-size: 32px; font-weight: 700; letter-spacing: -0.02em;">[App Name]</h1>
    </div>
    <p style="color: rgba(255,255,255,0.5); font-size: 15px;">Architecture Overview — [Platform]</p>
  </header>

  <!-- 2. Layer Switcher -->
  <div class="layer-switcher">...</div>

  <!-- 3. Main SVG Diagram -->
  <div style="border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 24px; background: rgba(255,255,255,0.02);">
    <svg viewBox="0 0 1000 640">...</svg>
  </div>

  <!-- 4. Detail Cards (3-column grid below diagram) -->
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px;">
    <div class="glass-card">...</div>
    <div class="glass-card">...</div>
    <div class="glass-card">...</div>
  </div>

  <!-- 5. Export Toolbar -->
  <div class="toolbar">...</div>

  <!-- Scripts: layer toggle + export -->
  <script>...</script>
</body>
</html>
```

---

## Export Toolbar

Every diagram ships with the `⋯` toggle in the top-right:

```html
<div class="toolbar" style="position: fixed; top: 24px; right: 24px; z-index: 100;">
  <div class="toolbar-actions" style="display: none; gap: 8px; margin-bottom: 8px;">
    <button onclick="copyAsImage()" title="Copy PNG">📋</button>
    <button onclick="downloadPNG()" title="Download PNG">🖼️</button>
    <button onclick="downloadPDF()" title="Download PDF">📄</button>
  </div>
  <button class="toolbar-toggle" onclick="this.previousElementSibling.style.display = this.previousElementSibling.style.display === 'flex' ? 'none' : 'flex'" style="width: 32px; height: 32px; border-radius: 8px; background: rgba(120,120,128,0.24); border: 1px solid rgba(255,255,255,0.1); color: #fff; cursor: pointer;">⋯</button>
</div>
```

**CDN dependencies (SRI-pinned):**
- `html2canvas@1.4.1` — for PNG capture
- `jspdf@2.5.2` — for PDF export

Capture excludes the toolbar, adds 32px padding around content, scale 2x for retina.

---

## Workflow

### Step 1: Analyze the codebase

Read key files to understand architecture:
- `README.md` — purpose, tech stack
- `*.xcodeproj` / `Package.swift` — dependencies, targets
- `Sources/` or top-level Swift files — module structure
- Key ViewModels, Services, Data models

### Step 2: Classify the architecture pattern

Determine which pattern the app uses:

| Pattern | Visual Signature |
|---------|-----------------|
| **MVVM + @Observable** | Views ↔ ViewModels ↔ Services ↔ Data |
| **TCA (The Composable Architecture)** | Store → Reducer → State + Actions → Effects |
| **Clean Architecture / VIPER** | View → Presenter → Interactor → Entity → Worker |
| **SwiftUI + SwiftData** | View → @Query → @Model → ModelContext |
| **Multi-platform (iOS + watchOS + visionOS)** | Device frames with shared services |

### Step 3: Map to four layers

Populate each layer with real project entities:

**Conceptual:**
- Who are the users? (persona icons)
- What value is created? (1-line value prop)
- Key metrics (optional)

**Logical:**
- Views (SwiftUI/UIKit)
- ViewModels / Store (state management)
- Services (network, location, notifications)
- Data layer (SwiftData, Core Data, UserDefaults, Keychain)
- Apple services (CloudKit, HealthKit, etc.)

**Physical:**
- Device/app process boundaries
- Extension processes (widget, watch, live activity)
- Background tasks (BGTaskScheduler)
- Network boundaries (device ↔ iCloud ↔ server)

**Implementation:**
- Xcode group structure
- Key files with paths
- Framework dependencies (local + SPM)
- Build target graph

### Step 4: Build the HTML

- Start with the template above
- Default SVG viewBox: `0 0 1000 640` (16:10, presentation-friendly)
- Logical layer is active by default
- Draw connections last (so they render behind boxes)
- Place legend outside all boundaries, 20px below lowest element

### Step 5: Validate

Before delivering:
- [ ] Open in Safari — does it look Keynote-ready?
- [ ] Test all four layer toggles
- [ ] Export PNG at 2x — is text crisp?
- [ ] Check that no arrows overlap component labels
- [ ] Verify legend is outside all boundary boxes
- [ ] Confirm no generic purple gradients or Inter-as-display-font slop

---

## Cross-Skill References

| Need | Load |
|------|------|
| Aesthetic guidance, anti-slop check, design critique | `huashu-design` skill |
| Swift 6 concurrency patterns for Physical layer | `ios-standards` skill |
| SwiftUI / SwiftData implementation details | `ios-design` skill |
| Specific API signatures for Apple frameworks | `ios26-api-reference` skill |
| Build target analysis | `ios-build` skill |

---

## Legend Placement Rule

**CRITICAL:** Place legends OUTSIDE all boundary boxes.

```
Module Boundary: y=30, height=460 → ends at y=490
Legend should start at: y=510 or below
SVG viewBox height: at least 580 to fit
```

Wrong: Legend at y=470 inside a boundary that ends at y=490.
Right: Legend at y=510, below the boundary, with viewBox extended.

---

## Output Specification

- **Single self-contained `.html` file**
- **Embedded CSS only** (no external stylesheets)
- **Inline SVG only** (no external images)
- **JavaScript** only for layer toggle and export (no frameworks)
- **Google Fonts via CSS @import** acceptable for display font fallback
- **CDN scripts** only for html2canvas + jsPDF export
- File name: `[AppName]-architecture.html`

---

## Example Trigger Phrases

> "Show me the architecture of this iOS app"
> "Create a WWDC-style diagram for our SwiftData setup"
> "How is the app structured? Make it visual."
> "Document our MVVM architecture — Keynote ready"
> "Draw the data flow from CloudKit to SwiftUI"
> "Architecture diagram with drill-down for our watchOS extension"
