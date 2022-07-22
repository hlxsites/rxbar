import { readBlockConfig, decorateIcons } from '../../scripts/helix-web-library.esm.js';

/**
 * loads and decorates the footer
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`);
  const html = await resp.text();
  const footer = document.createElement('div');
  footer.innerHTML = html;
  await decorateIcons(footer);
  block.append(footer);

  const copywrite = block.querySelector('.footer div div:nth-child(5)');
  copywrite.classList.add('terms-copywrite');
  block.append(copywrite);
}
