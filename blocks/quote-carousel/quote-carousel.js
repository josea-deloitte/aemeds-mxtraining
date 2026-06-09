/* /blocks/quote-carousel/quote-carousel.js */

export default async function decorate(block) {
  const slides = [...block.children];
  let current = 0;

  block.classList.add('quote-carousel-wrapper');

  const track = document.createElement('div');
  track.className = 'quote-carousel-track';

  slides.forEach((slide, i) => {
    slide.classList.add('quote-carousel-slide');
    slide.setAttribute('aria-hidden', i !== 0);
    slide.dataset.index = i;

    const [textCell, imageCell] = [...slide.children];

    if (textCell) {
      textCell.classList.add('quote-carousel-text');

      const quoteIcon = document.createElement('span');
      quoteIcon.className = 'quote-carousel-icon';
      quoteIcon.setAttribute('aria-hidden', 'true');
      textCell.prepend(quoteIcon);

      const links = textCell.querySelectorAll('a');
      links.forEach((link) => {
        link.classList.add('quote-carousel-cta');
        const arrow = document.createElement('span');
        arrow.className = 'quote-carousel-arrow';
        arrow.setAttribute('aria-hidden', 'true');
        link.append(arrow);
      });

      const disclaimer = textCell.querySelector('p em');
      disclaimer?.closest('p')?.classList.add('quote-carousel-disclaimer');
    }

    if (imageCell) {
      imageCell.classList.add('quote-carousel-image');
      const img = imageCell.querySelector('img');
      if (img) img.classList.add('quote-carousel-patient-photo');
    }

    track.append(slide);
  });

  const nav = document.createElement('div');
  nav.className = 'quote-carousel-nav';

  const prev = document.createElement('button');
  prev.className = 'quote-carousel-btn quote-carousel-btn-prev';
  prev.setAttribute('aria-label', 'Previous quote');
  prev.innerHTML = '<span aria-hidden="true"></span>';

  const next = document.createElement('button');
  next.className = 'quote-carousel-btn quote-carousel-btn-next';
  next.setAttribute('aria-label', 'Next quote');
  next.innerHTML = '<span aria-hidden="true"></span>';

  const dots = document.createElement('div');
  dots.className = 'quote-carousel-dots';

  function goTo(index) {
    slides[current].setAttribute('aria-hidden', true);
    slides[current].classList.remove('active');
    dots.children[current].classList.remove('active');

    current = (index + slides.length) % slides.length;

    slides[current].removeAttribute('aria-hidden');
    slides[current].classList.add('active');
    dots.children[current].classList.add('active');
  }

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `quote-carousel-dot${i === 0 ? ' active' : ''}`;
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dots.append(dot);
  });

  prev.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));

  slides[0].classList.add('active');

  block.innerHTML = '';
  nav.append(prev, track, next);
  block.append(nav, dots);

  let startX = 0;
  track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
  });
}
