export default function decorate(block) {
  [...block.children].forEach((row, i) => {
    const imgType = (i === 0) ? 'desktop' : 'mobile';
    row.classList.add(imgType);
  });
}
