# Design System Specification: Spectral Graphite Architecture

## 1. Overview & Creative North Star
**Creative North Star: The Kinetic Observatory**

This design system is built for the "Power User"—the developer who demands high-density information without the cognitive load of a cluttered interface. We are moving away from the "SaaS Blue" ubiquity toward a high-contrast, editorial approach that feels like a precision instrument.

The "Kinetic Observatory" concept treats the UI as a dark, expansive void where data points are luminous celestial bodies. By utilizing a **Spectral Palette** against a **Deep Graphite** base, we create a clear separation between the tool’s chrome and the user’s logic. We break the "template" look by favoring **intentional asymmetry**: sidebars that don't reach the top, overlapping floating inspector panels, and a hierarchy driven by light and depth rather than lines and boxes.

---

## 2. Colors & Surface Logic

### The Spectral Palette (Accents)
Functional color is the soul of this system. Each hue has a specific semantic duty to prevent "rainbow fatigue."
- **Primary / Selection:** `primary` (#ba9eff) — Use for focus states and active navigation.
- **Intelligence / AI:** `secondary` (#9093ff) — Reserved for LLM suggestions and automated insights.
- **Manual Inputs:** `tertiary` (#ff8439) — Signifies user-controlled variables and magmatic energy.
- **Success / Live:** `acid-green` (#22C55E) — The pulse of a healthy system.
- **Alerts / Errors:** `error` (#ff6e84) — High-chroma signals for immediate intervention.

### Neutral Foundation (The Graphite Base)
The background is not "Black"; it is a layered series of charcoals that provide depth.
- **Base Surface:** `surface` (#0c0e10)
- **Container Tiers:** `surface_container_low` (#111416) through `highest` (#232629).

### The "No-Line" Rule
**Standard 1px solid borders are prohibited for layout sectioning.** To define global regions (e.g., Sidebar vs. Editor), use background color shifts. Place a `surface_container_low` sidebar against a `surface` editor. The eye will perceive the boundary through the shift in tonal value, resulting in a cleaner, more premium feel.

### Glass & Texture
For floating "over-the-UI" elements (Modals, Command Palettes), use **Glassmorphism**. Combine `surface_container_high` at 80% opacity with a `backdrop-blur` of 20px. This allows the spectral highlights of the code or data below to "bleed" through, grounding the floating element in the workspace.

---

## 3. Typography: The Editorial Tech-Stack

We employ a dual-typeface system to distinguish between *interface* and *intellect*.

### UI Interface: Inter
Inter is used for all functional UI—menus, labels, and headlines. It is clean, legible at small scales, and neutral.
- **Display (L/M/S):** Large, tight tracking (-0.02em). Used for dashboard headers and empty states.
- **Labels (M/S):** `label-md` (0.75rem) is our workhorse. Use it in All-Caps with +0.05em tracking for category headers to create an editorial feel.

### Technical Data: JetBrains Mono
Any data that the user *creates* (code, logs, coordinates, variables) must be rendered in JetBrains Mono. This provides an immediate visual cue that "this content is mine/functional," distinct from the "tool's" labels.

---

## 4. Elevation & Depth: Tonal Layering

### The Layering Principle
Depth is achieved by "stacking" surface tiers.
1. **The Floor:** `surface_container_lowest` (#000000) - used for deep backgrounds or terminal wells.
2. **The Base:** `surface` (#0c0e10) - the main workspace.
3. **The Object:** `surface_container_low` (#111416) - cards or panels.
4. **The Interaction:** `surface_container_highest` (#232629) - hovered states or active sections.

### Ambient Shadows & Ghost Borders
- **Shadows:** Never use pure black shadows. Use a tinted shadow: `rgba(0, 0, 0, 0.4)` with a 32px blur and 12px Y-offset for high-elevation elements.
- **The Ghost Border:** For high-density data tables where separation is mandatory, use the `outline_variant` token at **15% opacity**. It should be felt, not seen.

---

## 5. Components: Precision Primitives

### Buttons
- **Primary:** `primary` background with `on_primary` text. No gradient. Use a `primary_dim` subtle glow (`box-shadow: 0 0 12px 0 #8455ef44`) on hover.
- **Secondary:** Transparent background with a `Ghost Border` and `primary` text.
- **Tertiary (Manual):** `tertiary_container` background. Use for "Destructive" or "Manual Override" actions.

### Input Fields
Inputs should feel "recessed." Use `surface_container_lowest` with a 1px bottom-border of `outline_variant`. On focus, transition the bottom border to `primary` and add a subtle 2px `primary` outer glow.

### Chips & Tags
- **Status Chips:** Small, pill-shaped, using `surface_container_high`. Use a 6px solid circle of the spectral color (e.g., `acid-green`) to denote state.
- **AI Tags:** Use `secondary` (Electric Indigo) with a subtle mesh gradient background to distinguish from manual tags.

### Cards & Lists
**Divider lines are forbidden.** Separate list items using 4px of vertical space and a `surface_container_low` background on hover. For complex cards, use padding and typography weight (`title-sm` vs `body-sm`) to create structure.

---

## 6. Do's and Don'ts

### Do
- **Do** use JetBrains Mono for any alphanumeric string that is a "value" or "result."
- **Do** use `primary_dim` for subtle glows on active icons; it should look like a powered-on LED.
- **Do** utilize "Dead Space." High-density tools need breathing room between functional groups to prevent user fatigue.

### Don't
- **Don't** use 100% white (#FFFFFF) for text. Use `on_surface` (#f0f0f3) to reduce eye strain on dark backgrounds.
- **Don't** use heavy gradients. We favor "flat-depth"—flat colors that gain depth through layering and transparency.
- **Don't** use standard "Blue" for links or primary actions. This system is defined by its **Violet/Indigo/Orange** spectrum.