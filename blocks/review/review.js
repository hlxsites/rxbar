import { decorateIcons, getMetadata } from '../../scripts/helix-web-library.esm.js';

function createReview(title, short, long) {
  const container = document.createElement('div');
  container.classList.add('product-review');
  container.innerHTML = /* html */`
    <div class="stars">
      ${Array(5).fill('').map(() => '<span class="icon icon-star"></span>').join('')}
    </div>
    <div class="content">
      <p class="title">${title}</p>
      <p class="short-content">${short}</p>
      <p class="long-content">${long}</p>
      <div class="more">Show More</div>
    </div>
  `;
  return container;
}

export default function decorate(block) {
  const title = block.querySelector('h2').textContent;
  const short = `"${block.querySelector('p u').textContent}..."`;
  const long = block.querySelector('p').textContent;
  const theme = getMetadata('theme');

  block.textContent = '';
  const openQuote = document.createElement('span');
  openQuote.classList.add('icon');
  openQuote.classList.add('icon-open-quote');
  block.append(openQuote);
  block.append(createReview(title, short, long));
  const closeQuote = document.createElement('span');
  closeQuote.classList.add('icon');
  closeQuote.classList.add('icon-close-quote');
  block.append(closeQuote);

  if (theme) {
    openQuote.style.fill = theme;
    closeQuote.style.fill = theme;
  }
  decorateIcons(block);

  const moreButton = block.querySelector('.more');
  moreButton.addEventListener('click', () => {
    const content = block.querySelector('.content');
    content.classList.toggle('expanded');
    moreButton.textContent = content.classList.contains('expanded') ? 'Show Less' : 'Show More';
  });
}
