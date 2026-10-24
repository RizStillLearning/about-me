# AGENTS.md

## What this project is
A one-person "about me" website for Harris Kristanto, a computer science student who is currently looking for internship.
The goal: in under a minute, a visitor understands who Harris is, sees his best work, and knows how to reach him.

## Stack
- Vite + React, pre-rendered to static HTML at build time. No client-side React unless a component truly needs it.
- Plain CSS with custom properties. Tokens live in src/styles/tokens.css.
- No UI kits or component libraries.

## Content rules
- Create the project by running `npm create vite@latest <project-name>` command in the project's directory (about_me_updated) so the `public/` folder doesn't conflict.
- All text comes from `content/`. Never invent copy, project names, numbers, clients or testimonials.
- If something is missing, leave a visible `TODO:` placeholder and tell me. Don't fill the gap yourself.
- Images live in `public/images/` and icons live in `public/icons/`. Use the file names and alt text listed in `content/`.
- Write the organizations section in table. 
- If a project hasn't had an existing icon from `public/icons/`. Please find a relevant icon for that project.
- Write the project tags in a rounded-rectangle component.

## Design rules
- Read `references/style-prompt.md` before writing any UI.
- Once `DESIGN.md` exists, it overrides everything in `references/`. Use only its tokens, and ask before adding a new color, font or size.
- Avoid the generic AI look:
  - no Inter, Roboto or Arial for headings
  - no purple/blue gradients, glassmorphism or glowing blobs
  - no three-column icon feature row, no "Hi, I'm Harris 👋" hero, no emoji as icons
  - no stock photos or AI-generated illustrations
- Accessibility is required: AA contrast, visible focus rings, 44px touch targets, one `h1` per page with headings in order, alt text from `content/`, and everything animated must respect `prefers-reduced-motion`.

## How to work
1. Build the homepage only, then stop and show me. Don't start other pages until I approve.
2. When I ask for a revision, change only that thing. Don't regenerate whole sections.
3. Don't edit `content/`, `references/` or this file unless I ask.
4. After I approve the homepage, write `DESIGN.md` from what was built.
5. Before saying something is done, check it at 375px and 1440px wide.

## Website structure
1. Bio (./content/bio.md)
2. Education (./content/education.md)
3. Organizations (.content/organizations.md)
4. Projects (./content/projects.md)
5. Contacts (./content/contacts.md)