# da.live Library & Icons Setup

This covers two related things:

1. **Why `facebook-white.svg` (and the other new icons) return 404** — and how to fix it.
2. **How to register all icons in the da.live Library** so authors can browse and insert
   them from the **Library → Icons** panel.

---

## 1. Fixing the 404 on icons

### How EDS resolves icons

When an author writes `:facebook-white:`, the page renders a `<span class="icon
icon-facebook-white">`, and `decorateIcons()` in `scripts/aem.js` turns it into:

```html
<img src="/icons/facebook-white.svg" .../>
```

That `/icons/*.svg` request is served **from the code branch the page is rendered
through** — not from da.live content. So the file must exist in the `icons/` folder of
*that* branch.

### Why it 404s right now

The new icons (`facebook-white.svg`, `instagram-white.svg`, `youtube-white.svg`,
`tiktok-white.svg`, `call.svg`, `logo-vyepti.svg`, `lundbeck.svg`, …) were committed to the
**`main-fresh`** branch in [PR #1](https://github.com/josea-deloitte/aemeds-mxtraining/pull/1),
which is **not merged yet**.

The da.live editor preview and the default site render through the **`main`** ref
(`https://main--aemeds-mxtraining--josea-deloitte.aem.page`). On `main`, those files don't
exist yet → **404**. (The pre-existing `facebook.svg` etc. resolve because they were already
on `main`; only the brand-new files 404 — which matches the error you saw.)

### The fix

Pick one:

- **Merge PR #1 to `main`.** Once AEM Code Sync processes the merge, `/icons/*.svg`
  resolves on the main environment and the 404s disappear everywhere. ✅ recommended.
- **Test before merging** by viewing the page on the branch preview, where the icons
  already exist:
  `https://main-fresh--aemeds-mxtraining--josea-deloitte.aem.page/<path>`

> There is nothing wrong with the SVG files themselves — they're valid and optimized. The
> 404 is purely "the file isn't on the branch the page is being rendered through yet."

---

## 2. Registering icons in the da.live Library

da.live Library extensions are **not** configured in the code repo. They live in your
project's **DA config sheet** plus an **icons sheet**, both authored in da.live. Here's the
exact setup.

> Replace **`josea-deloitte`** (org) and **`aemeds-mxtraining`** (site) below if your DA
> org/site differ from the GitHub `owner/repo`.

### Step A — Create the icons sheet

1. Open: `https://da.live/sheet#/josea-deloitte/aemeds-mxtraining/docs/library/icons`
   (this creates a sheet document at `/docs/library/icons`).
2. Name the sheet tab **`icons`**.
3. Add **three columns** with these exact headers: **`key`**, **`value`**, **`icon`**.
   - **`key`** — the token inserted into the document. Must be in `:name:` form.
   - **`value`** — the display label shown in Library → Icons.
   - **`icon`** — the absolute URL to the SVG.
4. Paste these 16 rows (one per icon in `/icons`):

| key | value | icon |
| --- | --- | --- |
| `:call:` | Phone / Call | https://main--aemeds-mxtraining--josea-deloitte.aem.live/icons/call.svg |
| `:facebook:` | Facebook (teal) | https://main--aemeds-mxtraining--josea-deloitte.aem.live/icons/facebook.svg |
| `:facebook-white:` | Facebook (white) | https://main--aemeds-mxtraining--josea-deloitte.aem.live/icons/facebook-white.svg |
| `:information:` | Information | https://main--aemeds-mxtraining--josea-deloitte.aem.live/icons/information.svg |
| `:instagram:` | Instagram (teal) | https://main--aemeds-mxtraining--josea-deloitte.aem.live/icons/instagram.svg |
| `:instagram-white:` | Instagram (white) | https://main--aemeds-mxtraining--josea-deloitte.aem.live/icons/instagram-white.svg |
| `:locator:` | Infusion Locator | https://main--aemeds-mxtraining--josea-deloitte.aem.live/icons/locator.svg |
| `:logo-vyepti:` | VYEPTI logo | https://main--aemeds-mxtraining--josea-deloitte.aem.live/icons/logo-vyepti.svg |
| `:lundbeck:` | Lundbeck logo | https://main--aemeds-mxtraining--josea-deloitte.aem.live/icons/lundbeck.svg |
| `:mail:` | Mail / Sign Up | https://main--aemeds-mxtraining--josea-deloitte.aem.live/icons/mail.svg |
| `:savings:` | Savings | https://main--aemeds-mxtraining--josea-deloitte.aem.live/icons/savings.svg |
| `:search:` | Search | https://main--aemeds-mxtraining--josea-deloitte.aem.live/icons/search.svg |
| `:tiktok:` | TikTok (teal) | https://main--aemeds-mxtraining--josea-deloitte.aem.live/icons/tiktok.svg |
| `:tiktok-white:` | TikTok (white) | https://main--aemeds-mxtraining--josea-deloitte.aem.live/icons/tiktok-white.svg |
| `:youtube:` | YouTube (teal) | https://main--aemeds-mxtraining--josea-deloitte.aem.live/icons/youtube.svg |
| `:youtube-white:` | YouTube (white) | https://main--aemeds-mxtraining--josea-deloitte.aem.live/icons/youtube-white.svg |

5. **Preview/Publish the sheet** (Sidekick → Preview, then Publish) so its JSON endpoint
   is live at:
   `https://main--aemeds-mxtraining--josea-deloitte.aem.live/docs/library/icons.json`

> **Icon URL note:** these point at the `main` **live** code environment, so they resolve
> *after PR #1 is merged* (same dependency as the page 404). To see the icons in the
> Library *before* merging, temporarily swap `main--…aem.live` for
> `main-fresh--…aem.page` in the `icon` column.

### Step B — Register the sheet in the DA config

1. Open the config: `https://da.live/config#/josea-deloitte/aemeds-mxtraining/`
2. Add (or open) a tab named **`library`** with columns: **`title`**, **`path`**,
   **`format`**, **`ref`**, **`icon`**, **`experience`**.
3. Add this row for icons:

| title | path | format | ref | icon | experience |
| --- | --- | --- | --- | --- | --- |
| Icons | https://main--aemeds-mxtraining--josea-deloitte.aem.live/docs/library/icons.json | | `:<content>:` | | |

   - **`title`** = `Icons` → the entry name in the Library panel.
   - **`path`** = the published JSON URL of the icons sheet from Step A.
   - **`ref`** = `:<content>:` → tells da.live to insert the `key` wrapped as a token.
   - Leave `format`, `icon`, `experience` blank for icons.

4. **Preview/Publish the config sheet.**

> **Simpler alternative:** some projects use a plain key/value config tab instead, with a
> single row `library-icons` → the icons.json URL. Either works; the `library`-tab form
> above is the current documented approach and also lets you register blocks/templates.

### Step C — Verify

1. Reopen any document in da.live.
2. Open the **Library** panel (left rail) → you'll now see an **Icons** entry.
3. Click it → all 16 icons appear with their labels → clicking one inserts the `:name:`
   token at the cursor.

---

## While you're in the config: register the blocks too

The same `library` tab can surface the project's blocks so authors insert them from the
Library instead of typing table names. Point `path` at a **block library document** (a page
containing one example of each block — `header`, `footer`, `alert-strip`, etc.):

| title | path | format | ref | icon | experience |
| --- | --- | --- | --- | --- | --- |
| Blocks | https://main--aemeds-mxtraining--josea-deloitte.aem.live/docs/library/blocks | | | | |

Create that page at `/docs/library/blocks` with one authored sample of each block (you can
copy the structures from [authoring-guide.md](authoring-guide.md)), then preview/publish it.

---

## Summary

| Symptom | Cause | Fix |
| --- | --- | --- |
| `*.svg` 404 on the page | New icons only on `main-fresh`, page renders through `main` | Merge PR #1 (or preview on `main-fresh--…aem.page`) |
| Library panel empty | No DA Library config exists for this site | Create `icons` sheet + `library` config tab (Steps A–B) |
| Icons missing in Library only | `icon` URLs point at `main` before merge | Use `main-fresh--…aem.page` URLs until merged |

Sources:
[da.live — Setup library](https://docs.da.live/administrators/guides/setup-library) ·
[Adobe Ref Demo — Setting up Library extensions](https://referencedemo.adobe.com/document-authoring-with-da/setting-up-library-extensions) ·
[aem-sandbox block-collection icons.json example](https://github.com/aemsites/da-blog-tools/blob/main/tools/plugins/da-library/README.md)
