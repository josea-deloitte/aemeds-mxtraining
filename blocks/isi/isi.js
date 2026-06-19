/*
 * ISI (Important Safety Information) Block
 *
 * Renders the regulated safety content in two synchronized views from a single
 * authored source:
 *   1. The full ISI panel, inline where the block is authored (above the footer).
 *   2. A fixed, condensed band docked to the bottom of the viewport that expands
 *      on click and hides once the full panel scrolls into view.
 *
 * Authoring contract (single cell, rich text):
 * | isi |
 * | ##### APPROVED USE                                |
 * | VYEPTI is a prescription medicine...              |
 * | ##### IMPORTANT SAFETY INFORMATION                |
 * | Do not receive VYEPTI...                          |
 * | - Allergic reactions...                           |
 * | ...                                               |
 * | For more information, please see the              |
 * | [Prescribing Information](…pi.pdf) and            |
 * | [Patient Information](…ppi.pdf).                  |
 *
 * The Prescribing/Patient Information (PI) links live inside the authored
 * content so they travel with the ISI everywhere it is reused.
 */

const EXPANDED_CLASS = 'isi-band-expanded';
const DOCKED_CLASS = 'isi-band-docked';

/**
 * Builds the condensed band as a clone of the authored ISI content.
 * @param {Element} content The decorated ISI content element
 * @returns {HTMLElement} The band element
 */
function buildBand(content) {
  const band = document.createElement('aside');
  band.className = 'isi-band';
  band.setAttribute('aria-label', 'Important Safety Information');

  const inner = document.createElement('div');
  inner.className = 'isi-band-inner';
  inner.append(content.cloneNode(true));

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'isi-band-toggle';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Expand Important Safety Information');

  band.append(toggle, inner);
  return { band, toggle };
}

/**
 * Wires the expand/collapse behavior for the band.
 * @param {HTMLElement} band
 * @param {HTMLButtonElement} toggle
 */
function wireToggle(band, toggle) {
  const setExpanded = (expanded) => {
    band.classList.toggle(EXPANDED_CLASS, expanded);
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.setAttribute('aria-label', expanded
      ? 'Collapse Important Safety Information'
      : 'Expand Important Safety Information');
  };

  toggle.addEventListener('click', () => {
    setExpanded(!band.classList.contains(EXPANDED_CLASS));
  });

  // Allow links inside the expanded band to work without toggling.
  band.querySelector('.isi-band-inner').addEventListener('click', (e) => {
    if (e.target.closest('a')) e.stopPropagation();
  });
}

/**
 * Hides the band once the full ISI panel is visible, restores it otherwise.
 * @param {HTMLElement} band
 * @param {Element} panel The full inline ISI panel
 */
function wireDocking(band, panel) {
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      band.classList.toggle(DOCKED_CLASS, entry.isIntersecting);
    });
  }, { threshold: 0 });
  observer.observe(panel);
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const content = block.querySelector(':scope > div > div') || block.firstElementChild;
  if (!content) return;

  // PI links are external PDFs: open in a new tab.
  content.querySelectorAll('a[href$=".pdf"]').forEach((a) => {
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  });

  // Full inline panel.
  const panel = document.createElement('section');
  panel.className = 'isi-panel';
  panel.setAttribute('aria-label', 'Important Safety Information');
  panel.append(content);
  block.replaceChildren(panel);

  // Condensed sticky band (separate from document flow, appended to body).
  const { band, toggle } = buildBand(content);
  wireToggle(band, toggle);
  document.body.append(band);

  wireDocking(band, panel);
}
