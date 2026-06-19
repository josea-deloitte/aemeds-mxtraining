/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-feature.
 * Base block: cards.
 * Source: https://www.vyepti.com/
 * Generated for VYEPTI homepage 3-up feature cards migration.
 *
 * Structure (from library-description.txt — Cards):
 *   2 columns, one row per card:
 *     Cell 1: image/icon (mandatory)
 *     Cell 2: text content — heading, description, optional CTA
 *
 * Source DOM (validated against source.html):
 *   .home-parsys .row > .col-* (3 cards)
 *     each card: .boxed-parsys
 *       .img-wrapper picture/img          -> image cell
 *       .description-after h2 + p          -> heading + description
 *       .boxed-link a.button-ghost-cta     -> CTA
 */
export default function parse(element, { document }) {
  // Each .col-* in the row is one card.
  const cards = Array.from(element.querySelectorAll(':scope .row > [class*="col-"]'));

  // Empty-block guard.
  if (!cards.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = cards.map((card) => {
    const scope = card.querySelector('.boxed-parsys') || card;

    // Image cell.
    const picture = scope.querySelector('.img-wrapper picture, picture');
    const img = scope.querySelector('.img-wrapper img, img');
    const imageCell = [];
    if (picture) imageCell.push(picture);
    else if (img) imageCell.push(img);

    // Text cell: heading, description, CTA.
    const textCell = [];
    const heading = scope.querySelector('.description-after h2, .description-after h3, h2, h3');
    if (heading) textCell.push(heading);

    const descriptions = Array.from(scope.querySelectorAll('.description-after p'));
    descriptions.forEach((p) => textCell.push(p));

    const cta = scope.querySelector('.boxed-link a, a.button-ghost-cta');
    if (cta) textCell.push(cta);

    return [imageCell, textCell];
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-feature', cells });
  element.replaceWith(block);
}
