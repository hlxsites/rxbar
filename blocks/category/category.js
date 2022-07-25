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

import { getMetadata, createOptimizedPicture } from '../../scripts/helix-web-library.esm.js';
import { getProductsByCategory, getAllProducts } from '../../scripts/scripts.js';

function createImg(url, title) {
  const image = createOptimizedPicture(url, title, true, [{ width: '275' }]);
  const img = image.querySelector('img');
  img.width = '275';
  img.height = '275';
  return img;
}

function renderProductCard(product) {
  const cardWrapper = document.createElement('div');
  cardWrapper.classList.add('product-card');

  const primaryImage = createImg(product.image, product.title);
  primaryImage.classList.add('primary');
  const secondaryImage = createImg(product.secondaryImage, product.title);
  secondaryImage.classList.add('secondary');
  secondaryImage.classList.add('hidden');

  cardWrapper.innerHTML = /* html */`
    <a href="${product.path}" class="image">
      ${primaryImage.outerHTML}
      ${secondaryImage.outerHTML}
    </a>
    <div class="details">
      <a class="title" href="${product.path}">${product.title}</a>
      <div class="subtitle">12 A.M. Protein Bars</div>
    </div>
    <div class="actions">
      <a class="button" href="/customer/account/create/">Register</a>
      <p class="login">Have an account?  <a href="/customer/account/login/">Log In</a></p>
    </div>
  `;

  const image = cardWrapper.querySelector('.image');
  image.addEventListener('mouseover', (e) => {
    e.currentTarget.querySelector('.secondary').classList.toggle('hidden');
    e.currentTarget.querySelector('.primary').classList.toggle('hidden');
  });
  image.addEventListener('mouseout', (e) => {
    e.currentTarget.querySelector('.secondary').classList.toggle('hidden');
    e.currentTarget.querySelector('.primary').classList.toggle('hidden');
  });
  return cardWrapper;
}

export default async function decorate(main) {
  const category = getMetadata('category');
  const products = category ? await getProductsByCategory(category) : await getAllProducts();

  const container = document.createElement('div');
  container.classList.add('category-container');

  products.forEach((product) => {
    container.appendChild(renderProductCard(product));
  });

  main.appendChild(container);
}
