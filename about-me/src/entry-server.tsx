import { renderToStaticMarkup } from 'react-dom/server';
import HomePage from './components/HomePage';
import { loadSite } from './lib/content';

/** Server-only entry, loaded by plugins/prerender.ts: renders the homepage to static HTML. */
export function render() {
  const site = loadSite();
  return {
    title: site.bio.name ?? 'TODO: name missing in content/bio.md',
    description: site.bio.shortBio,
    html: renderToStaticMarkup(<HomePage site={site} />),
  };
}
