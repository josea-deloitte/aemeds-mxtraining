/* /blocks/split-hero/split-hero.js */

export default async function decorate(block) {
  const cols = [...block.firstElementChild.children];

  cols.forEach((col, i) => {
    col.classList.add('split-hero-col', i === 0 ? 'split-hero-col--left' : 'split-hero-col--right');

    const picture = col.querySelector('picture');
    if (picture) {
      picture.classList.add('split-hero-image');
      col.prepend(picture);
    }

    const paras = [...col.querySelectorAll('p')];
    paras.forEach((p) => {
      const text = p.textContent.trim().toLowerCase();
      const strong = p.querySelector('strong');

      if (strong && (text === 'nope' || text === 'yep' || strong.textContent.toLowerCase().includes('vyepti'))) {
        p.classList.add('split-hero-headline');
      } else if (p.querySelector('em') && p.querySelector('em').textContent.includes('Actor')) {
        p.classList.add('split-hero-disclaimer');
      } else if (p.querySelector('a')) {
        const link = p.querySelector('a');
        link.classList.add('split-hero-cta');
        const arrow = document.createElement('img');
        arrow.src = '//www.assets.lundbeck-tools.com/content/dam/lundbeck/vyepti/dtc/images/cta-button-arrow-20-global-blue.svg';
        arrow.alt = '';
        arrow.className = 'split-hero-cta-arrow';
        link.append(arrow);
        p.classList.add('split-hero-cta-wrapper');
      } else if (i === 1 && !p.classList.contains('split-hero-headline')) {
        p.classList.add('split-hero-subtext');
      }
    });
  });

  const wrapper = block.firstElementChild;
  wrapper.classList.add('split-hero-row');
}
