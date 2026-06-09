/* /blocks/alert-strip/alert-strip.js */

export default async function decorate(block) {
  block.setAttribute('role', 'complementary');
  block.setAttribute('aria-label', 'Support information');

  const row = block.firstElementChild;
  const cell = row?.firstElementChild;
  if (!cell) return;

  const icon = document.createElement('span');
  icon.className = 'alert-strip-icon';
  icon.setAttribute('aria-hidden', 'true');

  const existingIcon = cell.querySelector('picture, img');
  if (existingIcon) {
    existingIcon.closest('p')?.remove();
  }

  const content = document.createElement('div');
  content.className = 'alert-strip-content';
  content.append(...cell.childNodes);

  cell.append(icon, content);
  cell.className = 'alert-strip-inner';
}
