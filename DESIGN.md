# DESIGN.md

The design system for Harris Kristanto's site, written down from the approved homepage.

- **This file overrides everything in `references/`.** Build new pages from what is here.
- **Use only these tokens.** Ask before adding a new color, font or size.
- Tokens are implemented in `about-me/src/styles/tokens.css`. If you change a value, change it in both places.

---

## 1. Concept

A retro CRT terminal. The whole page is one fake terminal window on a black canvas, and it reads top to bottom like a shell session: every section is introduced by a command prompt (`harris@portfolio:~$ cat education.md`).

- **Monospace only.** Hierarchy comes from size, weight and glow, never from a different typeface.
- **Phosphor green does all the work.** One amber is held back for "live" signals.
- **Left-aligned and command-driven.** The only centered block is the contact panel.
- **A console, not a marketing page:** flat near-black panels, hairline borders, small radii, blinking cursors.

---

## 2. Color

Contrast is the worst case, measured on `--color-surface-raised` (#070b07). AA needs 4.5:1 for normal text and 3:1 for large text and UI.

| Token | Value | Use | Contrast |
|---|---|---|---|
| `--color-bg` | `#000000` | Page canvas, inset boxes (photo frame, icon tile, command box) | n/a |
| `--color-surface` | `#050805` | Terminal window body | n/a |
| `--color-surface-raised` | `#070b07` | Title bar, panels, cards, table | n/a |
| `--color-tint` | `rgba(57,255,122,0.05)` | Tag fill, table header row, hover fills | n/a |
| `--color-tint-strong` | `rgba(57,255,122,0.08)` | Top of the contact panel gradient | n/a |
| `--color-border` | `#143614` | Default hairline (panels, cards, table rows) | n/a |
| `--color-border-strong` | `#1f4d1f` | Window frame, command box, tags, ghost button, social links, icon tile, photo frame | n/a |
| `--color-accent` | `#39ff7a` | Phosphor green: links, keys, prompts, project names, primary button, focus ring | 14.9:1 |
| `--color-accent-dim` | `#2bbf5c` | Secondary green: tag text, periods, years, highlighted phrases, `~/` prefixes | 8.2:1 |
| `--color-accent-faint` | `#1c7a3c` | **Lines and decoration only** (tree lines, trailing `/` on 22px names). Never readable body text. | 3.7:1 |
| `--color-text` | `#5f8d68` | Muted sage body text | 5.2:1 |
| `--color-ink` | `#eafff1` | Headings, names, values, strong text | 18.9:1 |
| `--color-amber` | `#ffd24a` | **Only** the live status in the title bar, `TODO:` markers, and one neofetch swatch | 13.8:1 |
| `--color-cyan` | `#5cf6ff` | **Only** the `~` path glyph in prompts and the title bar, and one neofetch swatch | 15.2:1 |
| `--color-dot-red` / `-amber` / `-green` | `#ff5f56` / `#ffbd2e` / `#27c93f` | **Only** the three window dots | n/a |
| `--color-selection` | `rgba(57,255,122,0.3)` | `::selection` background (text turns `--color-ink`) | n/a |

**Rules**

- Green is the only accent family. Amber is the single exception, and it means "live / needs attention".
- No purple, indigo or blue, and no second hue family.
- Text on the solid green button is `--color-bg`, at 15.8:1.
- Two literal colors exist outside the tokens:
  - the scanline shade `rgba(0,0,0,0.16)`
  - the icon `drop-shadow(0 0 4px rgba(57,255,122,0.45))`, which is the glow color

  Don't add more.

---

## 3. Typography

| Token | Family | Use |
|---|---|---|
| `--font-mono` | JetBrains Mono Variable (400–800) | Everything by default: headings, UI, labels, values |
| `--font-mono-text` | IBM Plex Mono (400, 500) | Long-form paragraphs only: hero intro, project descriptions, contact closing |

Both are self-hosted through `@fontsource`. **Never** use Inter, Roboto, Arial or any non-monospace face.

| Token | Size | Use |
|---|---|---|
| `--text-xs` | 12px | Table column headers, mobile table labels (uppercase, tracked) |
| `--text-sm` | 13px | Prompts, title bar, nav, tags, project meta/links, framework line, copy button |
| `--text-base` | 15px | Body default, buttons |
| `--text-md` | 17px | Hero role line, school names, neofetch title, contact closing, command box |
| `--text-lg` | 19 → 22px (fluid) | Project names |
| `--text-xl` | 24 → 30px (fluid) | Section `h2` |
| `--text-display` | 40 → 60px (fluid) | The name banner `h1` only |

- **Weights:** `--weight-regular` 400, `--weight-medium` 500, `--weight-semibold` 600, `--weight-bold` 700, `--weight-heavy` 800. Heavy is used only on the `h1`.
- **Leading:** `--leading-tight` 1.1 (`h1`), `--leading-snug` 1.35 (headings, role line), `--leading-body` 1.65 (everything else).
- **Tracking:** `--tracking-wide` 0.12em for uppercase micro-labels. Headings are tightened: `h1` −0.02em, `h2` −0.01em.

---

## 4. Space, shape, layout

**Spacing (4px grid)**

| `--space-1` | `--space-2` | `--space-3` | `--space-4` | `--space-5` | `--space-6` | `--space-7` | `--space-section` |
|---|---|---|---|---|---|---|---|
| 4px | 8px | 12px | 16px | 24px | 32px | 48px | 48 → 80px (fluid), the gap between sections |

**Radius:** `--radius-sm` 3px (focus ring, small UI), `--radius-md` 6px (buttons, tags, icon tile, photo frame, command box), `--radius-lg` 8px (window, panels, cards, social links). Nothing rounder than 8px and no pill shapes. Circles are used only for the window dots and the status dot.

**Layout tokens**

| Token | Value | Meaning |
|---|---|---|
| `--window-max` | 1120px | Max width of the terminal window |
| `--measure` | 640px | Max line length for hero copy |
| `--page-gutter` | 8 → 40px (fluid) | Space around the window |
| `--window-padding` | 16 → 48px (fluid) | Padding inside the window body |
| `--tap-target` | 44px | Minimum height/width of anything clickable |
| `--sticky-offset` | 72px | `scroll-margin-top` for sections under the sticky title bar |

**Breakpoints** (CSS can't read custom properties in media queries, so these are written literally)

- `max-width: 40rem` (640px) is the small-screen layout:
  - the neofetch panel stacks
  - rows of tables with more than two columns become labelled blocks (two-column tables stay as tables)
  - the project icon sits beside the name and the body spans full width
  - the command box stacks
  - the social links become a 2×2 grid
  - the tree leaders hide
- `min-width: 48rem` (768px): the title bar becomes sticky. Below 48rem the nav wraps onto its own row.
- `max-width: 69.99rem` (below 1120px): the amber status is hidden, because the hero says the same thing and the path, five nav links and status no longer fit on one row.

**Grid rules**

- One column of sections, left-aligned.
- Lists of things are a single column of wide rows.
- **No three-column icon rows.**

---

## 5. Effects

| Token | Value | Where |
|---|---|---|
| `--glow` | `0 0 8px rgba(57,255,122,.45), 0 0 24px rgba(57,255,122,.18)` | Name cursor `_` |
| `--glow-soft` | `0 0 6px rgba(57,255,122,.35)` | Green text: prompt user, role line, project names, `#` heading prefix, hovers |
| `--glow-name` | `0 0 10px rgba(57,255,122,.55), 0 0 34px rgba(57,255,122,.25)` | The `h1` name banner only |
| `--glow-amber` | `0 0 8px rgba(255,210,74,.7)` | Status dot |
| `--shadow-window` | hairline ring + 60px green bloom at 7% | Terminal window, contact panel |
| `--shadow-lift` | ring + soft green drop | Project card on hover |
| `--shadow-button` / `--shadow-button-hover` | 18px / 26px green bloom | Solid button, command box |

- **CRT scanlines:** a fixed, full-viewport, `pointer-events: none` overlay (`.crt-scanlines`, z-index 100) with a 4px repeating gradient line of `rgba(0,0,0,0.16)`, `mix-blend-mode: multiply`, opacity 0.5. It's hidden in print.
- **Block cursor** (`.cursor`): 0.6em × 1.15em in `--color-accent` with `--glow-soft`. It appears in the command box and the closing prompt. The name banner uses a green `_` instead.
- **Section divider:** a 1px top border on each section, fading `--color-border-strong` → transparent (85%).
- **Glow is used sparingly.** Body text never glows.
- **No** radial background glows, blobs, glassmorphism or background images.
- The only gradient fill is the contact panel's vertical `--color-tint-strong` → transparent.

---

## 6. Motion

| Token | Value | Use |
|---|---|---|
| `--blink` | 1.1s | `step-end` opacity blink for cursors (`@keyframes blink`). The status dot blinks at 1.6s. |
| `--duration` | 160ms | All hover transitions |
| `--ease` | `cubic-bezier(0.2, 0.7, 0.2, 1)` | All transitions |

- **Hover movement is small:** the solid button lifts 1px, a project card lifts 2px with `--shadow-lift`, and the card's arrow nudges 3px right.
- **Smooth scrolling** is on only under `prefers-reduced-motion: no-preference`.
- **Under `prefers-reduced-motion: reduce`, every animation and transition is off.** Cursors stay solid and visible. Anything new that moves must be covered by this rule.

---

## 7. Components

Every component is a React component in `about-me/src/components/` with a co-located `.css` file. Class names are BEM (`block__element--modifier`).

**TerminalWindow** frames the whole page.
- Title bar on `--color-surface-raised` with a bottom hairline, containing:
  - three 12px dots
  - the path label `harris@portfolio: ~` (user in bold green, `~` in cyan)
  - a right-aligned nav
  - an amber status: an 8px blinking dot plus text derived from content, shown from 70rem
- Nav links read `~/<section>`, one per section after the bio (education, organizations, competitions, projects, contact). The `~/` prefix is `--color-accent-dim` and `aria-hidden`. Links turn green and glow on hover and are 44px tall.
- The body is the page's `<main>`.

**Prompt** is the decorative command line before every section.
- Format: `{user}@portfolio:~$ {command}`. User in green with soft glow, `~` in cyan, `$` in sage, command in ink, all at 13px.
- Always `aria-hidden`.
- Commands so far:
  - `whoami`
  - `neofetch`
  - `cat education.md`
  - `cat organizations.md`
  - `cat competitions.md`
  - `ls -la ~/projects`
  - `./contact`

  New sections follow the same shell idiom.

**Section** is a Prompt plus an `h2` (`--text-xl`, ink, bold) with an `aria-hidden` green `# ` prefix. The heading text comes from the content file's heading. Each section has an `id` matching its nav link.

**Hero** (`whoami`):
- `h1` name at `--text-display`, weight 800, `--glow-name`, followed by a blinking green `_`
- role line (17px, green, soft glow) prefixed with a sage `> `
- intro in Plex Mono, max `--measure`, with chosen phrases in `--color-accent-dim`/500
- two buttons:
  - solid: green background, black text, `$ ls ~/projects ->`
  - ghost: `--color-border-strong` outline, green text, `./contact`

  Command glyphs in the labels are `aria-hidden`, so the accessible names are "projects" and "contact".

**Neofetch** (`neofetch`): a raised panel split into a 220px photo column and an info column.
- **Photo:**
  - 4:5 frame, `--color-border-strong`, 6px radius
  - the full-length photo is zoomed with `scale(2.3)` and `transform-origin: 63% 44%` to show head and torso
  - max 240px wide on small screens
- **Info:**
  - green user + `@portfolio` title over a dashed rule of the same length
  - a key/value list: green semibold `dt` with `:` in an 8.5rem column, ink `dd`
  - skills as an auto-fill grid (min 11.5rem) of `[x]` checks. `[x]` is CSS-generated, green, and hidden from screen readers.
  - a strip of 8 swatches (24 × 12px, 2px radius) in token colors, `aria-hidden`

**Education tree** (`cat education.md`):
- a `tree`-style list drawn with CSS: a 1px `--color-accent-faint` trunk and branches with a 28px indent. The last item's trunk stops at its branch.
- each row is an `h3` name (17px ink bold), a dotted leader, and a right-aligned period (13px dim green)
- details nest one level deeper as green key + ink value
- max width 48rem
- on small screens the leader hides and the period drops under the name

**TableSection** (`cat organizations.md`, `cat competitions.md`): one component for any section whose content file is a heading plus a Markdown table. It renders a real `<table>` in a raised, hairlined, 8px panel (`.data-table`).
- Header row on `--color-tint`, 12px uppercase tracked green.
- The first cell of each row is a `th scope="row"` (ink semibold). Cells get a modifier from their column header (`data-table__cell--role`, `--period`, `--year`…): role is dim green; experience, period and year are sage; period and year don't wrap.
- **Small screens:** tables with more than two columns (`.data-table--stack`, e.g. Organizations) turn each row into a block with the first cell on top and `data-label` labels (12px uppercase dim green, 6.75rem column) beside each value. Two-column tables (Competitions) stay as tables.
- Explicit ARIA table roles keep the semantics when the display is changed.

**ProjectCard** (`ls -la ~/projects`): a raised card, 8px radius, `--color-border` hairline, in a single-column list with a 16px gap. Grid areas: `icon head / icon body`, and `icon head / body body` on small screens. Cards with a screenshot use the `project--with-shot` areas described below.
- **Icon tile:** 52px (44px on small screens), black, `--color-border-strong`, 6px radius, icon drawn in `--color-accent` with the green drop-shadow.
  - SVGs are inlined at 26px (22px).
  - Icons with hard-coded colors (`fill="#…"`) lose their background `rect` and are redrawn in `currentColor` at full tile size.
  - Icons come from `public/icons/`. New icons should match: Bootstrap Icons, 16px viewBox, `fill="currentColor"`.
- **Head:**
  - `h3` name (`--text-lg`, green, soft glow) with an `aria-hidden` faint `/`
  - on the right, the year (dim green) and an `aria-hidden` `drwxr-xr-x` in sage
  - the tagline below in ink 500
- **Body:**
  - description in Plex Mono (max 64ch)
  - detail rows: every other `Key: value` line from the project's content (Category, Type, Role, Frameworks…), in content order, as a two-column grid with the keys aligned (green key with `:`, ink value, 13px)
  - a footer row of Tags plus the repo link: `->` and the URL without its protocol, with a break opportunity after each `/`
- **Screenshot** (optional, from the project's `Image:` line):
  - a 16:9 frame (black, `--color-border-strong`, 6px radius) showing the image with `object-fit: cover` from the top left, lazy-loaded
  - from 48rem it takes a right-hand column `clamp(12rem, 28vw, 22rem)` wide (areas `icon head shot / icon body shot`)
  - below 48rem it sits under the head in the text column (`icon head / icon shot / icon body`), and full width under 40rem (`icon head / shot shot / body body`)
  - card hover turns the frame border `--color-accent-faint`
  - alt text comes from the project's `- Alt:` line. Until it exists, a TODO shows under the image.
- **Interaction:** the link stretches over the whole card. Hover lifts the card, underlines the URL and nudges the arrow. Keyboard focus draws the ring around the card via `:has()`.

**Tag** is the rounded rectangle for project tags: 6px radius, `--color-border-strong` outline, `--color-tint` fill, 13px dim green 500, `2px 10px` padding. It's never fully rounded and never clickable.

**Contact** (`./contact`): a centered panel with the green tint gradient, `--color-border-strong`, and `--shadow-window`.
- **Closing line:** Plex Mono 17px ink, max 56ch.
- **Command box:** black inset, `--shadow-button`. It holds:
  - the `mailto:` link `$ mail <email>` (the `$ mail` prefix is green and `aria-hidden`), followed by a blinking cursor
  - a `copy` button, revealed by JS only when the Clipboard API exists. It changes to `copied` for 2s and announces through a polite live region.
- **Social links:** 8px-radius outlined links, 44px tall, each with a green `->` and an ink label; they turn green on hover. On small screens they form a 2×2 grid.

**Todo** marks missing content: amber dashed outline, amber 13px text reading `TODO: …`. It's always visible on the page.

**Session end:** a hairline, then an empty prompt with a blinking cursor closing the window.

---

## 8. Copy and chrome

- **All real text comes from `content/`.** That covers names, headings, descriptions, dates, links and labels.
- **Decorative terminal chrome is allowed when it doesn't claim a fact:**
  - prompts and commands
  - `~/` prefixes
  - `#` heading markers
  - `->` arrows and `[x]` checks
  - `drwxr-xr-x`
  - the closing prompt

  Mark it `aria-hidden` (or use `content: '…' / ''` for CSS-generated text).
- **Never invent data,** even as decoration: no star counts, commit hashes, uptime, copyright years, fake OS lines or testimonials.
- **Functional UI words are allowed:** `copy`, `copied`, "Skip to content", aria-labels.
- **Anything missing renders as a visible `Todo`**, and you tell Harris.

---

## 9. Accessibility checklist

- **AA contrast.** See the table in §2; `--color-accent-faint` is never used for readable text.
- **Focus ring** on every focusable element: `2px solid --color-accent`, `outline-offset: 3px`. On project cards it's drawn around the card.
- **Touch targets** of at least 44px for every link and button.
- **Headings:** one `h1` (the name). Every section has an `h2`, items use `h3`, and levels are never skipped.
- **Alt text** for images comes from `content/` (a `TODO` until it exists). Icons beside a visible name are decorative (`aria-hidden`).
- **Reduced motion** is respected (§6).
- **Skip link** to `#main`. Lists styled with `list-style: none` keep `role="list"`.
- **Test at 375px and 1440px wide** before calling anything done: no horizontal scroll, axe clean, Tab through every control.

---

## 10. Implementation notes

- **App and assets:** the app lives in `about-me/`. `content/` and `public/` live at the repo root and are read from there; Vite's `publicDir` points at the root `public/`.
- **Image paths:** an image path in `content/` that doesn't exist falls back to the same file name in `public/images/`.
- **Rendering:** React renders only at build/dev time (`about-me/plugins/prerender.ts` → `src/entry-server.tsx`). The browser gets static HTML and CSS. Client JS is limited to progressive enhancement in `src/main.ts`.
- **Styles:**
  - `tokens.css` → `global.css` (base, utilities, `.cursor`, `.todo`, `.crt-scanlines`) → component CSS, which is pulled into the client bundle by `src/styles/components.ts`
  - Components use tokens only. Fixed component dimensions (icon tile, photo column, table label column, swatches, dots) are listed in §7.
