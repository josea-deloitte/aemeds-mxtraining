# VYEPTI ISI & Prescribing Information — Global Block Migration Plan

## Objective
Analyze how `https://www.vyepti.com/` structures its **Important Safety Information (ISI)** section and **Prescribing Information (PI) / Medication Guide** links, then build a reusable Edge Delivery Services (EDS) global element so the ISI (with its PI links bundled in) appears consistently on every page and is maintained in one place.

## Confirmed Decisions
- **Deliverable:** Analysis **and** build the EDS block(s).
- **ISI implementation:** To be **recommended after live analysis** (fragment vs. dedicated sticky block vs. auto-block) — chosen once the real sticky/scroll/expand behavior is confirmed.
- **PI / Medication Guide links:** Bundled **inside the ISI global block** so they travel together.

## Background (from prior site catalog)
- The site has 19 pages, single locale, sharing a global header (advanced mega-menu) and footer (moderate, legal section).
- The earlier catalog captured header/footer globals but did **not** isolate the ISI band or PI links — these need fresh live-DOM inspection.
- VYEPTI is a Lundbeck pharma product site; ISI is typically a **sticky bottom band** that expands, plus a **full ISI block** above the footer, with PI/Medication Guide as repeated PDF links.
- Existing project blocks: `alert-strip`, `cards`, `columns`, `fragment`, `header`, `footer`, `hero`, `widget`. `fragment` and `alert-strip` are the most relevant starting points.

## Analysis Phase (read-only, live site)
1. Inspect the live ISI on 2–3 representative pages (homepage + a content page) to capture:
   - DOM container, selectors, and where ISI markup lives relative to footer.
   - **Sticky/condensed band** behavior: is there a fixed bottom bar that expands on click/scroll? Does it dock into the full ISI when scrolled to the bottom?
   - The **full ISI block** content structure (headings, paragraphs, lists, "what is VYEPTI", indication, boxed warnings if any).
   - Scroll-sync / accordion / "see more" interactions and ARIA roles.
2. Locate **PI / Medication Guide links** everywhere they appear (ISI band, full ISI, header, footer): capture link text, target PDF URLs, and `target`/`rel` attributes.
3. Capture computed styles (colors, fonts, spacing, z-index, breakpoints) for visual fidelity, mobile + desktop.
4. Decide & document the **recommended EDS approach** (with rationale): most likely a dedicated global `isi` block for the sticky behavior, with ISI body content authored in a shared fragment referenced by the block — but final call after observing behavior.

## Build Phase (EDS implementation)
5. Create the ISI global block (`blocks/isi/isi.js` + `blocks/isi/isi.css`):
   - Defines the authoring content contract (heading + rich text + PI/Medication Guide link list bundled in).
   - JS decoration for the sticky condensed band, expand/collapse, scroll-aware docking, and accessibility (focus, ARIA, keyboard).
   - Mobile-first CSS matching captured styles, scoped to `.isi`.
6. Wire it to load **globally on every page** (e.g., auto-block / load in the lazy phase via `scripts.js`, or as a fragment-referenced block), so authors don't add it per page.
7. Author the ISI content once as a shared **fragment** (e.g., `/fragments/isi`) including the PI/Medication Guide links, referenced by the global block.
8. Provide a draft/test HTML file under `drafts/` to validate rendering locally without needing authored content.

## Validation Phase
9. Run the dev server and verify on desktop + mobile: sticky band shows on load, expands correctly, docks at the full ISI, PI/Medication Guide links resolve to the correct PDFs and open appropriately.
10. Visual-compare the EDS ISI against the original site on representative pages; iterate on CSS/JS for fidelity.
11. Run `npm run lint` and fix issues; confirm no console errors and no layout regressions to header/footer/content.

## Checklist
- [ ] Inspect live ISI structure & sticky/expand behavior on homepage + a content page (DOM, selectors, interactions)
- [ ] Locate and record all PI / Medication Guide links (text, PDF targets, attributes) across band/ISI/header/footer
- [ ] Capture ISI computed styles (colors, fonts, spacing, z-index, breakpoints) for desktop + mobile
- [ ] Document recommended EDS approach for ISI with rationale (fragment vs sticky block vs hybrid)
- [ ] Create `blocks/isi/isi.js` and `blocks/isi/isi.css` with authoring content contract (PI links bundled in)
- [ ] Implement sticky condensed band + expand/collapse + scroll docking + accessibility in JS
- [ ] Implement mobile-first, block-scoped CSS matching captured styles
- [ ] Wire ISI to load globally on every page (auto-block / lazy-phase load or fragment reference)
- [ ] Author ISI content as shared fragment (`/fragments/isi`) including PI/Medication Guide links
- [ ] Add a `drafts/` test HTML file to validate rendering locally
- [ ] Validate rendering + behavior on desktop and mobile in the preview
- [ ] Visual-compare against original site and iterate for fidelity
- [ ] Run `npm run lint`, fix issues, confirm no console errors or regressions

## Deliverables
- A short analysis writeup of the ISI + PI link structure and the recommended EDS approach.
- A reusable global `isi` EDS block (JS + CSS) with PI/Medication Guide links bundled in.
- A shared ISI content fragment authored once and referenced site-wide.
- Local validation evidence (preview checks + visual comparison) and passing lint.

## Next Step
Execution requires **Execute mode**. On approval, I'll begin with the live-site ISI/PI analysis, share the recommended approach, then build and validate the global block.
