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

import { HelixApp, fetchPlaceholders } from './helix-web-library.esm.js';

/**
 * Return site placeholders
 * @returns {Object} Site placeholders
 */
export async function getPlaceholders() {
  if (!window.placeholders) {
    window.placeholders = await fetchPlaceholders();
  }
  return window.placeholders;
}

/*
 * Sanitizes a name for use as a js property name.
 * @param {string} name The unsanitized name
 * @returns {string} The camelCased name
 */
export function toCamelCase(name) {
  return name
    .replace(/\s(.)/g, ($1) => $1.toUpperCase())
    .replace(/\s/g, '')
    .replace(/^(.)/, ($1) => $1.toLowerCase());
}

/**
 * Creates a breadcrumb element
 * @param {Object} parent The parent link and title
 * @param {string} title The current page title
 * @returns {Element}
 */
export function createBreadcrumbs(parent, title) {
  const container = document.createElement('div');
  container.classList.add('bread-crumbs');
  container.innerHTML = /* html */`
    <ul>
      <li>
        <a href="/" title="Go to Home Page">Home</a>
      </li>
      ${parent ? /* html */`
        <li>
          <a href="${parent.url}">${parent.title}</a>
        </li>
      ` : ''}
      <li>
        <strong>${title}</strong>
      </li>
    </ul>
  `;

  return container;
}

/**
 * Fetches the query index
 */
export async function fetchQueryIndex() {
  const resp = await fetch('/query-index.json');
  const json = await resp.json();
  const lookup = {};
  json.data.forEach((row) => {
    lookup[row.path] = row;
  });
  window.pageIndex = { data: json.data, lookup };
}

/**
 * Returns the products of a category
 * @returns {import('../blocks/product/product.js').Product[]} products
 */
export async function getProductsByCategory(category) {
  if (!window.pageIndex) {
    await fetchQueryIndex();
  }
  return window.pageIndex.data.filter((item) => item.category === category);
}

/**
 * Returns the product by path
 * @returns {import('../blocks/product/product.js').Product[]} products
 */
export async function getProductByPath(path) {
  if (!window.pageIndex) {
    await fetchQueryIndex();
  }
  const product = window.pageIndex.data.filter((item) => item.path === path);
  return product.length > 0 ? product[0] : null;
}

/**
 * Returns all products
 * @returns {import('../blocks/product/product.js').Product[]} products
 */
export async function getAllProducts() {
  if (!window.pageIndex) {
    await fetchQueryIndex();
  }
  return window.pageIndex.data;
}

HelixApp.init({
  rumEnabled: true,
  autoAppear: true,
  rumGeneration: 'project-1',
  lcpBlocks: ['carousel', 'category'],
})
  .withLoadDelayed(() => {
    // eslint-disable-next-line import/no-cycle
    window.setTimeout(() => import('./delayed.js'), 3000);
  })
  .decorate();
