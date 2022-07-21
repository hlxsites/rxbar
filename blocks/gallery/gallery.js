import { createOptimizedPicture } from '../../scripts/scripts.js';

class Gallery {
  constructor(block) {
    this.block = block;
    const imageContainers = block.querySelectorAll(':scope > div');
    if (imageContainers.length > 0) {
      const slidesContainer = document.createElement('div');
      slidesContainer.classList.add('slide-container');
      const images = Array.from(imageContainers).map((container) => {
        container.classList.add('gallery-slide');
        container.addEventListener('click', this.onSlideSelected);
        slidesContainer.append(container);
        return container.querySelector('img').src;
      });

      block.append(slidesContainer);

      const galleryImageContainer = document.createElement('div');
      galleryImageContainer.classList.add('gallery-image');
      this.galleryImage = document.createElement('img');
      [this.galleryImage.src] = images;
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
    this.galleryImage.src = e.target.src;
  };
}

/**
 * decorates the gallery component
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const gallery = new Gallery(block);
}
