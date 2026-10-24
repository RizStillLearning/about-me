import { createServer, type Plugin, type ViteDevServer } from 'vite'

interface Page {
  title: string
  description: string | null
  html: string
}

const ENTRY = '/src/entry-server.tsx'

// React automatic runtime. Shared with vite.config.ts because the throwaway
// build-time server below doesn't read the config file.
export const jsx = { runtime: 'automatic', importSource: 'react' } as const

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Renders src/entry-server.tsx into index.html (per request in dev, once at build time)
 * so the browser gets plain HTML + CSS and React only ever runs in Node.
 */
export default function prerender({ watch = [] }: { watch?: string[] } = {}): Plugin {
  let root = ''
  let devServer: ViteDevServer | undefined

  async function renderPage(): Promise<Page> {
    if (devServer) return (await devServer.ssrLoadModule(ENTRY)).render()

    // `vite build` has no dev server, so start a throwaway one just to load the entry.
    const server = await createServer({
      root,
      configFile: false,
      logLevel: 'error',
      appType: 'custom',
      oxc: { jsx },
      server: { middlewareMode: true, hmr: false, watch: null },
    })
    try {
      return (await server.ssrLoadModule(ENTRY)).render()
    } finally {
      await server.close()
    }
  }

  return {
    name: 'prerender',
    configResolved(config) {
      root = config.root
    },
    configureServer(server) {
      devServer = server
      // Components, content/ and icons are only used server-side, so client HMR never
      // sees them change. Drop the cached modules and reload the page instead.
      server.watcher.add(watch)
      server.watcher.on('change', (file) => {
        if (!/\.(tsx|md|svg)$/.test(file) && !file.includes('/src/lib/')) return
        server.environments.ssr.moduleGraph.invalidateAll()
        server.ws.send({ type: 'full-reload' })
      })
    },
    transformIndexHtml: {
      order: 'post',
      async handler(html) {
        const page = await renderPage()
        const head = [
          `<title>${escapeHtml(page.title)}</title>`,
          page.description && `<meta name="description" content="${escapeHtml(page.description)}" />`,
        ]
          .filter(Boolean)
          .join('\n    ')
        return html.replace('<!--app-head-->', head).replace('<!--app-html-->', page.html)
      },
    },
  }
}
