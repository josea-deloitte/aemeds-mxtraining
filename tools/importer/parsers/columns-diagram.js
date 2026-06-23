/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-diagram.
 * Base block: columns.
 * Source: https://www.vyepti.com/how-vyepti-works
 * Generated for VYEPTI content-page "How VYEPTI works" explainer migration.
 *
 * Structure (from library-description.txt):
 *   - Columns block: row 1 is the block name, the next row has one cell per column.
 *   - This explainer is a 2-column layout (text panel | diagram + legend),
 *     matching blocks/columns-diagram/columns-diagram.js (first row children = columns).
 *
 * Source DOM (validated against source.html):
 *   .row >
 *     .carousalLeftWrapper .rteComponent  -> text panel (h2, paragraphs, ul, h6 disclaimer)
 *     .vyepti-works-gif                    -> diagram panel:
 *        .cmp-teaser__image picture/img    -> CGRP movement diagram
 *        ul (CGRP / Receptor / VYEPTI legend) — duplicated across responsive
 *        copies (.carousal-right-content-tablet + .carousal-right-content),
 *        so only the FIRST legend list is taken to avoid duplication.
 *   (A duplicate h6 disclaimer also exists as a responsive copy under
 *    .how-vyepti-disclaimer-text; the parser keeps only the in-panel h6.)
 */
export default function parse(element, { document }) {
  // Left text panel: h2, paragraphs, bulleted list, h6 disclaimer.
  const textPanel = element.querySelector(
    '.carousalLeftWrapper .rteComponent, .carousalLeftWrapper',
  );

  // Right diagram panel root.
  const diagramPanel = element.querySelector('.vyepti-works-gif');

  // Empty-block guard: nothing meaningful to build.
  if (!textPanel && !diagramPanel) {
    element.replaceWith(...element.childNodes);
    return;
  }

  // --- Left cell: full text panel content (heading hierarchy preserved). ---
  const leftCell = [];
  if (textPanel) {
    // Preserve the panel's children as-is (h2/span, p, ul, h6) without
    // promoting or demoting heading levels.
    leftCell.push(...Array.from(textPanel.children));
  }

  // --- Right cell: diagram image + a single legend list. ---
  const rightCell = [];
  if (diagramPanel) {
    // Diagram image (keep the full <picture> when present, else the <img>).
    const picture = diagramPanel.querySelector('.cmp-teaser__image picture, picture');
    const img = diagramPanel.querySelector('.cmp-teaser__image img, img');
    if (picture) rightCell.push(picture);
    else if (img) rightCell.push(img);

    // Legend list — the source renders it multiple times for responsive
    // breakpoints; take only the first to avoid duplicate legends.
    const legend = diagramPanel.querySelector('ul');
    if (legend) rightCell.push(legend);
  }

  const cells = [[leftCell, rightCell]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-diagram', cells });
  element.replaceWith(block);
}
