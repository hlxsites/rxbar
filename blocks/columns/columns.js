export default function decorate(block) {
  const align = block.parentElement.parentElement.getAttribute('data-align');
  if (align) {
    block.classList.add(align);
  }
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);
}
