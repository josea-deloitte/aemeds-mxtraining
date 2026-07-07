import {
  loadHeader,
  loadFooter,
  decorateIcons,
  decorateSections,
  decorateBlock,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
  buildBlock,
} from './aem.js';

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch (e) {
    // do nothing
  }
}

/**
 * Turns `/widgets/...` links into widget blocks.
 * @param {Element} main The container element
 */
function buildWidgetAutoBlocks(main) {
  const widgetLinks = [...main.querySelectorAll('a[href*="/widgets/"]')];
  widgetLinks.forEach((link) => {
    if (link.closest('.widget')) return;
    const newLink = link.cloneNode(true);
    const widgetBlock = buildBlock('widget', { elems: [newLink] });
    const p = link.closest('p');
    if (
      p
      && p.querySelectorAll('a').length === 1
      && p.querySelector('a') === link
      && p.textContent.trim() === link.textContent.trim()
    ) {
      p.replaceWith(widgetBlock);
    } else {
      link.replaceWith(widgetBlock);
    }
  });
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    // auto load `*/fragments/*` references
    const fragments = [...main.querySelectorAll('a[href*="/fragments/"]')].filter(
      (f) => !f.closest('.fragment'),
    );
    if (fragments.length > 0) {
      // eslint-disable-next-line import/no-cycle
      import('../blocks/fragment/fragment.js').then(({ loadFragment }) => {
        fragments.forEach(async (fragment) => {
          try {
            const { pathname } = new URL(fragment.href);
            const frag = await loadFragment(pathname);
            if (frag && fragment.parentElement) {
              fragment.parentElement.replaceWith(...frag.children);
            }
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Fragment loading failed', error);
          }
        });
      });
    }
    buildWidgetAutoBlocks(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates formatted links to style them as buttons.
 * @param {HTMLElement} main The main container element
 */
function decorateButtons(main) {
  main.querySelectorAll('p a[href]').forEach((a) => {
    a.title = a.title || a.textContent;
    const p = a.closest('p');
    const text = a.textContent.trim();

    // quick structural checks
    if (a.querySelector('img') || p.textContent.trim() !== text) return;

    // skip URL display links
    try {
      if (new URL(a.href).href === new URL(text, window.location).href) return;
    } catch {
      /* continue */
    }

    // require authored formatting for buttonization
    const strong = a.closest('strong');
    const em = a.closest('em');
    if (!strong && !em) return;

    p.className = 'button-wrapper';
    a.className = 'button';
    if (strong && em) {
      // high-impact call-to-action
      a.classList.add('accent');
      const outer = strong.contains(em) ? strong : em;
      outer.replaceWith(a);
    } else if (strong) {
      a.classList.add('primary');
      strong.replaceWith(a);
    } else {
      a.classList.add('secondary');
      em.replaceWith(a);
    }
  });
}

/**
 * Opens links to other domains in a new tab.
 * @param {HTMLElement} main The main container element
 */
function decorateExternalLinks(main) {
  main.querySelectorAll('a[href^="http"]').forEach((a) => {
    try {
      const url = new URL(a.href);
      if (url.hostname !== window.location.hostname) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
    } catch {
      /* leave malformed links untouched */
    }
  });
}

/**
 * Normalizes authored icon tokens that resolve as `icon-icon-*` classes
 * to the expected `icon-*` form used by decorateIcons().
 * @param {Element} main The main element
 */
function normalizeIconClasses(main) {
  main.querySelectorAll('span[class*="icon-icon-"]').forEach((span) => {
    [...span.classList]
      .filter((className) => className.startsWith('icon-icon-'))
      .forEach((className) => {
        span.classList.remove(className);
        span.classList.add(className.replace('icon-icon-', 'icon-'));
      });
  });
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  normalizeIconClasses(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
  decorateButtons(main);
  decorateExternalLinks(main);
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');
    await loadSection(main.querySelector('.section'), waitForFirstImage);
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }
}

/**
 * Loads the global Important Safety Information (ISI) block on every page.
 * The ISI content lives in a shared fragment so it is authored in one place;
 * the isi block renders both the inline panel and the fixed condensed band.
 * @param {Element} main The main container element
 */
async function loadISI(main) {
  if (!main || main.querySelector('.isi')) return;
  try {
    // eslint-disable-next-line import/no-cycle
    const { loadFragment } = await import('../blocks/fragment/fragment.js');
    const fragment = await loadFragment('/fragments/isi');
    if (!fragment) return;

    const fragmentNodes = [...fragment.childNodes];
    if (!fragmentNodes.length) return;

    const isiBlock = buildBlock('isi', { elems: fragmentNodes });
    const section = document.createElement('div');
    const wrapper = document.createElement('div');
    wrapper.append(isiBlock);
    section.append(wrapper);
    main.append(section);

    // Only initialize/load the newly appended ISI section; re-running
    // decorateSections(main) would reset existing sections back to hidden.
    section.classList.add('section');
    section.dataset.sectionStatus = 'initialized';
    section.style.display = 'none';
    decorateBlock(isiBlock);
    await loadSection(section);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Global ISI loading failed', error);
  }
}

/**
 * Adds a global "back to top" control that appears once the user scrolls down
 * and smooth-scrolls to the top of the page. Matches the source site's teal
 * circle + up-chevron + "TOP" label affordance.
 */
function loadBackToTop() {
  if (document.querySelector('.back-to-top')) return;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  // the SVG already contains the teal button, chevron, and "TOP" label;
  // serve the desktop artwork at >=900px, the mobile one below
  const base = window.hlx.codeBasePath;
  btn.innerHTML = `<picture>
      <source media="(min-width: 900px)" srcset="${base}/icons/back-to-top-desktop.svg">
      <img src="${base}/icons/back-to-top-mobile.svg" alt="" loading="lazy" width="35" height="55">
    </picture>`;
  btn.addEventListener('click', () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });
  document.body.append(btn);

  const toggle = () => btn.classList.toggle('is-visible', window.scrollY > 600);
  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  loadHeader(doc.querySelector('header'));

  const main = doc.querySelector('main');
  await loadSections(main);

  await loadISI(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadFooter(doc.querySelector('footer'));

  loadBackToTop();

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
