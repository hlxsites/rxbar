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
    if (imageContainers.length > 0) {
      const slidesContainer = document.createElement('div');
      slidesContainer.classList.add('slide-container');
      const images = Array.from(imageContainers).map((container) => {
        const img = container.querySelector('img');
        img.src = updateWidthParam(img.src, 90);
        container.classList.add('gallery-slide');
        container.addEventListener('click', this.onSlideSelected);
        slidesContainer.append(container);
        return img.src;
      });

      block.append(slidesContainer);

      const galleryImageContainer = document.createElement('div');
      galleryImageContainer.classList.add('gallery-image');
      this.galleryImage = document.createElement('img');
      this.galleryImage.loading = 'eager';
      const [mainImage] = images;
      this.galleryImage.src = updateWidthParam(mainImage, 530);
      galleryImageContainer.append(this.galleryImage);
      block.prepend(galleryImageContainer);
    }
  }

  onSlideSelected = (e) => {
    if (this.selectedSlide) {
      this.selectedSlide.classList.remove('selected');
    }

    this.selectedSlide = e.target.closest('.gallery-slide');
    e.target.closest('.gallery-slide').classList.add('selected');
    this.galleryImage.src = updateWidthParam(e.target.src, 530);
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
