# Content Authoring Guide (da.live)

How to author the **header**, **footer**, the **homepage** (split hero, alert strip,
feature cards, patient-quote carousel, callout cards), and the other reusable content
blocks for this project in the [da.live](https://da.live) editor.

This guide assumes you are editing documents in da.live (Document Authoring), where:

- **Blocks** are tables. The first row is a single merged cell holding the **block
  name** (optionally a variant in parentheses, e.g. `Columns (center)`).
- **Sections** are separated by a horizontal rule — type `---` on its own line, or use
  the divider in the toolbar.
- **Icons** are written as `:name:` and resolve to the matching SVG in `/icons`
  (e.g. `:mail:` → `/icons/mail.svg`).
- **Links** become buttons automatically when you make the link text **bold** (primary)
  or _italic_ (secondary). Bold + italic = accent.
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

> **Known content fixes for the live `/footer` document** (compared against
> vyepti.com — these are authoring corrections, the block code is already correct):
>
> 1. **TikTok link typo.** The TikTok link currently renders as
>    `ttps://www.tiktok.com/@vyepti` (missing the leading `h`). Re-paste the link as
>    `https://www.tiktok.com/@vyepti`.
> 2. **Missing "Cookie Settings" link.** The live legal strip reads
>    _Site Map · Terms of Use · Privacy Policy · **Cookie Settings** · Contact Us_.
>    "Cookie Settings" re-opens the **Usercentrics** consent manager (`uc.js`), which
>    is not navigation — it must call the consent SDK. Add the list item where shown,
>    but it needs a small JS hook **and** the consent SDK wired in `scripts/delayed.js`
>    first (today that's only a placeholder comment). Ask a developer before authoring
>    it, otherwise the link will 404. Suggested authored form once wired:
>    `- [Cookie Settings](#cookie-settings)` between Privacy Policy and Contact Us.

---

## 3. Alert strip — a per-page block

Unlike header/footer, this is authored **on the page** wherever you want the strip. Insert
a **block table** named `Alert Strip` with **one row and two cells**:

| Alert Strip     |                                                                                              |     |
| --------------- | -------------------------------------------------------------------------------------------- | --- |
| `:information:` | **Need help getting started on VYEPTI? Call [833-4-VYEPTI](tel:8334893784) (833-489-3784).** |

- **Left cell**: a single icon (decorative — hidden from screen readers automatically).
- **Right cell**: rich text. Bold it for emphasis; the `tel:` link stays a normal
  inline link (it does **not** turn into a button because it's mixed with other text).

The icon cell is **optional** — if you author a single cell with just text, the strip
renders text-only and still works.

---

## 4. Homepage — assembling the page

The homepage (`/`, the **index** document) is built from **five blocks**, each in its
own section (separated by `---`), in this exact order. Header, footer, and the ISI are
**global** and must **not** be authored on the page.

| #   | Section block    | What it is                                                     |
| --- | ---------------- | -------------------------------------------------------------- |
| 1   | `Columns Hero`   | Split two-panel hero banner (image + headline + CTA per panel) |
| 2   | `Alert Strip`    | Teal call-out strip ("Need help getting started…")             |
| 3   | `Cards Feature`  | 3-up text-and-image feature grid                               |
| 4   | `Carousel Quote` | Patient-quotes carousel (one slide per patient)                |
| 5   | `Cards Callout`  | 2-up text-only call-out cards with CTAs                        |

> **Current gap:** the live authored homepage still uses the generic `Hero` and
> `Columns` blocks and is **missing the carousel and the callout cards**. To match
> vyepti.com, re-author the page using the five blocks above (the purpose-built blocks
> and their importer parsers already exist). The sections below give each block's table.

---

### 4.1 Columns Hero (split hero) — base block: `columns`

Two side-by-side teaser panels. **One row, two cells** (one cell per panel). Within a
cell, stack: image, then a heading + subtext, then an **optional CTA** (make the link
**bold** to render it as a button), then an optional _Actor portrayal_ disclaimer
(italic). The left panel typically has no CTA; the right panel does.

| Columns Hero                                                                                                                                                          |                                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ![left panel image](./media_left.png)<br>## Does migraine keep stealing the spotlight?<br>Learn about possible signs it may be time to ask about a preventive option. | ![right panel image](./media_right.png)<br>## Say yep to a preventive treatment<br>VYEPTI is given by IV infusion every 3 months.<br>**[See if VYEPTI is right for you](/could-vyepti-be-right-for-you)**<br>_Actor portrayal_ |

- A column whose **only** content is an image is reordered above the text on mobile.
- The block auto-adds a `columns-hero-2-cols` class based on the number of cells.

---

### 4.2 Alert Strip — base block: `alert-strip`

A one-row strip on the light-teal band. **One row, up to two cells**: an optional icon
cell and the message cell.

| Alert Strip     |                                                                                              |
| --------------- | -------------------------------------------------------------------------------------------- |
| `:information:` | **Need help getting started on VYEPTI? Call [833-4-VYEPTI](tel:8334893784) (833-489-3784).** |

- Left cell: a single icon (decorative, hidden from screen readers automatically).
- Right cell: rich text; the `tel:` link stays an inline link (it is **not** turned
  into a button because it is mixed with other text).
- The icon cell is optional — a single-cell row renders text-only.

> The project also ships an equivalent block named **`Vyepti Homepage Call Cta`**
> (`call-cta`) with identical authoring. Prefer **`Alert Strip`** for new content — it
> is the homepage importer's target and keeps naming consistent.

---

### 4.3 Cards Feature (3-up grid) — base block: `cards`

A row of feature cards. **Two columns, one row per card.** Cell 1 is the image/icon;
cell 2 is the text (heading, one or more description paragraphs, optional CTA).
Author **three rows** for the 3-up homepage grid.

| Cards Feature          |                                                                                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![icon](./media_1.png) | ### Say yep to more migraine-free days<br>Migraine prevention proven to last 3 months in clinical studies.<br>**[Learn more](/how-vyepti-works)** |
| ![icon](./media_2.png) | ### Understanding VYEPTI side effects<br>See the most common side effects.<br>**[See side effects](/vyepti-side-effects)**                        |
| ![icon](./media_3.png) | ### Ask your doctor if VYEPTI could be a yep for you<br>Start the conversation.<br>**[Create a discussion guide](/doctor-discussion-guide)**      |

- Cells holding only an image become the card image; the rest become the card body.
- Card images are auto-optimized to 750px wide.

---

### 4.4 Carousel Quote (patient testimonials) — base block: `carousel`

A rotating set of patient quotes. **Two columns, one row per slide.** Cell 1 is the
patient portrait (image only); cell 2 is the quote (as a heading), then the
attribution, an individual-results disclaimer, and an optional CTA.

| Carousel Quote                      |                                                                                                                                                         |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![patient portrait](./media_p1.png) | ## "VYEPTI gave me back my mornings."<br>Tara, real VYEPTI patient<br>_Individual results may vary._<br>**[Watch Tara's story](/real-patient-stories)** |
| ![patient portrait](./media_p2.png) | ## "I have more good days now."<br>Marcus, real VYEPTI patient<br>_Individual results may vary._<br>**[Watch Marcus's story](/real-patient-stories)**   |

- Add one row per patient. With a single row the carousel renders as a static slide
  (no arrows/indicators).
- Prev/next arrows, slide indicators, and keyboard/ARIA wiring are added by code.

---

### 4.5 Cards Callout (2-up text cards) — base block: `cards`

Two text-only call-out cards (no card image). **One column, one row per card.** Each
cell stacks an eyebrow (h4), a headline (h2), a description, and a CTA (**bold** link).
Author **two rows**.

| Cards Callout                                                                                                                                                                      |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| #### Savings & Support<br>## See if you could pay as little as $0\*<br>Eligible, commercially insured patients may save on VYEPTI.<br>**[Explore savings](/financial-assistance)** |
| #### Stay connected<br>## Sign up for VYEPTI updates<br>Get helpful information and support sent to your inbox.<br>**[Sign up](/stay-connected)**                                  |

- These cards carry no image (only the CTA), so author a single content cell per row.

---

## 5. Other content blocks

These blocks are available for interior pages (and some power the homepage's generic
fallbacks). All are authored as block tables unless noted.

### Hero (full-width banner)

**Auto-blocked** — you usually don't author a `Hero` table. If the **first section** of
a page starts with a picture immediately followed (or preceded) by an `# H1`, EDS builds
a hero automatically (full-width background image with the heading overlaid). To force
one, author a single-cell `Hero` block containing the image and the `# H1`.

### Columns (generic multi-column) — variant: `(cards)`

General N-column layout. **One row per visual row; one cell per column.** The block
auto-adds `columns-{n}-cols`. An image-only column is reordered above text on mobile.

| Columns                       |                       |
| ----------------------------- | --------------------- |
| ## Left heading<br>Body copy. | ![image](./media.png) |

Add the **`cards`** variant — `Columns (cards)` — to style each column as a bordered,
shadowed card with centered brand-colored text.

### Cards (generic grid)

Responsive card grid. **One row per card.** A cell containing only an image becomes the
card image; other cells become the card body (heading, text, links).

| Cards                 |                                                              |
| --------------------- | ------------------------------------------------------------ |
| ![image](./media.png) | ### Title<br>Description text and an optional [link](/path). |

### Quote (single testimonial)

A static pull-quote with portrait. **One row, two cells.** Cell 1: three paragraphs —
the quote, the author, and a disclaimer (in that order). Cell 2: the portrait image.

| Quote                                                                                            |                          |
| ------------------------------------------------------------------------------------------------ | ------------------------ |
| "This treatment changed my routine."<br>— Jordan, real patient<br>_Individual results may vary._ | ![portrait](./media.png) |

### ISI (Important Safety Information)

Regulated safety content. **One cell of rich text**: `##### H5` sub-headings, paragraphs,
and bulleted lists (Approved Use, Important Safety Information, contraindications, common
side effects, FDA MedWatch reporting). The block renders both an inline panel and a
sticky bottom band that expands/collapses and docks when the inline panel scrolls into
view. PDF links inside open in a new tab automatically.

**Match vyepti.com's emphasis:** the source ISI **bolds the lead-in** of each item — the
opening phrase of every safety statement and bullet, and the full FDA-reporting and
"For more information…" paragraphs. Keep that bolding so the block matches the live site:

```
##### IMPORTANT SAFETY INFORMATION

**Do not receive VYEPTI** if you have a known allergy to eptinezumab-jjmr or its ingredients.

**VYEPTI may cause serious side effects such as:**

- **Allergic reactions.** Call your healthcare provider …
- **High blood pressure.** High blood pressure or worsening …
- **Raynaud's phenomenon.** A type of circulation problem …

**Before starting VYEPTI,** tell your healthcare provider …
**Tell your healthcare provider** about all the medicines you take …
**The most common side effects** of VYEPTI include …
**You are encouraged to report negative side effects … Visit [www.fda.gov/medwatch](https://www.fda.gov/medwatch) or call 1-800-FDA-1088.**
**For more information, please see the [Prescribing Information](…pi.pdf) and [Patient Information](…ppi.pdf).**
```

The canonical content lives in one shared fragment (e.g. `/fragments/isi`) — see
[drafts/fragments/isi.plain.html](../drafts/fragments/isi.plain.html) for the exact,
fully-bolded reference markup.

Because the ISI is identical site-wide, maintain it **once as a shared fragment** (e.g.
`/fragments/isi`) and include it with the `Fragment` block, rather than re-authoring it
per page.

### Fragment (reusable content include)

**One cell** containing a single link to another document's path. That document's
content is fetched and rendered in place. Use for shared content (ISI, promo blocks).

| Fragment                         |
| -------------------------------- |
| [/fragments/isi](/fragments/isi) |

### Widget (external embed) — developer-assisted

**One cell** with a link to a widget entry file under `/widgets/…/name.html`. The block
lazy-loads that widget's HTML/CSS/JS. Requires a developer to add the widget assets.

| Widget                                                         |
| -------------------------------------------------------------- |
| [/widgets/locator/locator.html](/widgets/locator/locator.html) |

---

## 6. Pointing pages at the fragments (optional)

By default the header reads from `/nav` and the footer from `/footer`. To use a different
location for a specific page (e.g. a localized `/es/nav`), add a **Metadata** block to that
page:

| Metadata |            |     |
| -------- | ---------- | --- |
| nav      | /es/nav    |
| footer   | /es/footer |

Most pages need nothing here — the defaults apply.

---

## Available icons

These SVGs exist in `/icons` and can be referenced with `:name:`:

| Reference                                                                 | Use                                                     |
| ------------------------------------------------------------------------- | ------------------------------------------------------- |
| `:logo-vyepti:`                                                           | VYEPTI brand logo (header)                              |
| `:lundbeck:`                                                              | Lundbeck corporate logo (footer)                        |
| `:mail:` `:locator:` `:savings:`                                          | Header tool links                                       |
| `:information:` `:mobile:`                                                | Alert strip / nurse callout                             |
| `:call:`                                                                  | Phone (added automatically on the footer call button)   |
| `:facebook:` `:instagram:` `:youtube:` `:tiktok:`                         | Social — **teal**, for light backgrounds (footer)       |
| `:facebook-white:` `:instagram-white:` `:youtube-white:` `:tiktok-white:` | Social — **white**, for the teal utility strip (header) |
| `:search:`                                                                | Search (reserved for future search box)                 |

Need a new icon? Ask a developer to add an optimized SVG to `/icons` — then `:name:` works.

---

## Quick checklist

- [ ] `/nav` has 4 sections (`---` between): utility, brand, sections, tools.
- [ ] `/footer` has 3 sections: legal links, assistance + copy, social + logo.
- [ ] Header social icons use `-white`; footer social icons do not.
- [ ] Logo links wrap real text (becomes the accessible label).
- [ ] Tel/phone links: **bold** in the footer (button), plain inside the alert strip.
- [ ] Footer `/footer` TikTok link starts with `https://` (not `ttps://`).
- [ ] Homepage has the 5 sections in order: Columns Hero, Alert Strip, Cards Feature,
      Carousel Quote, Cards Callout — and does **not** author the header, footer, or ISI.
- [ ] CTAs you want as buttons are **bold** links; secondary buttons are _italic_.
- [ ] Preview the page and tab through the nav to confirm dropdowns open via keyboard.
