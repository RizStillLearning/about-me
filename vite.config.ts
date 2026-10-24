import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import prerender, { jsx } from './plugins/prerender.ts'

// content/ and public/ live in the repo root, one level above this app.
const fromRepoRoot = (dir: string) => fileURLToPath(new URL(`../${dir}`, import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  publicDir: fromRepoRoot('public'),
  oxc: { jsx },
  plugins: [prerender({ watch: [fromRepoRoot('content')] })],
})
