/* /blocks/header/header.js */

import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

const isDesktop = window.matchMedia('(min-width: 992px)');

function buildUtilityNav(nav) {
  const utilitySection = nav.querySelector(':scope > div:first-child');
  if (!utilitySection) return null;

  const utilityNav = document.createElement('div');
  utilityNav.className = 'header-utility';

  const tagline = utilitySection.querySelector('p');
  if (tagline) {
    tagline.className = 'header-utility-tagline';
    utilityNav.append(tagline);
  }

  const links = utilitySection.querySelector('ul');
  if (links) {
    links.className = 'header-utility-links';
    const hcpLink = [...links.querySelectorAll('a')].find((a) => a.href.includes('hcp'));
    if (hcpLink) {
      hcpLink.closest('li').classList.add('header-utility-hcp');
    }
    utilityNav.append(links);
  }

  return utilityNav;
}

function buildMainNav(nav) {
  const navSection = nav.querySelector(':scope > div:nth-child(2)');
  if (!navSection) return null;

  navSection.className = 'header-nav';

  const list = navSection.querySelector('ul');
  if (!list) return null;

  list.className = 'header-nav-list';

  [...list.querySelectorAll(':scope > li')].forEach((item) => {
    const link = item.querySelector('a');
    const subList = item.querySelector('ul');

    if (subList) {
      item.classList.add('header-nav-item', 'has-dropdown');
      subList.className = 'header-nav-dropdown';

      const toggle = document.createElement('button');
      toggle.className = 'header-nav-toggle';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-haspopup', 'true');
      if (link) toggle.textContent = link.textContent;
      link?.replaceWith(toggle);

      toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !expanded);
        subList.hidden = expanded;
      });

      subList.hidden = true;
    } else {
      item.classList.add('header-nav-item');
    }
  });

  return navSection;
}

function buildTools(nav) {
  const toolsSection = nav.querySelector(':scope > div:nth-child(3)');
  if (!toolsSection) return null;

  toolsSection.className = 'header-tools';
  const links = toolsSection.querySelectorAll('a');

  const toolIcons = { 'sign up': 'mail', 'infusion locator': 'locator', savings: 'savings' };
  links.forEach((link) => {
    const key = link.textContent.trim().toLowerCase();
    if (toolIcons[key]) {
      const icon = document.createElement('span');
      icon.className = `header-tool-icon icon-${toolIcons[key]}`;
      icon.setAttribute('aria-hidden', 'true');
      link.prepend(icon);
    }
    link.closest('li')?.classList.add('header-tool-item');
  });

  return toolsSection;
}

function buildSocial(nav) {
  const socialSection = nav.querySelector(':scope > div:nth-child(4)');
  if (!socialSection) return null;

  socialSection.className = 'header-social';
  const links = socialSection.querySelectorAll('a');
  const platforms = ['facebook', 'instagram', 'youtube', 'tiktok'];

  links.forEach((link) => {
    const platform = platforms.find((p) => link.href.includes(p));
    if (platform) {
      link.classList.add(`header-social-${platform}`);
      link.setAttribute('aria-label', `VYEPTI on ${platform}`);
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  return socialSection;
}

function closeOnClickOutside(nav) {
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      nav.querySelectorAll('.header-nav-toggle[aria-expanded="true"]').forEach((toggle) => {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.closest('li').querySelector('.header-nav-dropdown').hidden = true;
      });
    }
  });
}

export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);
  if (!fragment) return;

  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.setAttribute('aria-label', 'Main navigation');
  nav.append(...fragment.childNodes);

  const utility = buildUtilityNav(nav);
  const main = buildMainNav(nav);
  const tools = buildTools(nav);
  const social = buildSocial(nav);

  const hamburger = document.createElement('button');
  hamburger.className = 'header-hamburger';
  hamburger.setAttribute('aria-controls', 'nav');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-label', 'Toggle navigation');
  hamburger.innerHTML = '<span></span><span></span><span></span>';

  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !expanded);
    nav.classList.toggle('nav-open', !expanded);
  });

  isDesktop.addEventListener('change', () => {
    if (isDesktop.matches) {
      hamburger.setAttribute('aria-expanded', 'false');
      nav.classList.remove('nav-open');
    }
  });

  block.innerHTML = '';
  if (utility) block.append(utility);

  const inner = document.createElement('div');
  inner.className = 'header-inner';
  if (main) inner.append(main);
  if (tools) inner.append(tools);
  if (social) inner.append(social);
  inner.prepend(hamburger);

  block.append(inner);

  closeOnClickOutside(nav);
}
