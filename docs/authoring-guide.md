# Content Authoring Guide (da.live)

How to author the **header**, **footer**, and **alert-strip** blocks for this project
in the [da.live](https://da.live) editor.

This guide assumes you are editing documents in da.live (Document Authoring), where:

- **Blocks** are tables. The first row is a single merged cell holding the **block
  name** (optionally a variant in parentheses, e.g. `Columns (center)`).
- **Sections** are separated by a horizontal rule — type `---` on its own line, or use
  the divider in the toolbar.
- **Icons** are written as `:icon-name:` and resolve to the matching SVG in `/icons`
  (e.g. `:mail:` → `/icons/mail.svg`).
- **Links** become buttons automatically when you make the link text **bold** (primary)
  or *italic* (secondary). Bold + italic = accent.
- **Page metadata** is a table named `Metadata` with one key/value row per setting.

> Tip: in da.live you can preview any document by appending nothing — the page renders
> at `https://main--aemeds-mxtraining--josea-deloitte.aem.page/<path>`. Use `.plain.html`
> on the URL to inspect the raw block markup the developer code receives.

---

## 1. Header — the `/nav` document

The header is **not** authored on each page. It is a single shared document at **`/nav`**
(create a page named `nav` at the site root). The `header` block fetches it as a fragment.

`/nav` is made of **four sections** separated by `---`, in this exact order. The code
labels them `utility`, `brand`, `sections`, `tools`. If you author only three sections,
the first one is treated as `brand` (the utility strip is skipped) — so keep all four for
the full VYEPTI header.

### Section 1 — Utility strip (teal bar)

Author as **default content** (no block table):

1. A **paragraph** with the indication line, e.g.
   `For the preventive treatment of migraine in adults.`
2. A **bulleted list** where each item is one utility entry:
   - An item that **contains a nested (indented) bullet list** becomes a **dropdown**.
     The top text is the button label; the nested links are the menu.
   - A plain link item stays a plain link.
   - An item holding **several icon links** becomes the **social row**.

Example (indentation = nested list):

```
For the preventive treatment of migraine in adults.

- Patient Information
  - [Patient Information](https://.../vyepti_ppi_us_en.pdf)
  - [Información del Paciente](https://.../vyepti_ppi_us_es.pdf)
- Prescribing Information
  - [Prescribing Information](https://.../vyepti_pi_us_en.pdf)
  - [Información de Prescripción](https://.../vyepti_pi_us_es.pdf)
- [Healthcare Provider Site](https://www.vyeptihcp.com)
- :facebook-white: [Facebook](https://www.facebook.com/VYEPTI) :instagram-white: [Instagram](https://instagram.com/vyepti_eptinezumab_jjmr) :youtube-white: [YouTube](https://www.youtube.com/@VYEPTIUS) :tiktok-white: [TikTok](https://www.tiktok.com/@vyepti)
```

> Use the **`-white`** social icons here (`:facebook-white:`, `:instagram-white:`,
> `:youtube-white:`, `:tiktok-white:`) so they show correctly on the teal background.
> The visible link text ("Facebook", etc.) is kept for screen readers and hidden visually.

### Section 2 — Brand (logo)

A single paragraph: the **VYEPTI logo icon linked to the homepage**. Put readable text in
the link (it becomes the accessible label, hidden visually):

```
[:logo-vyepti: VYEPTI® (eptinezumab-jjmr) home](/)
```

### Section 3 — Main navigation (pill bar)

A single **bulleted list**. Top-level items are the pill tabs; an item with a nested list
becomes a dropdown. Plain top-level items (like Home) are simple links.

```
- [Home](/)
- Why VYEPTI
  - [Could VYEPTI Be Right for You?](/could-vyepti-be-right-for-you)
  - [How VYEPTI Works](/how-vyepti-works)
  - [Why IV Treatment](/why-iv-treatment)
- Results on VYEPTI
  - [Clinical Studies](/vyepti-study-results)
  - [VYEPTI in Real Life](/real-life-impact)
  - [Side Effects](/vyepti-side-effects)
- Getting Treatment
  - [Create a Discussion Guide](/doctor-discussion-guide)
  - [What to Expect During Treatment](/what-to-expect)
  - [Your Insurance Coverage & VYEPTI](/vyepti-insurance-coverage)
  - [Infusion Locator](/vyepti-locator)
- Savings & Support
  - [Financial Assistance](/financial-assistance)
  - [Nurse Support](/nurse-support)
- Migraine Community
  - [Patient Stories](/real-patient-stories)
  - [Share Your Migraine Story](/share-your-migraine-story)
- Resources
  - [Downloadable Resources](/downloadable-resources)
  - [Sign Up](/stay-connected)
  - [FAQ](/vyepti-faq)
```

### Section 4 — Tools (quick links)

A **bulleted list** of icon + link, one per item:

```
- :mail: [Sign Up](/stay-connected)
- :locator: [Infusion Locator](/vyepti-locator)
- :savings: [Savings](/financial-assistance)
```

---

## 2. Footer — the `/footer` document

Also a shared fragment, authored once at **`/footer`**. **Three sections** separated by
`---`, labeled `legal`, `info`, `brand`.

### Section 1 — Legal links strip (teal bar)

A single bulleted list:

```
- [Site Map](/site-map)
- [Terms of Use](https://www.lundbeck.com/us/terms-of-use)
- [Privacy Policy](https://www.lundbeck.com/us/privacy-policy)
- [Contact Us](https://www.lundbeck.com/us/contact)
```

### Section 2 — Assistance & legal copy

Default content paragraphs. The **bold tel link** auto-converts to the magenta call
button (the phone icon is added by code):

```
For assistance, call

**[1-833-4-VYEPTI](tel:18334893784)**

© 2026 Lundbeck. All rights reserved. VYEPTI and VYEPTI CONNECT are registered trademarks of Lundbeck Seattle BioPharmaceuticals, Inc. EPT-B-101058v8

The product information provided in this site is intended only for residents of the US. The health information contained herein is provided for educational purposes only and is not intended to replace discussions with a healthcare provider.
```

### Section 3 — Social icons & Lundbeck logo

A bulleted list of social icon links, then the linked Lundbeck logo paragraph. Use the
**teal** social icons here (no `-white` suffix) — the footer background is light:

```
- :facebook: [Facebook](https://www.facebook.com/VYEPTI)
- :instagram: [Instagram](https://instagram.com/vyepti_eptinezumab_jjmr)
- :youtube: [YouTube](https://www.youtube.com/@VYEPTIUS)
- :tiktok: [TikTok](https://www.tiktok.com/@vyepti)

[:lundbeck: Lundbeck](https://www.lundbeck.com/us)
```

---

## 3. Alert strip — a per-page block

Unlike header/footer, this is authored **on the page** wherever you want the strip. Insert
a **block table** named `Alert Strip` with **one row and two cells**:

| Alert Strip |||
| --- | --- |
| `:information:` | **Need help getting started on VYEPTI? Call [833-4-VYEPTI](tel:8334893784) (833-489-3784).** |

- **Left cell**: a single icon (decorative — hidden from screen readers automatically).
- **Right cell**: rich text. Bold it for emphasis; the `tel:` link stays a normal
  inline link (it does **not** turn into a button because it's mixed with other text).

The icon cell is **optional** — if you author a single cell with just text, the strip
renders text-only and still works.

---

## 4. Pointing pages at the fragments (optional)

By default the header reads from `/nav` and the footer from `/footer`. To use a different
location for a specific page (e.g. a localized `/es/nav`), add a **Metadata** block to that
page:

| Metadata |||
| --- | --- |
| nav | /es/nav |
| footer | /es/footer |

Most pages need nothing here — the defaults apply.

---

## Available icons

These SVGs exist in `/icons` and can be referenced with `:name:`:

| Reference | Use |
| --- | --- |
| `:logo-vyepti:` | VYEPTI brand logo (header) |
| `:lundbeck:` | Lundbeck corporate logo (footer) |
| `:mail:` `:locator:` `:savings:` | Header tool links |
| `:information:` | Alert strip |
| `:call:` | Phone (added automatically on the footer call button) |
| `:facebook:` `:instagram:` `:youtube:` `:tiktok:` | Social — **teal**, for light backgrounds (footer) |
| `:facebook-white:` `:instagram-white:` `:youtube-white:` `:tiktok-white:` | Social — **white**, for the teal utility strip (header) |
| `:search:` | Search (reserved for future search box) |

Need a new icon? Ask a developer to add an optimized SVG to `/icons` — then `:name:` works.

---

## Quick checklist

- [ ] `/nav` has 4 sections (`---` between): utility, brand, sections, tools.
- [ ] `/footer` has 3 sections: legal links, assistance + copy, social + logo.
- [ ] Header social icons use `-white`; footer social icons do not.
- [ ] Logo links wrap real text (becomes the accessible label).
- [ ] Tel/phone links: **bold** in the footer (button), plain inside the alert strip.
- [ ] Preview the page and tab through the nav to confirm dropdowns open via keyboard.
