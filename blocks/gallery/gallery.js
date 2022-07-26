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

import { createOptimizedPicture, getMetadata } from '../../scripts/helix-web-library.esm.js';

function updateWidthParam(href, width) {
  const url = new URL(href);
  const { searchParams } = url;
  searchParams.set('width', width);
  url.search = searchParams.toString();
  return url.toString();
}

class Gallery {
  constructor(block) {
    this.block = block;
    const imageContainers = block.querySelectorAll(':scope > div');
    // If the block has rows
    if (imageContainers.length > 0) {
      // Create the slides element
      const slides = this.createSlides(block);
      block.append(slides);

      // Select the first slide and build the selected slide element
      const firstSlide = slides.querySelector('.gallery-slide:first-of-type');
      firstSlide.classList.add('selected');
      this.selectedSlide = firstSlide;
      const firstImage = firstSlide.querySelector('img').src;

      this.selectedSlideContainer = document.createElement('div');
      this.selectedSlideContainer.classList.add('selected-slide');

      const galleryImageContainer = document.createElement('div');
      galleryImageContainer.classList.add('gallery-image');
      const galleryImage = document.createElement('img');
      galleryImage.loading = 'eager';
      galleryImage.src = updateWidthParam(firstImage, 530);
      galleryImageContainer.append(galleryImage);
      this.selectedSlideContainer.appendChild(galleryImageContainer);

      // If the first slide has content, add it to the selected slide
      const firstContent = firstSlide.querySelector('.slide-content');
      if (firstContent) {
        this.selectedSlideContainer.appendChild(firstContent.cloneNode(true));
      }

      block.prepend(this.selectedSlideContainer);
    }
  }

  createSlides(block) {
    const title = getMetadata('og:title');
    const slides = block.querySelectorAll(':scope > div');

    const slidesContainer = document.createElement('div');
    slidesContainer.classList.add('slide-container');

    Array.from(slides).forEach((slide) => {
      const cols = Array.from(slide.querySelectorAll(':scope > div'));

      if (cols.length > 0) {
        // First column should contain the slide image
        const imgContainer = cols[0];
        const imgSrc = imgContainer.querySelector('img').src;
        const thumb = createOptimizedPicture(imgSrc, title, false, [{ width: '90' }]);
        // Set explicity width/height on optimized img
        const img = thumb.querySelector('img');
        img.width = 90;
        img.height = 90;
        imgContainer.classList.add('gallery-slide');
        imgContainer.addEventListener('click', this.onSlideSelected);
        // Swap old img for optimized picture
        imgContainer.textContent = '';
        imgContainer.append(thumb);

        // Is there content to go with the slide?
        if (cols.length > 1) {
          const slideContent = cols[1];
          const slideContentContainer = document.createElement('div');
          slideContentContainer.classList.add('slide-content');
          cols[1].remove();
          slideContentContainer.append(slideContent);
          imgContainer.append(slideContentContainer);
        }

        slidesContainer.append(imgContainer);
      }
    });

    return slidesContainer;
  }

  onSlideSelected = (e) => {
    const selectedImg = this.selectedSlideContainer.querySelector('img');
    if (this.selectedSlide) {
      this.selectedSlide.classList.remove('selected');
    }

    this.selectedSlide = e.target.closest('.gallery-slide');
    e.target.closest('.gallery-slide').classList.add('selected');
    selectedImg.src = updateWidthParam(e.target.src, 530);

    const content = this.selectedSlide.querySelector('.slide-content');
    if (content) {
      const contentElement = this.selectedSlideContainer.querySelector('.slide-content');
      contentElement.innerHTML = content.innerHTML;
    }
  };
}

/**
 * decorates the gallery component
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  // eslint-disable-next-line no-new
  new Gallery(block);
}
