export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;

  row.classList.add('hero-layout');

  const columns = Array.from(row.children);
  if (columns.length < 2) return;

  const media = columns[0];
  const content = columns[1];

  media.classList.add('hero-media');
  content.classList.add('hero-content');

  const picture = media.querySelector('picture');
  if (picture) media.replaceChildren(picture);

  const cta = content.querySelector('a');
  if (cta) {
    cta.classList.add('hero-cta');
    const ctaWrapper = cta.closest('p');
    if (ctaWrapper) ctaWrapper.classList.add('hero-cta-container');
  }

  const paragraphs = Array.from(content.children).filter((el) => el.tagName === 'P');
  const lastParagraph = paragraphs[paragraphs.length - 1];

  if (
    lastParagraph
    && !lastParagraph.querySelector('a')
    && lastParagraph.querySelector('em, i')
  ) {
    lastParagraph.classList.add('hero-disclaimer');
  }
}
