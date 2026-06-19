/* eslint-disable */
/* global WebImporter */
/**
 * Parser for alert-strip.
 * Base block: alert-strip (existing local project block, reused).
 * Source: https://www.vyepti.com/
 * Generated for VYEPTI homepage call-out strip migration.
 *
 * Authoring contract (from blocks/alert-strip/alert-strip.js):
 *   One row, up to two cells:
 *     | :icon: | **text with inline phone link** |
 *   Icon cell is optional/decorative; text cell carries the message.
 *
 * Source DOM (validated against source.html):
 *   .vyepti-homepage-call-cta .row
 *     .vyepti-homepage-info-icon .image-text-comp picture/img  -> icon cell
 *     .vyepti-homepage-cta .rteComponent p                     -> text cell
 */
export default function parse(element, { document }) {
  // Icon: small support image in the info-icon column.
  const iconPicture = element.querySelector('.vyepti-homepage-info-icon picture, .image-text-comp picture');
  const iconImg = element.querySelector('.vyepti-homepage-info-icon img, .image-text-comp img');

  // Text: the rich-text paragraph with the inline phone-number link.
  const text = element.querySelector('.vyepti-homepage-cta .rteComponent, .vyepti-homepage-cta p, .rteComponent');

  // Empty-block guard: without the message text there is nothing to author.
  if (!text) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const iconCell = [];
  if (iconPicture) iconCell.push(iconPicture);
  else if (iconImg) iconCell.push(iconImg);

  const cells = [[iconCell, [text]]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'alert-strip', cells });
  element.replaceWith(block);
}
