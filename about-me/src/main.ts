// Client entry. The markup is pre-rendered at build time, so React never runs in the browser;
// this only loads the styles and wires up the copy-email button.
import '@fontsource-variable/jetbrains-mono/index.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import './styles/tokens.css';
import './styles/global.css';
import './styles/components';

// Progressive enhancement: the copy button stays hidden unless the Clipboard API exists.
const button = document.querySelector<HTMLButtonElement>('[data-copy]');
const status = document.querySelector<HTMLElement>('[data-copy-status]');

if (button && navigator.clipboard) {
  button.hidden = false;
  let timer: number | undefined;
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy ?? '');
    } catch {
      return;
    }
    button.textContent = 'copied';
    if (status) status.textContent = 'copied';
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      button.textContent = 'copy';
      if (status) status.textContent = '';
    }, 2000);
  });
}
