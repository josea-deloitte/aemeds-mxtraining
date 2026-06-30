# GitHub Copilot Instructions for AEM Edge Delivery Services (EDS) Project

## 1. ADHD-FRIENDLY COMMUNICATION (CRITICAL)

- **Format:** ALWAYS use structured markdown. Use bolding for key concepts, tables for comparisons, and short paragraphs.
- **Directness:** "Answer first, evidence second". Give me the precise code snippet or answer in the very first sentence. Eliminate conversational filler, long preambles, and generic summaries.
- **Cognitive Load:** Keep explanations concise, modular, and visual. If showing code, explain ONLY the crucial parts using bullet points or inline comments.

---

## 2. CORE ARCHITECTURAL PARADIGM (AEM EDS)

- **Vanilla First:** AEM EDS is built for speed (100/100 Lighthouse score). **NEVER suggest React, Angular, Vue, or heavy framework-dependent libraries** unless explicitly requested. Use pure, modern vanilla ES6+ JavaScript, CSS, and HTML5.
- **Buildless Execution:** EDS does not use a traditional local bundler (Webpack, Vite) during execution. Rely on standard imports and HTTP/2 parallelization.
- **AEM Boilerplate Rules:**
  - Do NOT modify `scripts/aem.js` directly; it is a read-only shared foundation.
  - Keep global custom helper functions in `scripts/scripts.js`.
  - Check if an AEM/EDS helper already exists in `aem.js` before writing code from scratch.
  - Implement mobile-first CSS in `/blocks` and progressively enhance for desktop using media queries to prevent CLS (Cumulative Layout Shift).

---

## 3. BLOCK DEVELOPMENT & DESIGN SYSTEM RULES

- **Block Anatomy:** A block must reside in `/blocks/<block-name>/`. It consists of:
  - `<block-name>.js` (for logic)
  - `<block-name>.css` (for styling)
- **JS Execution Model:** The default export of `<block-name>.js` must be an asynchronous function that takes the block’s DOM container as an argument:

  \`\`\`javascript
  export default async function decorate(block) {
  // Logic to restructure the DOM generated from Google Docs/Sharepoint
  }
  \`\`\`

- **HTML Dom Manipulation:** Keep DOM manipulation minimal, efficient, and clean (SOLID / DRY principles). Avoid deep DOM nesting.

---

## 4. ADOBE REVIEW & PERFORMANCE COMPLIANCE (100/100 LIGHTHOUSE)

To pass Adobe's automatic PageSpeed Insights (PSI) checks on GitHub PRs and guarantee a successful production review, all code must respect these guidelines:

- **LCP (Largest Contentful Paint) Optimization:**
  - Identify hero blocks and optimize them for instant loading.
  - Use proper eager loading for critical images/assets (`createOptimizedPicture` from `aem.js`).
- **CLS (Cumulative Layout Shift) Prevention:**
  - Provide explicit aspect ratios or placeholders for dynamic components.
  - Strictly write mobile-first CSS.
- **INP (Interaction to Next Paint) Optimization:**
  - Do not block the main thread.
  - Use lazy-loading or dynamic imports (`import()`) for non-critical code or heavy libraries that are only executed upon user interaction.
- **DRY & SOLID JavaScript:**
  - **Single Responsibility Principle (SOLID):** One helper function should do exactly one thing.
  - **DRY (Don't Repeat Yourself):** Abstract DOM manipulation helpers (e.g., creating wrappers, custom structures) into `scripts.js` if they are shared across blocks.

---

## 5. CLEAN CODE & NAMING CONVENTIONS

**Naming Rules:**

- Explicit: `userEmail` not `uE`; `HERO_IMAGE_LAZY_LOAD_DELAY` not `DELAY`
- Booleans: `isVisible()`, `hasError()`, `shouldRender()`
- Handlers: `onClick`, `onScroll`, `onIntersect`

**File Structure (Top-Down):**
Constants → Helper functions → Main `decorate()` → Event listeners

**Quick Example:**

```javascript
const IMAGE_CONFIG = { EAGER_INDEX: 0 };
function setImageLoading(imgs) {
  imgs.forEach((img, i) => {
    img.loading = i === 0 ? 'eager' : 'lazy';
  });
}
export default async function decorate(block) {
  setImageLoading(block.querySelectorAll('img'));
}
```

---

## 6. SOLID & DRY PRINCIPLES

**SRP (Single Responsibility):**

```javascript
// ❌ BAD: Too many jobs
function processCard(card) {
  const title = card.querySelector('h3')?.textContent;
  card.classList.add('processed');
  track('card_rendered');
}

// ✅ Extract concerns
const getTitle = (card) => card.querySelector('h3')?.textContent || '';
const markProcessed = (card) => card.classList.add('processed');
```

**OCP (Open/Closed):** Use strategy objects for variations

```javascript
const HANDLERS = {
  hero: (block) => {
    /* hero */
  },
  card: (block) => {
    /* card */
  },
};
```

**DRY:** Extract shared DOM helpers to `scripts.js`

```javascript
// scripts.js
export const createEl = (tag, cls, text) => {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (text) el.textContent = text;
  return el;
};

export const observeEl = (el, callback, opts = {}) => {
  const obs = new IntersectionObserver(callback, { threshold: 0.1, ...opts });
  obs.observe(el);
  return obs;
};
```

---

## 7. CSS & PERFORMANCE

**Mobile-First (always):**

```css
.hero {
  padding: 1rem;
}
@media (min-width: 600px) {
  .hero {
    padding: 2rem;
  }
}
@media (min-width: 900px) {
  .hero {
    padding: 3rem;
  }
}
```

**CSS Variables:** `--color-primary`, `--spacing-unit`, `--font-size-base`

**Never:** Use `max-width` for progressive enhancement. Always `min-width`.

---

## 8. TESTING BEFORE COMMIT

| Aspect         | Checklist                                                 |
| -------------- | --------------------------------------------------------- |
| **Lighthouse** | Score ≥ 100: `curl http://localhost:3000/page.plain.html` |
| **Responsive** | 375px (mobile), 768px (tablet), 1200px+ (desktop)         |
| **A11y**       | WCAG 2.1 AA: headings hierarchy, alt text, 4.5:1 contrast |
| **Code**       | `npm run lint` passes, no console errors                  |

---

## 9. GIT WORKFLOW

**Branches:** `feature/name`, `bugfix/name`, `refactor/name`, `docs/name`

**Commits:** Follow Conventional Commits

```
feat(cards): add lazy loading
fix(hero): prevent CLS on image load
refactor(scripts): extract intersection observer
```

**PR:** Include feature preview link: `https://{branch}--{repo}--{owner}.aem.page/{path}`

---

## 10. DEBUGGING FOR ADHD

**Quick Flow:**

1. `curl http://localhost:3000/path.plain.html` → Read backend HTML
2. DevTools > Elements → See what DOM your block gets
3. Add `console.log()` at key steps
4. Change ONE thing at a time

**Debug Template:**

```javascript
export default async function decorate(block) {
  console.log('Before:', block.innerHTML);
  block.querySelector('h2').classList.add('primary');
  console.log('After:', block.innerHTML);
}
```

**DevTools:** F10 (step over), F11 (step in), watch expressions, conditional breakpoints

---

## 11. RESPONSE FORMAT

**Answer First:** Code snippet or direct answer in first sentence.

**Structure:**

- **Why it works:** 1-2 bullets (approach + mechanism)
- **Performance:** How it respects AEM EDS standards
- **Next:** If applicable (e.g., "Now add mobile CSS")
