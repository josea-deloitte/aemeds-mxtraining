/* /blocks/header/header.js */

import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

const isDesktop = window.matchMedia('(min-width: 992px)');

// Section 1: brand logo (image wrapped in a link)
function buildBrand(nav) {
  const section = nav.querySelector(':scope > div:first-child');
  if (!section) return null;

  const img = section.querySelector('img');
  if (!img) return null; // first section has no image — not a brand section

  const brand = document.createElement('div');
  brand.className = 'header-brand';

  let link = section.querySelector('a');
  if (!link) {
    link = document.createElement('a');
    link.href = '/';
  }
  link.className = 'header-brand-link';
  link.setAttribute('aria-label', 'VYEPTI home');
  if (!link.contains(img)) link.append(img);
  brand.append(link);
  return brand;
}

// Section 2: teal utility strip — tagline + PI/HCP links
function buildUtilityNav(nav) {
  const section = nav.querySelector(':scope > div:nth-child(2)');
  if (!section) return null;

  const utilityNav = document.createElement('div');
  utilityNav.className = 'header-utility';

  const tagline = section.querySelector('p');
  if (tagline) {
    tagline.className = 'header-utility-tagline';
    utilityNav.append(tagline);
  }

  const links = section.querySelector('ul');
  if (links) {
    links.className = 'header-utility-links';
    [...links.querySelectorAll('a')].forEach((a) => {
      if (a.href.toLowerCase().includes('hcp')) {
        a.closest('li').classList.add('header-utility-hcp');
      }
    });
    utilityNav.append(links);
  }

  return utilityNav;
}

// Section 3: primary navigation with optional dropdowns
function buildMainNav(nav) {
  const section = nav.querySelector(':scope > div:nth-child(3)');
  if (!section) return null;

  section.className = 'header-nav';

  const list = section.querySelector('ul');
  if (!list) return null;

  list.className = 'header-nav-list';

  [...list.querySelectorAll(':scope > li')].forEach((item) => {
    item.classList.add('header-nav-item');
    const link = item.querySelector('a');
    const subList = item.querySelector('ul');

    if (subList) {
      item.classList.add('has-dropdown');
      subList.className = 'header-nav-dropdown';

      const toggle = document.createElement('button');
      toggle.className = 'header-nav-toggle';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-haspopup', 'true');
      toggle.textContent = link ? link.textContent : '';
      link?.replaceWith(toggle);

      const open = () => {
        toggle.setAttribute('aria-expanded', 'true');
        subList.hidden = false;
      };
      const close = () => {
        toggle.setAttribute('aria-expanded', 'false');
        subList.hidden = true;
      };

      // click for mobile; hover for desktop
      toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        if (expanded) close(); else open();
      });

      if (isDesktop.matches) {
        item.addEventListener('mouseenter', open);
        item.addEventListener('mouseleave', close);
      }
      isDesktop.addEventListener('change', () => {
        if (isDesktop.matches) {
          item.addEventListener('mouseenter', open);
          item.addEventListener('mouseleave', close);
        } else {
          item.removeEventListener('mouseenter', open);
          item.removeEventListener('mouseleave', close);
          close();
        }
      });

      subList.hidden = true;
    }
  });

  return section;
}

// Section 4: icon tool links (sign up, infusion locator, savings)
function buildTools(nav) {
  const section = nav.querySelector(':scope > div:nth-child(4)');
  if (!section) return null;

  section.className = 'header-tools';

  const iconMap = { 'sign up': 'mail', 'infusion locator': 'locator', savings: 'savings' };

  [...section.querySelectorAll('a')].forEach((a) => {
    const key = a.textContent.trim().toLowerCase();
    if (iconMap[key]) {
      const icon = document.createElement('span');
      icon.className = `header-tool-icon icon-${iconMap[key]}`;
      icon.setAttribute('aria-hidden', 'true');
      a.prepend(icon);
    }
    a.closest('li')?.classList.add('header-tool-item');
  });

  return section;
}

// Section 5: social media icon links
function buildSocial(nav) {
  const section = nav.querySelector(':scope > div:nth-child(5)');
  if (!section) return null;

  section.className = 'header-social';

  const platforms = ['facebook', 'instagram', 'youtube', 'tiktok'];
  [...section.querySelectorAll('a')].forEach((a) => {
    const platform = platforms.find((p) => a.href.toLowerCase().includes(p));
    if (platform) {
      a.classList.add(`header-social-${platform}`);
      a.setAttribute('aria-label', `VYEPTI on ${platform}`);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    }
  });

  return section;
}

function closeAllDropdowns(nav) {
  nav.querySelectorAll('.header-nav-toggle[aria-expanded="true"]').forEach((toggle) => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.closest('li').querySelector('.header-nav-dropdown').hidden = true;
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

  const brand = buildBrand(nav);
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
    hamburger.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('nav-open', !expanded);
    if (expanded) closeAllDropdowns(nav);
  });

  isDesktop.addEventListener('change', () => {
    if (isDesktop.matches) {
      hamburger.setAttribute('aria-expanded', 'false');
      nav.classList.remove('nav-open');
      closeAllDropdowns(nav);
    }
  });

  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) closeAllDropdowns(nav);
  });

  // Build DOM
  block.innerHTML = '';

  // Utility strip spans full width above the main bar
  if (utility) block.append(utility);

  // Main header bar: brand | hamburger | nav | tools | social
  const inner = document.createElement('div');
  inner.className = 'header-inner';
  if (brand) inner.append(brand);
  inner.append(hamburger);
  if (main) inner.append(main);
  if (tools) inner.append(tools);
  if (social) inner.append(social);

  block.append(inner);
}
