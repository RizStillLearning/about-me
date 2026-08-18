# Harris Kristanto — Portfolio

A modern, single-page "about me" portfolio built with React and Tailwind CSS. Features a colorful animated gradient background that flows across the whole page, a responsive navbar, and sections for intro, education, projects, and social links.

## Tech stack

- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [lucide-react](https://lucide.dev/) for UI icons
- [react-icons](https://react-icons.github.io/react-icons/) for social/brand icons

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Scripts

| Command           | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`       | Start the dev server with hot reload |
| `npm run build`     | Build for production into `dist/`    |
| `npm run preview`   | Preview the production build locally |
| `npm run lint`      | Run oxlint                           |

## Personalizing the content

All editable content — name, bio, education, skills, projects, and social links — lives in one file:

```
src/data/profile.js
```

Edit the values there and every section updates automatically. No need to touch the components themselves unless you want to change the layout or styling.

## Project structure

```
src/
├── components/
│   ├── Navbar.jsx           # Sticky nav with mobile menu
│   ├── Hero.jsx              # Name, tagline, CTA buttons, quick social links
│   ├── About.jsx             # Education card + skills
│   ├── Projects.jsx          # Project card grid
│   ├── Contact.jsx           # Social links + footer
│   └── GlobalBackground.jsx  # Continuous colorful gradient behind the whole page
├── data/
│   └── profile.js            # All editable site content
├── App.jsx
├── main.jsx
└── index.css
```

## Deploying

The build output in `dist/` (from `npm run build`) is static and can be deployed to any static host — Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.

### Deploying to Vercel

This repo includes a `vercel.json` that pins the build settings (Vite framework, `npm run build`, output in `dist/`).

**Option A — Git integration (recommended):**
1. Push this repo to GitHub (already done if you're reading this from `RizStillLearning/about-me`).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel reads `vercel.json` automatically — just click **Deploy**.
4. Every push to `main` triggers a new deployment.

**Option B — Vercel CLI:**
```bash
npm install -g vercel
vercel        # first run links/creates the project and deploys a preview
vercel --prod # deploy to production
```
