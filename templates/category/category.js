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

import { getMetadata, loadCSS } from '../../scripts/helix-web-library.esm.js';
import { getProductsByCategory, getAllProducts } from '../../scripts/scripts.js';

function renderProductCard(product) {
  const cardWrapper = document.createElement('div');
  cardWrapper.classList.add('product-card');
  cardWrapper.innerHTML = /* html */`
    <a href="${product.path}" class="image">
      <img width="240" height="274" alt="${product.title}" src="${product.image}">
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
  return cardWrapper;
}

export default async function decorate(main) {
  await loadCSS(`${window.hlx.codeBasePath}/templates/category/category.css`);
  const category = getMetadata('category');
  const products = category ? await getProductsByCategory(category) : await getAllProducts();

  const container = document.createElement('div');
  container.classList.add('category-container');

  products.forEach((product) => {
    container.appendChild(renderProductCard(product));
  });

  main.appendChild(container);
}
