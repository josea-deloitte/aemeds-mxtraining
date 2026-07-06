# Teaser Block — Authoring Guide

The Teaser block pairs an image with editorial text and a call-to-action link. It supports two layout variants that are chosen by the block name used in the table header.

---

## Variants at a glance

| Variant | Table header | Mobile | Desktop |
|---|---|---|---|
| **Image Right Align First** | `Teaser (Image Right Align First)` | Image stacked above content | Two columns: content left, image right |
| **Image Center Align** | `Teaser (Image Center Align)` | Image above content, both centered | Image above content, both centered |

---

## Authoring structure

Create a **one-row, two-column** table. The variant name goes in the header row of the first column; the second header cell is left empty.

### Variant 1 — Image Right Align First

| Teaser (Image Right Align First) | |
|:---|:---|
| *(Insert image here)* | **IS MIGRAINE IMPACTING YOUR LIFE?** ← eyebrow (bold only) |
| | ## The battle with migraine disability. ← H2 heading |
| | Body paragraph text goes here. |
| | [Learn More](https://example.com) ← CTA link (standalone paragraph) |

> **Note:** In Google Docs / SharePoint, the image and all content text go in the same row — the table above is split across multiple lines only for readability.

### Variant 2 — Image Center Align

| Teaser (Image Center Align) | |
|:---|:---|
| *(Insert image here)* | **IS MIGRAINE IMPACTING YOUR LIFE?** |
| | ## Heading |
| | Body text. |
| | [Learn More](https://example.com) |

---

## Cell-by-cell rules

### Cell 1 — Image

- Insert exactly **one image** using **Insert › Image**.
- Always add a descriptive **alt text** when prompted — required for accessibility.
- The image is automatically cropped to fill its container (`object-fit: cover`), so tight crops work well.

### Cell 2 — Content

Content is read top-to-bottom in this exact order:

| Element | How to author | Notes |
|---|---|---|
| **Eyebrow** (optional) | A paragraph containing **bold text only** (no other content on that line) | Renders as a small rose uppercase label |
| **Heading** | Heading 2 or Heading 3 (`##` / `###`) | Do **not** use bold text as a substitute |
| **Body** | One or more regular paragraphs | Keep concise — 1–3 sentences works best |
| **CTA link** | A standalone paragraph with one link | Automatically renders as a rose pill button |

---

## What renders where

### Image Right Align First

```
Mobile (< 900 px):          Desktop (≥ 900 px):
┌─────────────────┐          ┌──────────┬──────────┐
│     Image       │          │ EYEBROW  │          │
│   (16:9 crop)   │          │ Heading  │  Image   │
├─────────────────┤          │ Body     │          │
│ EYEBROW         │          │ [CTA]    │          │
│ Heading         │          └──────────┴──────────┘
│ Body text       │
│ [CTA button]    │
└─────────────────┘
```

### Image Center Align

```
All screen sizes:
┌───────────────────┐
│      Image        │
│   (4:3, centered) │
├───────────────────┤
│     EYEBROW       │
│     Heading       │
│    Body text      │
│      [CTA]        │
└───────────────────┘
```

---

## Rules summary

| Rule | Detail |
|---|---|
| Cell order | Image **always in the first (left) cell**; content in the second |
| Eyebrow format | Standalone `<p>` with **bold text only** — no other text or elements in that paragraph |
| Heading level | Use **Heading 2** or Heading 3 — not bold/strong text |
| Alt text | Always add descriptive alt text to the image |
| CTA | At most **one CTA link** per teaser; place it in its own standalone paragraph |
| Table rows | The table must have exactly **one body row** |

---

## Example rendered HTML

After decoration the block produces:

```html
<div class="teaser teaser-image-right-align-first">
  <div class="teaser-image">
    <picture>
      <source type="image/webp" srcset="./media_1.webp">
      <img loading="lazy" alt="Patient Image" src="./media_1.png">
    </picture>
  </div>
  <div class="teaser-content">
    <p class="teaser-eyebrow"><strong>IS MIGRAINE IMPACTING YOUR LIFE?</strong></p>
    <h2>The battle with migraine disability.</h2>
    <p>Let's face it—no matter how often you get migraine attacks…</p>
    <p class="button-container">
      <a href="#" class="button primary">Learn More</a>
    </p>
  </div>
</div>
```

---

## Anchor links

There is no built-in anchor on the teaser. If another block or page element needs to link to a specific teaser, ask a developer to add an `id` to the section in Google Docs metadata.
