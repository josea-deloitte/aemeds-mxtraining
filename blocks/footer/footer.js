import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Visually hides the text label of icon-only links (e.g. social links,
 * the Lundbeck logo link) while keeping it available to screen readers.
 * @param {Element} scope The element to search for icon links
 */
function decorateIconLinks(scope) {
  scope.querySelectorAll('a').forEach((a) => {
    if (!a.querySelector('.icon')) return;
    [...a.childNodes].forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        const label = document.createElement('span');
        label.className = 'visually-hidden';
        label.textContent = node.textContent.trim();
        node.replaceWith(label);
      }
    });
  });
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  // identify the footer sections: legal links strip, info, brand
  const classes = ['legal', 'info', 'brand'];
  classes.forEach((c, i) => {
    const section = footer.children[i];
    if (section) section.classList.add(`footer-${c}`);
  });

  // the tel: button gets a phone icon
  footer.querySelectorAll('a.button[href^="tel:"]').forEach((a) => {
    a.classList.add('footer-call');
  });

  decorateIconLinks(footer);

  block.append(footer);
}
