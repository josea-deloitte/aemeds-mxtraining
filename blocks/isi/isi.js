/* /blocks/isi/isi.js */

function buildStickyISI(source) {
  const sticky = document.createElement('div');
  sticky.className = 'isi-sticky';
  sticky.id = 'isi-sticky';

  const header = document.createElement('div');
  header.className = 'isi-sticky-header';

  const titles = document.createElement('div');
  titles.className = 'isi-sticky-titles';
  titles.innerHTML = `
    <strong>IMPORTANT SAFETY INFORMATION</strong>
    <span class="isi-sticky-separator">|</span>
    <strong>APPROVED USE</strong>
  `;

  const toggle = document.createElement('button');
  toggle.className = 'isi-sticky-toggle';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'isi-sticky-body');
  toggle.innerHTML = '<i class="isi-chevron isi-chevron-down" aria-hidden="true"></i>';

  header.append(titles, toggle);

  const body = document.createElement('div');
  body.className = 'isi-sticky-body';
  body.id = 'isi-sticky-body';
  body.hidden = true;

  const cloned = source.cloneNode(true);
  body.append(cloned);

  sticky.append(header, body);
  return sticky;
}

export default async function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    row.className = 'isi-section';
    const cell = row.firstElementChild;
    if (cell) {
      cell.className = 'isi-content';
    }
  });

  const sticky = buildStickyISI(block);
  document.body.append(sticky);

  const expandBtn = sticky.querySelector('.isi-sticky-toggle');
  const body = sticky.querySelector('.isi-sticky-body');
  let expanded = false;

  expandBtn.addEventListener('click', () => {
    expanded = !expanded;
    body.hidden = !expanded;
    expandBtn.setAttribute('aria-expanded', expanded);
    expandBtn.querySelector('i').className = expanded ? 'isi-chevron isi-chevron-up' : 'isi-chevron isi-chevron-down';
  });

  const fullISI = document.getElementById('isi-full');
  if (fullISI) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        sticky.style.display = entry.isIntersecting ? 'none' : 'block';
      });
    }, { threshold: 0.1 });
    observer.observe(fullISI);
  }
}
