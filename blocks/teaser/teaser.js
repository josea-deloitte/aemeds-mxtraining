/**
 * Teaser block
 *
 * Variants (set by table header, drives CSS class):
 *   teaser-image-right-align-first — two-column split; content left / image right
 *                                    on desktop, image stacked first on mobile.
 *   teaser-image-center-align      — stacked, centered; image above content.
 *
 * Authored as a one-row, two-column table:
 *   Column 1: image
 *   Column 2: eyebrow (bold-only paragraph) + heading + body + CTA link
 */
export default function decorate(block) {
  const row = block.querySelector(':scope > div');
  if (!row) return;

  const [imageCell, contentCell] = [...row.querySelectorAll(':scope > div')];
  if (!imageCell) return;

  imageCell.classList.add('teaser-image');

  if (contentCell) {
    contentCell.classList.add('teaser-content');

    // First child <p> whose only substantive child is a <strong> or <em> → eyebrow
    const firstP = contentCell.querySelector(':scope > p:first-child');
    if (firstP) {
      const substantive = [...firstP.childNodes].filter(
        (n) => !(n.nodeType === Node.TEXT_NODE && !n.textContent.trim()),
      );
      if (
        substantive.length === 1
        && ['STRONG', 'EM'].includes(substantive[0].tagName)
      ) {
        firstP.classList.add('teaser-eyebrow');
      }
    }
  }

  // Lift cells directly into the block and discard the row wrapper
  block.append(imageCell);
  if (contentCell) block.append(contentCell);
  row.remove();
}
