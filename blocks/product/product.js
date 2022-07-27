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

import { loadCSS, getMetadata, toClassName } from '../../scripts/helix-web-library.esm.js';
import { createBreadcrumbs, getProductByPath } from '../../scripts/scripts.js';
import { renderProductCard } from '../category/category.js';
import decorateGallery from '../gallery/gallery.js';

/**
 * Product
 * @typedef {Object} Product
 * @property {string} path Product path
 * @property {string} title Product title
 * @property {string} image Main product image
 * @property {string} secondaryImage Secondary product image
 * @property {string} description Product description
 * @property {string} category Category
 * @property {string} badges Nutrition badges
 */

function renderProductInfo(title, subtitle) {
  const info = document.createElement('div');
  info.classList.add('info');
  info.innerHTML = /* html */`
      <h1>${title}</h2>
      <div class="subtitle">${subtitle}</div>
      <a class="button" href="/signup">Register</a>
      <p class="login">Have an account?  <a href="/customer/account/login/">Log In</a></p>
  `;
  return info;
}

/**
 * decorates the gallery component
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  await loadCSS(`${window.hlx.codeBasePath}/blocks/gallery/gallery.css`);
  await loadCSS(`${window.hlx.codeBasePath}/blocks/category/category.css`);
  const title = getMetadata('og:title');
  const subtitle = getMetadata('subtitle');
  const category = getMetadata('category');

  const gallery = document.createElement('div');
  gallery.classList.add('gallery');
  gallery.innerHTML = block.innerHTML;
  block.textContent = '';
  block.appendChild(gallery);
  block.appendChild(renderProductInfo(title, subtitle));
  decorateGallery(gallery);

  document.querySelector('main .product-wrapper').prepend(createBreadcrumbs({ url: `/shop/${toClassName(category)}/`, title: category }, title));

  const recommended = document.createElement('div');
  recommended.classList.add('recommended');

  const recommendedTitle = document.createElement('h2');
  recommendedTitle.textContent = 'This might go well with...';
  recommended.append(recommendedTitle);

  const recommendedProducts = document.createElement('div');
  recommendedProducts.classList.add('products');
  recommended.append(recommendedProducts);

  const defaultContentWrapper = block.parentElement.parentElement.querySelector('.default-content-wrapper');
  const similarButtons = defaultContentWrapper.querySelectorAll('p > a');
  const products = await Promise.all(Array.from(similarButtons).map(async (similar) => {
    similar.remove();
    const { pathname } = new URL(similar.href);
    return getProductByPath(pathname);
  }));
  defaultContentWrapper.remove();

  products.forEach((product) => {
    if (product) {
      recommendedProducts.appendChild(renderProductCard(product, false));
    }
  });

  if (recommended.children.length > 0) {
    block.parentElement.parentElement.append(recommended);
  }
}
