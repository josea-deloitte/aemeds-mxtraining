/* /blocks/cta-cards/cta-cards.js */

export default async function decorate(block) {
  const cards = [...block.firstElementChild.children];

  block.firstElementChild.classList.add('cta-cards-row');

  cards.forEach((card) => {
    card.classList.add('cta-card');

    const paras = [...card.querySelectorAll('p')];
    const heading = card.querySelector('h2, h3');
    const link = card.querySelector('a');

    paras.forEach((p) => {
      const strong = p.querySelector('strong');
      if (strong && !heading && p === paras[0]) {
        p.classList.add('cta-card-eyebrow');
      } else if (p.contains(link)) {
        p.classList.add('cta-card-cta-wrapper');
        link.classList.add('button', 'button-primary');
        const arrow = document.createElement('img');
        arrow.src = '//www.assets.lundbeck-tools.com/content/dam/lundbeck/vyepti/overhaul/images/cta-button-arrow-20-global-white.svg';
        arrow.alt = '';
        link.append(arrow);
      } else if (heading && p !== paras[0]) {
        p.classList.add('cta-card-desc');
      }
    });

    if (heading) heading.classList.add('cta-card-heading');
  });
}
