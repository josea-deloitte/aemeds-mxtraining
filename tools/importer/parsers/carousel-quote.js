/* eslint-disable */
/* global WebImporter */
/**
 * Parser for carousel-quote.
 * Base block: carousel.
 * Source: https://www.vyepti.com/
 * Generated for VYEPTI homepage patient-quotes carousel migration.
 *
 * Structure (from library-description.txt — Carousel):
 *   2 columns, one row per slide:
 *     Cell 1: image (mandatory, no other content) — patient portrait
 *     Cell 2: text content — quote (heading), attribution, disclaimer, CTA
 *
 * Source DOM (validated against source.html):
 *   .quotes-carousal is a Slick carousel. Real slides are `.slick-slide`
 *   EXCLUDING `.slick-cloned` (Slick clones first/last slides for the
 *   infinite-loop effect — including clones would duplicate slides).
 *   Each slide:
 *     .rteComponent  -> quote h2.patient-quotes, attribution p (.patient-info),
 *                       disclaimer p.individual-result, CTA p > a.watch-story-icon
 *     img.vyepti-patient-image -> the patient portrait (right column)
 *   Nav arrows (button.slick-arrow) and the decorative quote glyph inside
 *   .rte are excluded from the authored output.
 */
export default function parse(element, { document }) {
  // Real slides only — drop Slick clones so slides aren't duplicated.
  const slides = Array.from(element.querySelectorAll('.slick-slide'))
    .filter((slide) => !slide.classList.contains('slick-cloned'));

  // Empty-block guard.
  if (!slides.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = slides.map((slide) => {
    // Image cell: the patient portrait only.
    const portrait = slide.querySelector('img.vyepti-patient-image');
    const imageCell = [];
    if (portrait) {
      const portraitPicture = portrait.closest('picture');
      imageCell.push(portraitPicture || portrait);
    }

    // Text cell: quote, attribution, disclaimer, CTA from the rteComponent.
    const textCell = [];
    const rteComponent = slide.querySelector('.rteComponent');
    if (rteComponent) {
      // Heading (quote).
      const heading = rteComponent.querySelector('h2, h3');
      if (heading) textCell.push(heading);
      // Paragraphs: attribution, disclaimer, CTA wrapper (in document order).
      const paragraphs = Array.from(rteComponent.querySelectorAll(':scope > p'));
      paragraphs.forEach((p) => textCell.push(p));
    }

    return [imageCell, textCell];
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-quote', cells });
  element.replaceWith(block);
}
