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

function parallax(block, multiplier = 0.5) {
  window.addEventListener('scroll', () => {
    const offset = window.scrollY;
    block.style.backgroundPositionY = `${offset * multiplier}px`;
  });
}

/**
 * decorates the parallax block
 * @param {Element} block The block
 */
export default async function decorate(block) {
  const columns = [...block.children];
  const images = columns[1].querySelectorAll(':scope > div');
  const [desktopImage] = images[0].querySelector('img').src.split('?');
  let multiplier = 0.3;
  let mobileImage;

  if (images.length > 1) {
    [mobileImage] = images[1].querySelector('img').src.split('?');
  }

  const parallaxBlock = document.createElement('div');
  parallaxBlock.classList.add('parallax-background');
  parallaxBlock.append(columns[0].querySelector(':scope > div'));

  parallaxBlock.style.backgroundImage = `url(${desktopImage})`;
  if (window.innerWidth < 900) {
    parallaxBlock.style.backgroundImage = `url(${mobileImage})`;
    multiplier = 0.2;
  }

  block.innerHTML = '';
  block.append(parallaxBlock);

  const readMoreButton = document.createElement('div');
  readMoreButton.classList.add('read-more');
  readMoreButton.textContent = 'READ MORE';
  parallaxBlock.append(readMoreButton);

  readMoreButton.addEventListener('click', () => {
    readMoreButton.textContent = parallaxBlock.classList.contains('expanded') ? 'READ MORE' : 'READ LESS';
    parallaxBlock.classList.toggle('expanded');
  });

  parallax(parallaxBlock, multiplier);
}
