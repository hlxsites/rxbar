export default function decorate(block) {
  const slideStylesConfig = block.parentElement.parentElement.getAttribute('data-slidethemes');
  const slideStyles = slideStylesConfig ? slideStylesConfig.replace(/, /g, ',').split(',') : [];
  const buttons = document.createElement('div');
  buttons.className = 'carousel-buttons';
  [...block.children].forEach((row, i) => {
    if (row.querySelector('img')) {
      const classes = ['image-desktop', 'image-mobile'];
      classes.forEach((e, j) => {
        if (row.children[j]) row.children[j].classList.add(`carousel-${e}`);
        if (row.children[j]) row.children[j].classList.add('slide');

        if (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
          // Set the first mobile image to load eager as well.
          if (i === 0 && e === 'image-mobile') {
            row.children[j].querySelector('img').loading = 'eager';
          }
        }
      });
    } else {
      const classes = ['text-slide'];
      classes.forEach((e, j) => {
        if (row.children[j]) row.children[j].classList.add(`carousel-${e}`);
        if (row.children[j]) row.children[j].classList.add('slide');
        if (i < slideStyles.length) row.classList.add(`${slideStyles[i].toLowerCase()}`);
      });
    }
    /* buttons */
    const button = document.createElement('button');
    if (!i) button.classList.add('selected');
    button.addEventListener('click', () => {
      block.scrollTo({ top: 0, left: row.offsetLeft - row.parentNode.offsetLeft, behavior: 'smooth' });
      [...buttons.children].forEach((r) => r.classList.remove('selected'));
      button.classList.add('selected');
    });
    buttons.append(button);
  });
  block.parentElement.append(buttons);
}
