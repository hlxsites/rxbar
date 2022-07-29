/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { getMetadata, toCamelCase } from '../../scripts/helix-web-library.esm.js';
import { getPlaceholders } from '../../scripts/scripts.js';

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

function createLabel(label) {
  const div = document.createElement('div');
  div.classList.add('nutrition-description');
  div.innerHTML = label;
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
  const theme = getMetadata('theme');

  if (theme) {
    block.style.backgroundColor = theme;
  }

  const badgesArray = badges.replace(/' '/g, '').split(',');

  const infoContainer = block.querySelector(':scope > div > div:first-of-type');

  const titleHeading = document.createElement('h2');
  titleHeading.textContent = title;
  infoContainer.prepend(titleHeading);

  const nutritionBadgesContainer = document.createElement('div');
  nutritionBadgesContainer.classList.add('nutrition-badges');
  infoContainer.append(nutritionBadgesContainer);
  badgesArray.forEach((badge) => {
    const badgeId = toCamelCase(badge.trim()).toLowerCase();
    const label = placeholders[badgeId];
    nutritionBadgesContainer.append(createNutritionBadge(placeholders[badgeId], `/icons/${badgeId}.png`));
    if (label.includes('**')) {
      infoContainer.append(createLabel('<a href="https://main--rxbar--hlxsites.hlx.live/whats-inside">**Visit RXBAR.com/whats-inside for details</a>'));
    } else if (label.includes('*')) {
      infoContainer.append(createLabel('*Not a low calorie food. See nutrition information for calories and sugar content.'));
    }
  });

  const disclaimer = document.createElement('a');
  disclaimer.href = 'https://www.rxbar.com/whats-inside';
  disclaimer.classList.add('disclaimer');
  disclaimer.textContent = placeholders.ingredientsDisclaimer;
  infoContainer.append(disclaimer);
}
