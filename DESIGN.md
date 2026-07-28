# Design

<!-- impeccable:design-schema 1 -->

## Direction Contract

**THESIS:** Hu Lab and Hu Select are two shelves in one refined personal library. The old terminal theme made reading feel like decoding machine output. This redesign replaces it with a modern editorial dark — generous whitespace, clear hierarchy, subtle depth, and purposeful motion. The site should feel like opening a beautifully typeset book in a quiet room, not sitting at a glowing terminal.

**OWN-WORLD:** Cool near-black ground (#0c0c0e), deep indigo-blue accent (#6c8cff) for Lab, warm copper (#e8a87c) for Select. Display type in Space Grotesk, body in Inter. Rounded corners (10-12px), soft layered shadows, frosted glass header on scroll. Every surface has subtle depth through elevation layers, not hard borders. Light mode is warm paper (#f6f4f0) with the same accent system.

**STORY:** The visitor enters a well-lit personal library. The Lab section is a cool-toned reading room with deep blue accents. The Select section is a warm-toned display shelf with copper highlights. Both share the same refined architecture — clean lines, generous spacing, smooth transitions. The content is the artifact; the interface recedes.

**FIRST VIEWPORT (Lab):** Cool near-black ground. At top, a frosted glass sticky header with the site name in Space Grotesk and clean navigation. Below, a generous hero: "Hu Lab" in large display type, a one-line description in muted text, and rounded-pill category filters. The featured article is a large two-column card with image zoom on hover. Below, a responsive grid of article cards with elevation and soft glow on hover.

**SIGNATURE INTERACTION:** Scroll-triggered reveal animations — elements fade up as they enter the viewport. Cards lift with a subtle glow on hover. The header transitions from transparent to frosted glass as the user scrolls. Every interaction is smooth and purposeful, never distracting.

**FORM:** Refined dark editorial. Read mode for Lab, Persuade mode for Select. The form was chosen to maximize reading comfort and visual hierarchy while maintaining the personal, non-corporate feel of a one-person site.

## Global System

### Lab (dark — primary)
- bg: #0c0c0e | surface: #141418 | surface-raised: #1c1c22
- text: #eae8e4 | text-secondary: #7a7880 | text-tertiary: #504e56
- accent: #6c8cff | accent-dim: #4a6adf | accent-muted: rgba(108,140,255,0.08) | accent-glow: rgba(108,140,255,0.15)
- border: #26262e | border-subtle: #1e1e24 | border-hover: #363640
- selection: rgba(108,140,255,0.2)

### Lab (light — warm paper)
- bg: #f6f4f0 | surface: #ffffff | surface-raised: #faf9f7
- text: #1a1a1f | text-secondary: #6b6870 | text-tertiary: #9a979e
- accent: #3d5ccc | accent-dim: #2d4ab8 | accent-muted: rgba(61,92,204,0.06) | accent-glow: rgba(61,92,204,0.1)
- border: #e2e0dc | border-subtle: #ece9e4 | border-hover: #ccc8c0
- selection: rgba(61,92,204,0.15)

### Select (dark — copper machine)
- accent: #e8a87c | accent-dim: #d4946a | accent-muted: rgba(232,168,124,0.08) | accent-glow: rgba(232,168,124,0.15)
- Inherits all other colors from Lab dark.

### Select (light — paper)
- accent: #b87530 | accent-dim: #9a5f20 | accent-muted: rgba(184,117,48,0.06) | accent-glow: rgba(184,117,48,0.1)
- Inherits all other colors from Lab light.

### Typography
- display: 'Space Grotesk', 'Noto Sans TC', system-ui, sans-serif
- body: 'Inter', 'Noto Sans TC', system-ui, sans-serif
- code: 'JetBrains Mono', 'Noto Sans TC', ui-monospace, monospace
- body measure: 72ch | heading letter-spacing: -0.025em
- headings: font-weight 600 | line-height 1.2
- labels: 0.72rem, font-medium, letter-spacing 0.08-0.12em, uppercase

### Components
- Header: sticky, frosted glass on scroll (backdrop-filter: blur(16px) saturate(1.2)). Site name in Space Grotesk. Clean nav links with rounded hover states. Icon buttons for search/theme. Mobile hamburger menu with slide-down panel.
- Featured card: large two-column grid (1.2fr 1fr), 14px border-radius, image zoom on hover, soft glow shadow on hover state.
- Cards: 12px border-radius, subtle border, elevation via surface color. Hover: translateY(-4px), accent border, glow shadow, image scale(1.04).
- Article content: Inter body, 1rem/1.75, max-width 72ch. Prose h2 has subtle bottom border. Code blocks in dark bg with rounded corners. Blockquotes with accent left border and muted bg.
- Buttons: rounded-full pills for category filters. Icon buttons with 8px border-radius. CTA buttons with rounded-lg and hover glow.
- Footer: clean three-column grid, subtle social icon buttons, minimal border-top.

### Motion
- Scroll reveal: elements start at opacity 0, translateY(24px), transition to visible on IntersectionObserver. Staggered delays for grouped elements (80ms increments).
- Card hover: 280ms ease transform + shadow + border. Image zoom 500-600ms ease.
- Header: 300ms transition from transparent to frosted glass.
- Back to top: 44px rounded button, appears after 400px scroll, smooth fade-in.
- Reading progress: 2px gradient bar at top, scales with scroll position.
- Reduce motion: all reveals snap to visible, transitions disabled, scroll-behavior auto.
