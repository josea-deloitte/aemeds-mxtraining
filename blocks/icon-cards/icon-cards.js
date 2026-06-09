/* /blocks/icon-cards/icon-cards.js */

export default async function decorate(block) {
  const rows = [...block.children];

  block.classList.add('icon-cards-grid');

  rows.forEach((row) => {
    row.classList.add('icon-card');

    const [iconCell, textCell, ctaCell] = [...row.children];

    if (iconCell) {
      iconCell.classList.add('icon-card-icon');
      const img = iconCell.querySelector('img');
      if (img) img.setAttribute('aria-hidden', 'true');
    }

    if (textCell) {
      textCell.classList.add('icon-card-body');
      const heading = textCell.querySelector('h2, h3');
      if (heading) heading.classList.add('icon-card-heading');
    }

    if (ctaCell) {
      ctaCell.classList.add('icon-card-cta-wrapper');
      const link = ctaCell.querySelector('a');
      if (link) {
        link.classList.add('button', 'button-ghost');
        const arrow = document.createElement('span');
        arrow.className = 'icon-card-arrow';
        arrow.setAttribute('aria-hidden', 'true');
        link.append(arrow);
      }
    }
  });
}
