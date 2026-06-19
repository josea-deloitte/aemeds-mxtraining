/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-callout.
 * Base block: cards.
 * Source: https://www.vyepti.com/
 * Generated for VYEPTI homepage 2-up callout cards migration.
 *
 * Structure (from library-description.txt — Cards (no images)):
 *   These callout cards carry NO card image (only the CTA arrow glyph), so the
 *   "no images" cards variant applies: 1 column, one row per card. Each cell
 *   holds the text content — eyebrow heading, headline, description, CTA.
 *
 * Source DOM (validated against source.html):
 *   .container .row > .col-* (2 cards)
 *     each card: .bgcard-parsys.shadow-box
 *       .description-after  -> h4 (eyebrow), h2 (headline), p (description)
 *       .boxed-link a.button-primary -> CTA (arrow img inside link is decorative)
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
    const scope = card.querySelector('.bgcard-parsys') || card;
    const cardContent = [];

    // Eyebrow + headline + description live in .description-after.
    const description = scope.querySelector('.description-after');
    if (description) cardContent.push(description);

    // CTA link.
    const cta = scope.querySelector('.boxed-link a, a.button-primary');
    if (cta) cardContent.push(cta);

    // 1 column: one cell per card holding all the card's content.
    return [cardContent];
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-callout', cells });
  element.replaceWith(block);
}
