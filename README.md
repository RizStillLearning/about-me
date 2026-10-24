# about-me

A simple website of my profile: a one-page "about me" site for Harris Kristanto, a Computer Science student at BINUS University looking for an internship. It's styled as a retro CRT terminal.

**Live:** https://about-me-rizzk.vercel.app/

## What's on the page

The page reads like a shell session, and each section opens with a command:

| Section | Command | Content from |
|---|---|---|
| Bio | `whoami`, `neofetch` | [`content/bio.md`](content/bio.md) |
| Education | `cat education.md` | [`content/education.md`](content/education.md) |
| Organizations | `cat organizations.md` | [`content/organizations.md`](content/organizations.md) |
| Projects | `ls -la ~/projects` | [`content/projects.md`](content/projects.md) |
| Contact | `./contact` | [`content/contacts.md`](content/contacts.md) |

## Tech stack

- **Vite 8 + React 19 + TypeScript.** React only runs at build time: a small Vite plugin pre-renders the page to static HTML, so the browser gets HTML, CSS and about 1 KB of JavaScript (the copy-email button).
- **Plain CSS** with custom properties. Design tokens are in [`about-me/src/styles/tokens.css`](about-me/src/styles/tokens.css). No UI libraries.
- **Fonts:** JetBrains Mono and IBM Plex Mono, self-hosted through Fontsource.
- **Hosting:** Vercel.

## Project structure

```
.
├── about-me/                  # the Vite app
│   ├── index.html             # page shell; the pre-rendered markup is injected here
│   ├── plugins/prerender.ts   # renders src/entry-server.tsx into index.html (dev and build)
│   ├── src/
│   │   ├── components/        # React components, each with its own .css file
│   │   ├── lib/content.ts     # parses content/*.md at build time
│   │   ├── styles/            # tokens.css, global.css
│   │   ├── entry-server.tsx   # server-only render entry
│   │   └── main.ts            # browser entry: styles + copy-email button
│   └── vite.config.ts         # serves ../public as the public folder
├── content/                   # every piece of text on the site, as Markdown
├── public/                    # images/ and icons/, served as-is
├── references/                # the original style brief
├── CLAUDE.md                  # rules for AI coding agents working on this repo
└── DESIGN.md                  # the design system: tokens, components, rules
```

## Running locally

Requires Node.js 20.19+ or 22.12+.

```bash
cd about-me
npm install
npm run dev    # http://localhost:5173
```

| Command | What it does |
|---|---|
| `npm run dev` | Starts the dev server. Saving a component or a `content/` file reloads the page. |
| `npm run build` | Type-checks, then builds the static site into `about-me/dist/`. |
| `npm run preview` | Serves the built site. |
| `npm run lint` | Runs Oxlint. |

## Editing content

All the text on the site comes from `content/`, so you can update it without touching code. Keep the existing format, because the parser relies on it:

- **`bio.md`**: `##` sections for Name, Short bio, Skills, GPA, "What I'm looking for right now" and Photo. Skills are `- item` bullets. The photo uses `- Files: ./public/images/…` and `- Alt: …`.
- **`education.md`**: numbered items like `1. School name (2021-2024)`, with optional `- Key: value` lines indented under them.
- **`organizations.md`**: a Markdown table. Its header row becomes the table header on the site.
- **`projects.md`**: numbered items like `1. Name: short tagline`, followed by indented `- Description:`, `- Year:`, `- Link:`, `- Icon:`, `- Frameworks:` and `- Tags:` lines. Frameworks and tags are comma-separated.
- **`contacts.md`**: a `## Brief Closing` paragraph and a `## Contact List` of `- Label: value` bullets. The email becomes the copyable mail command, and a WhatsApp number links to `wa.me`.

Images go in `public/images/` and icons in `public/icons/`. Icons should be SVGs that use `fill="currentColor"` so they render in the site's green. Anything missing from `content/` shows up on the page as an amber `TODO:` marker instead of breaking the build.

## Deployment

Vercel builds from `main`. The app reads `../content` and `../public`, so the Vercel project needs these settings:

- **Root Directory:** `about-me`
- **Include files outside the root directory in the Build Step:** enabled

The framework preset (Vite) and output directory (`dist`) are the defaults.

## Design

The design system, covering colors, type, spacing, components and accessibility rules, is documented in [`DESIGN.md`](DESIGN.md).

## Credits

- Icons: [Bootstrap Icons](https://icons.getbootstrap.com/) (MIT): leaf, calculator, person-bounding-box
- Fonts: [JetBrains Mono](https://www.jetbrains.com/lp/mono/) and [IBM Plex Mono](https://www.ibm.com/plex/) (SIL Open Font License), via [Fontsource](https://fontsource.org/)
