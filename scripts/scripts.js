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
  lcpBlocks: ['carousel'],
})
  .withLoadDelayed(() => {
    // eslint-disable-next-line import/no-cycle
    window.setTimeout(() => import('./delayed.js'), 3000);
  })
  .decorate();
