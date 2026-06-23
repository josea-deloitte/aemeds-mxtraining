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
  // Each .col-* in the row is one card (homepage 2-up shadow-box layout).
  let cards = Array.from(element.querySelectorAll(':scope .row > [class*="col-"]'));

  // Narrow-card fallback: the content-page "narrow CTA" renders a single card as
  // .narrow-card .row whose .col-* children split text vs. CTA rather than being
  // separate cards. Detect that shape (a .rteComponent text panel beside a
  // .cta-component) and treat the whole element as ONE card so the heading text
  // (eyebrow/headline/description) is not dropped.
  const isNarrowCard = element.querySelector('.narrow-card') && element.querySelector('.cta-component');
  if (isNarrowCard || !cards.length) {
    cards = [element];
  }

  const cells = cards.map((card) => {
    const scope = card.querySelector('.bgcard-parsys') || card;
    const cardContent = [];

    // Eyebrow + headline + description: homepage uses .description-after; the
    // narrow card uses .rte .rteComponent. Take whichever text panel exists.
    const description = scope.querySelector('.description-after, .rteComponent');
    if (description) cardContent.push(description);

    // CTA link: homepage .boxed-link a / a.button-primary; narrow card .cta-component a.
    const cta = scope.querySelector('.boxed-link a, .cta-component a, a.button-primary');
    if (cta) cardContent.push(cta);

    // 1 column: one cell per card holding all the card's content.
    return [cardContent];
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-callout', cells });
  element.replaceWith(block);
}
