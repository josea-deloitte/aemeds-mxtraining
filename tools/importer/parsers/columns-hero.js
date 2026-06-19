/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-hero.
 * Base block: columns.
 * Source: https://www.vyepti.com/
 * Generated for VYEPTI homepage split-hero migration.
 *
 * Structure (from library-description.txt):
 *   - Columns block: row 1 is the block name, subsequent rows have one cell per column.
 *   - This split hero has 2 columns, each a teaser panel (image + overlay text + optional CTA).
 *
 * Source DOM (validated against source.html):
 *   .columncontainer > .container > .row > .col-* (2 of them)
 *     each col contains .teaser .cmp-teaser with:
 *       .cmp-teaser__image picture/img
 *       .cmp-teaser__content .cmp-teaser__description (headline/eyebrow/subtext)
 *       .cmp-teaser__action-container a (CTA, right panel only)
 *       .cmp-teaser__description__secondary ("Actor portrayal")
 */
export default function parse(element, { document }) {
  // Each .col-* in the row becomes one column of the block.
  const columns = Array.from(element.querySelectorAll(':scope .row > [class*="col-"]'));

  // Empty-block guard: no columns found means nothing to build.
  if (!columns.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const rowCells = columns.map((col) => {
    const teaser = col.querySelector('.cmp-teaser') || col;
    const cellContent = [];

    // Image (preserve the full <picture> when present, else the <img>).
    const picture = teaser.querySelector('.cmp-teaser__image picture, picture');
    const img = teaser.querySelector('.cmp-teaser__image img, img');
    if (picture) cellContent.push(picture);
    else if (img) cellContent.push(img);

    // Primary text content (eyebrow / headline / subtext paragraphs).
    const description = teaser.querySelector('.cmp-teaser__description');
    if (description) cellContent.push(description);

    // CTA link (right panel only).
    const ctaLink = teaser.querySelector('.cmp-teaser__action-container a, .cmp-teaser__action-link');
    if (ctaLink) cellContent.push(ctaLink);

    // Secondary description ("Actor portrayal" disclaimer).
    const secondary = teaser.querySelector('.cmp-teaser__description__secondary');
    if (secondary) cellContent.push(secondary);

    return cellContent;
  });

  const cells = [rowCells];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-hero', cells });
  element.replaceWith(block);
}
