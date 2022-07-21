import { getMetadata, getPlaceholders, toCamelCase } from '../../scripts/scripts.js';

function createNutritionBadge(title, image) {
  const div = document.createElement('div');
  div.innerHTML = /* html */`
    <div class='badge'>
      <img src="${image}" alt="">
      <p>${title}</p>
    </div>
  `;
  return div;
}

/**
 * decorates the product details component
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const placeholders = await getPlaceholders();
  const title = getMetadata('og:title');
  const badges = getMetadata('badges');
  const badgesArray = badges.replace(/' '/g, '').split(',');

  const infoContainer = block.querySelector(':scope > div > div:first-of-type');

  const titleHeading = document.createElement('h2');
  titleHeading.textContent = title;
  infoContainer.prepend(titleHeading);

  const nutritionBadgesContainer = document.createElement('div');
  nutritionBadgesContainer.classList.add('nutrition-badges');
  badgesArray.forEach((badge) => {
    const badgeId = toCamelCase(badge);
    nutritionBadgesContainer.append(createNutritionBadge(placeholders[badgeId], `/icons/${badgeId}.png`));
  });

  infoContainer.append(nutritionBadgesContainer);

  const disclaimer = document.createElement('a');
  disclaimer.href = 'https://www.rxbar.com/whats-inside';
  disclaimer.classList.add('disclaimer');
  disclaimer.textContent = placeholders.ingredientsDisclaimer;
  infoContainer.append(disclaimer);
}
