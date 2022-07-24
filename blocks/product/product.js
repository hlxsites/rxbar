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

import { loadCSS, getMetadata } from '../../scripts/helix-web-library.esm.js';
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
  `;
  return info;
}

/**
 * decorates the gallery component
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  await loadCSS(`${window.hlx.codeBasePath}/blocks/gallery/gallery.css`);
  const title = getMetadata('og:title');
  const subtitle = getMetadata('subtitle');

  const gallery = document.createElement('div');
  gallery.classList.add('gallery');
  gallery.innerHTML = block.innerHTML;
  block.innerHTML = '';
  block.appendChild(gallery);
  block.appendChild(renderProductInfo(title, subtitle));
  decorateGallery(gallery);
}
