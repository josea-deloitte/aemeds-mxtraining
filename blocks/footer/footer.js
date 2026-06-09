/* /blocks/footer/footer.js */

import { loadFragment } from '../fragment/fragment.js';
import { getMetadata } from '../../scripts/aem.js';

export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);
  if (!fragment) return;

  const footer = document.createElement('footer');
  footer.append(...fragment.childNodes);

  const sections = [...footer.children];

  // Section 1: legal links bar
  const legalSection = sections[0];
  if (legalSection) {
    legalSection.className = 'footer-legal';
    const links = legalSection.querySelectorAll('a');
    links.forEach((link) => {
      if (link.textContent.trim() === 'Cookie Settings') {
        link.id = 'footer-cookie-settings';
      }
    });
  }

  // Section 2: brand / support / copyright
  const brandSection = sections[1];
  if (brandSection) {
    brandSection.className = 'footer-brand';
    const phoneLink = brandSection.querySelector('a[href^="tel:"]');
    phoneLink?.closest('p')?.classList.add('footer-phone');
  }

  // Section 3: social + Lundbeck logo
  const socialSection = sections[2];
  if (socialSection) {
    socialSection.className = 'footer-social-row';
    const links = socialSection.querySelectorAll('a');
    const platforms = ['facebook', 'instagram', 'youtube', 'tiktok'];
    const lundbeckLogo = socialSection.querySelector('img[alt*="Lundbeck"]')?.closest('a');

    links.forEach((link) => {
      const platform = platforms.find((p) => link.href.includes(p));
      if (platform) {
        link.classList.add(`footer-social-${platform}`);
        link.setAttribute('aria-label', `VYEPTI on ${platform}`);
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });

    if (lundbeckLogo) lundbeckLogo.classList.add('footer-lundbeck-logo');
  }

  block.innerHTML = '';
  block.append(footer);
}
