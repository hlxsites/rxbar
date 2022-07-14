import { readBlockConfig, decorateIcons } from '../../scripts/scripts.js';

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

  const footerSections = block.querySelectorAll('.footer div:nth-child(1) div');
  footerSections.forEach((section) => {
    const disclosure = document.createElement('img');
    disclosure.src = '/icons/plus.svg';
    disclosure.width = '20px';
    disclosure.height = '20px';
    section.classList.add('footer-section');
    section.setAttribute('aria-expanded', 'false');

    section.addEventListener('click', (event) => {
      const { currentTarget } = event;
      if (currentTarget.getAttribute('aria-expanded') === 'false') {
        currentTarget.querySelector('img').src = '/icons/minus.svg';
        currentTarget.querySelector('.footer-section-options').style.display = 'block';
        currentTarget.setAttribute('aria-expanded', 'true');
      } else {
        currentTarget.querySelector('img').src = '/icons/plus.svg';
        currentTarget.querySelector('.footer-section-options').style.display = 'none';
        currentTarget.setAttribute('aria-expanded', 'false');
      }
    });

    const heading = section.querySelector('h5');
    heading.append(disclosure);

    const optionsDiv = document.createElement('div');
    const options = section.querySelectorAll('p');
    options.forEach((option) => {
      optionsDiv.append(option);
    });
    optionsDiv.classList.add('footer-section-options');
    section.append(optionsDiv);
  });
}