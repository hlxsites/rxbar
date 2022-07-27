export default function decorate(block) {
  const columnStylesConfig = block.parentElement.parentElement.getAttribute('data-columnthemes');
  const columnStyles = columnStylesConfig ? columnStylesConfig.replace(/, /g, ',').split(',') : [];

  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  cols.forEach((col, index) => {
    col.classList.add('col');

    const imageParagraph = col.querySelector('p:first-of-type');
    imageParagraph.classList.add('image');

    const textContainer = document.createElement('div');
    textContainer.classList.add('text-container');
    textContainer.classList.add('hidden');
    const textParagraphs = col.querySelectorAll('p:not(.image)');
    textParagraphs.forEach((paragraph) => {
      textContainer.append(paragraph);
    });

    col.append(textContainer);

    col.classList.add(`${columnStyles[index].toLowerCase()}`);

    col.addEventListener('mouseover', (e) => {
      const { currentTarget } = e;
      const image = currentTarget.querySelector('.image');
      image.classList.toggle('hidden');
      const container = currentTarget.querySelector('.text-container');
      container.classList.toggle('hidden');
    });

    col.addEventListener('mouseout', (e) => {
      const { currentTarget } = e;
      const image = currentTarget.querySelector('.image');
      image.classList.toggle('hidden');
      const container = currentTarget.querySelector('.text-container');
      container.classList.toggle('hidden');
    });
  });
}
