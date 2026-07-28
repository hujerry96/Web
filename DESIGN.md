# Design

<!-- impeccable:design-schema 1 -->

## Direction Contract

**THESIS:** Hu Lab and Hu Select share one terminal. The category default makes a personal tech site a template blog or generic storefront. This design refuses both: the site is a phosphor terminal in a midnight machine room. Lab is P1 green — reading is typing at the terminal. Select is amber — shopping is the warm glow of another machine in the same dark room. Light mode is the same room by day: the teletype paper output tray, the fanfold roll, softer and cleaner.

**OWN-WORLD:** Near-black ground (#0f0e0c), P1 green (#00ff41) for Lab accent, amber (#ff9500) for Select accent. One monospaced face carries the entire interface (JetBrains Mono). Content reads on a fixed-width column. The cursor blinks at the bottom of every page. No rounded corners, no shadows, no images that pretend to be UI. Every element is output from a machine that has been running the whole time.

**STORY:** The visitor walks into a dim machine room. One terminal glows green — the library. Another glows amber — the shop. They sit, type, read. Content arrives as output in the scrolling transcript. The machine has been writing things worth reading; the visitor is just catching up on the session.

**FIRST VIEWPORT (Lab):** Near-black ground. At the top, a file header: "HU LAB / Ideas & Tools" — small, tracked, uppercase, monospace. A prompt line: the site subtitle as a `cat` output. Then the article listing as a `ls` directory. Below the fold, the featured article renders as the first content block. A blinking cursor at the bottom of the viewport, always ready.

**SIGNATURE INTERACTION:** The cursor blinks. On the homepage, type to filter articles — a terminal filter over the transcript. Every page is a session that starts with a prompt and ends with the cursor waiting for the next command.

**FORM:** Assigned index 5 (grounded) fused with challenger 4 (phosphor terminal). Roll key a6c52c38. Read mode for Lab, Persuade mode for Select.

## Global System

### Lab (dark — primary)
- bg: #0f0e0c | surface: #1a1916 | text: #e8e4dc | text-muted: #6b6860
- accent: #00ff41 | accent-dim: #00aa2a | accent-bg: #003a11
- selection: #00ff4120

### Lab (light — teletype paper)
- bg: #f5f0e8 | surface: #fcfaf5 | text: #1a1815 | text-muted: #7a756a
- accent: #007a1a | accent-dim: #005512 | accent-bg: #dff0df

### Select (dark — amber machine)
- bg: #0f0e0c | surface: #1a1916 | text: #e8e4dc | text-muted: #6b6860
- accent: #ff9500 | accent-dim: #cc7700 | accent-bg: #3a2500

### Select (light — paper)
- bg: #f5f0e8 | surface: #fcfaf5 | text: #1a1815 | text-muted: #7a756a
- accent: #aa6600 | accent-dim: #884d00 | accent-bg: #f0e4d0

### Typography
- interface: 'JetBrains Mono', 'Noto Sans TC', ui-monospace, monospace
- body (Lab article): 'JetBrains Mono', 'Noto Sans TC', ui-monospace, monospace
- body (Select article): 'Inter', 'Noto Sans TC', sans-serif
- code: 'JetBrains Mono', ui-monospace, monospace
- body measure: 72ch | heading letter-spacing: -0.02em
- scale: 0.75rem / 0.875rem / 1rem / 1.25rem / 1.5rem / 2rem / 2.5rem
- labels: 0.72rem, letter-spacing 0.08em, uppercase

### Components
- Header: terminal prompt line. No logo, no brand mark — just text: `$ cd ~/hu-lab` style path. Thin bottom border (1px solid accent).
- Featured card: terminal output block with a thin left border (1px accent). No image chrome — flat image or no image.
- Cards: single border line, no border-radius. Hover turns cursor to text-select.
- Article content: monospace body for Lab, sans-serif body for Select. Code blocks in terminal green-on-black.
- Buttons: terminal-style command labels. Flat, no bg fill — just a `$ command` prompt.
- Footer: terminal session end marker: `^D  │  session closed` with timestamp.

### Motion
- Cursor: CSS blink at 1s interval, always visible at bottom of content area.
- Articles fade in with a CRT scan-line glow effect (mask-image gradient).
- Reduce motion: cursor stops blinking, transitions become instant.
