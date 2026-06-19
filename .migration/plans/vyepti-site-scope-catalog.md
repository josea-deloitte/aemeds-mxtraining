# Site Scope & Catalog Plan — vyepti.com

## Objective
Perform a full-site scope analysis of `https://www.vyepti.com/`: discover every URL, group pages into distinct templates, catalog block layouts and navigation patterns, and produce an interactive catalog plus a migration scope report to plan the EDS migration.

## Scope & Decisions (confirmed)
- **Breadth:** Full site — discover all URLs, then group into templates.
- **Discovery method:** Sitemap-first (`sitemap.xml`), fall back to crawling links if the sitemap is missing or incomplete.
- **Deliverables:** Page templates, block layouts, navigation patterns, and a migration scope report.

## Approach
This runs the site-scope workflow, which orchestrates URL discovery → page analysis → template/block cataloging → scope reporting. Note: `vyepti.com` is a regulated pharmaceutical product site, so it likely has an interstitial/age or ISI (Important Safety Information) gate and heavy legal/footer content — discovery may need to account for that.

## Checklist
- [ ] Confirm target site reachable and locate `sitemap.xml` (fall back to homepage crawl if absent)
- [ ] Discover and collect the full list of site URLs
- [ ] De-duplicate and normalize URLs; flag any gated/interstitial pages (ISI, age/consent gates)
- [ ] Analyze pages to extract content structure, sections, and section/block boundaries
- [ ] Group similar pages into distinct **page templates** (e.g., homepage, content/article, ISI, contact, sitemap)
- [ ] Catalog **unique block layouts** used across pages (hero, cards, columns, alert-strip, widgets, etc.)
- [ ] Document **navigation patterns** — header/nav, megamenu (if any), footer, utility links, ISI banner
- [ ] Map discovered structures against existing project blocks (`alert-strip, cards, columns, hero, fragment, widget, header, footer`) to note reuse vs. new variants
- [ ] Generate the **interactive site catalog** (browsable view of templates + representative pages + screenshots)
- [ ] Produce the **migration scope report** (template counts, page counts per template, block inventory, effort/risk notes)
- [ ] Review the catalog together and identify the recommended migration order

## Deliverables
- Interactive site catalog grouping URLs into templates with representative examples and screenshots
- Block layout inventory across the site
- Navigation pattern documentation (header / footer / ISI)
- Migration scope report summarizing structure, counts, and effort estimate

## Next Step
Execution requires Execute mode. On approval, I'll run the full site-scope workflow against `https://www.vyepti.com/` starting with sitemap discovery.
