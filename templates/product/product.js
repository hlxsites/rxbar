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

function renderScafolding(title, subtitle) {
  return /* html */`
    <div class="product">
      <div class="info-wrap">
        <div class="info">
          <h1>${title}</h2>
          <div class="subtitle">${subtitle}</div>
          <a class="button" href="/signup">Register</a>
        </div>
      </div>
      <div class="details-wrap"></div>
    </div>
  `;
}

export default async function decorate(main) {
  await loadCSS(`${window.hlx.codeBasePath}/templates/product/product.css`);
  const title = getMetadata('og:title');
  const subtitle = getMetadata('subtitle');

  const gallery = main.querySelector('.gallery');
  const productDetails = main.querySelector('.product-details');
  main.innerHTML = renderScafolding(title, subtitle);

  main.querySelector('.info-wrap').prepend(gallery);
  main.querySelector('.details-wrap').innerHTML = productDetails.outerHTML;
}
