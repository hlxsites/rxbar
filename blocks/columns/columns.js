export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  cols.forEach((col) => {
    const anchor = col.querySelector('a');
    console.log(anchor);
  });
}
