# Design

<!-- impeccable:design-schema 1 -->

## Direction Contract

**THESIS:** Hu Lab and Hu Select share one URL but inhabit two distinct visual rooms — the reading room (Lab) and the shop (Select). The category default would make both feel like a tech blog or a generic affiliate store. This design commits each to its own material system: Lab is the Stripe Press book spread (white paper, serif display, generous margins, single saturated accent), Select is the dark-commerce counterpoint (night ground, warm gold accent, Inter throughout).

**OWN-WORLD:** Lab lives on warm white paper (#f8f6f0) with near-black text, IBM Plex Serif for display headlines, Inter for UI labels, and a blue accent (light #2563eb / dark #60a5fa). Select lives on near-black (#0d0b09) with Inter throughout, a warm gold accent (light #b8860b / dark #d4a017). Both share the same component vocabulary (cards, buttons, nav) but with distinct palette per zone. The accent hue is the brand marker: blue says "reading", gold says "shopping".

**STORY:** The reader finds a clean, airy reading surface at Hu Lab — like a technical book spread or Stripe Press page. Content earns the whitespace. Crossing into Select, the background deepens, the accent warms, the mode shifts: shop, not library. Same person behind both, same trust, different intention.

**FIRST VIEWPORT (Lab homepage):** Kraut-style masthead: small tracked sans label ("Ideas & Tools"), then site title in large serif weight. Subtitle in Inter, muted. Featured card: image splits the viewport on the left, text on the right — a confident magazine spread.

**FORM:** Assigned direction 6 (Stripe Press editorial-tech). Single scroll page, Read mode for Lab, Persuade mode for Select.

## Global System

### Lab zone (light)
- bg: #f8f6f0 | surface: #fcfbf8 | text: #1a1a1a | text-muted: #6b6b6b
- accent: #2563eb | accent-soft: #e0e8f5 | border: #e0ddd8

### Lab zone (dark)
- bg: #121212 | surface: #1e1e1e | text: #ececec | text-muted: #8a8a8a
- accent: #60a5fa | accent-soft: #1e293b | border: #2a2a2a

### Select zone (light)
- bg: #faf8f4 | surface: #ffffff | text: #1a1a1a | text-muted: #6b6b6b
- accent: #b8860b | accent-soft: #f5edc8 | border: #ddd2c2

### Select zone (dark)
- bg: #0d0b09 | surface: #1a1612 | text: #ece2d4 | text-muted: #8a7d6e
- accent: #d4a017 | accent-soft: #2c2210 | border: #3d3228

### Typography
- sans: 'Inter', system-ui, sans-serif
- serif: 'IBM Plex Serif', 'Noto Serif TC', Georgia, serif
- mono: 'JetBrains Mono', ui-monospace, monospace
- body measure: 68ch | heading tracking: -0.02em
- h1: serif, 2.5-4.5rem, weight 450 | h2: serif, 1.5-2.25rem, weight 450
- body: sans, 1rem, lh 1.6 | small label: sans, 0.72rem, tracking 0.08em, uppercase

### Components
- Header: scrolls away (no fixed sticky on reading surfaces). Border-bottom accent line.
- Featured card: 2-col grid, image left, text right. Flat border (no border-radius).
- Cards: flat, thin border, hover lifts.
- Article content: serif body for Lab, sans-serif body for Select.
- Buttons: flat, solid accent bg, no border-radius.
