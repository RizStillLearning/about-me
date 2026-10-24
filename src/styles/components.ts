// Components only render at build time (plugins/prerender.ts), so their own CSS imports never
// reach the client bundle. Pull every component stylesheet in here, after the base styles.
import.meta.glob('../components/*.css', { eager: true });
