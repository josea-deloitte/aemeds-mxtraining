/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-content-page.js
  var import_content_page_exports = {};
  __export(import_content_page_exports, {
    default: () => import_content_page_default
  });

  // tools/importer/parsers/columns-hero.js
  function parse(element, { document }) {
    let columns = Array.from(element.querySelectorAll(':scope .row > [class*="col-"]'));
    if (!columns.length) {
      columns = Array.from(element.querySelectorAll(":scope .cmp-teaser"));
    }
    if (!columns.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const rowCells = columns.map((col) => {
      const teaser = col.querySelector(".cmp-teaser") || col;
      const cellContent = [];
      const picture = teaser.querySelector(".cmp-teaser__image picture, picture");
      const img = teaser.querySelector(".cmp-teaser__image img, img");
      if (picture) cellContent.push(picture);
      else if (img) cellContent.push(img);
      const description = teaser.querySelector(".cmp-teaser__description");
      if (description) cellContent.push(description);
      const ctaLink = teaser.querySelector(".cmp-teaser__action-container a, .cmp-teaser__action-link");
      if (ctaLink) cellContent.push(ctaLink);
      const secondary = teaser.querySelector(".cmp-teaser__description__secondary");
      if (secondary) cellContent.push(secondary);
      return cellContent;
    });
    const cells = [rowCells];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-hero", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-feature.js
  function parse2(element, { document }) {
    const cards = Array.from(element.querySelectorAll(':scope .row > [class*="col-"]'));
    if (!cards.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = cards.map((card) => {
      const scope = card.querySelector(".boxed-parsys") || card;
      const picture = scope.querySelector(".img-wrapper picture, picture");
      const img = scope.querySelector(".img-wrapper img, img");
      const imageCell = [];
      if (picture) imageCell.push(picture);
      else if (img) imageCell.push(img);
      const textCell = [];
      const heading = scope.querySelector(".description-after h2, .description-after h3, h2, h3");
      if (heading) textCell.push(heading);
      const descriptions = Array.from(scope.querySelectorAll(".description-after p"));
      descriptions.forEach((p) => textCell.push(p));
      const cta = scope.querySelector(".boxed-link a, a.button-ghost-cta");
      if (cta) textCell.push(cta);
      return [imageCell, textCell];
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-diagram.js
  function parse3(element, { document }) {
    const textPanel = element.querySelector(
      ".carousalLeftWrapper .rteComponent, .carousalLeftWrapper"
    );
    const diagramPanel = element.querySelector(".vyepti-works-gif");
    if (!textPanel && !diagramPanel) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const leftCell = [];
    if (textPanel) {
      leftCell.push(...Array.from(textPanel.children));
    }
    const rightCell = [];
    if (diagramPanel) {
      const picture = diagramPanel.querySelector(".cmp-teaser__image picture, picture");
      const img = diagramPanel.querySelector(".cmp-teaser__image img, img");
      if (picture) rightCell.push(picture);
      else if (img) rightCell.push(img);
      const legend = diagramPanel.querySelector("ul");
      if (legend) rightCell.push(legend);
    }
    const cells = [[leftCell, rightCell]];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-diagram", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-callout.js
  function parse4(element, { document }) {
    let cards = Array.from(element.querySelectorAll(':scope .row > [class*="col-"]'));
    const isNarrowCard = element.querySelector(".narrow-card") && element.querySelector(".cta-component");
    if (isNarrowCard || !cards.length) {
      cards = [element];
    }
    const cells = cards.map((card) => {
      const scope = card.querySelector(".bgcard-parsys") || card;
      const cardContent = [];
      const description = scope.querySelector(".description-after, .rteComponent");
      if (description) cardContent.push(description);
      const cta = scope.querySelector(".boxed-link a, .cta-component a, a.button-primary");
      if (cta) cardContent.push(cta);
      return [cardContent];
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-callout", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-quote.js
  function parse5(element, { document }) {
    const slides = Array.from(element.querySelectorAll(".slick-slide")).filter((slide) => !slide.classList.contains("slick-cloned"));
    if (!slides.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = slides.map((slide) => {
      const portrait = slide.querySelector("img.vyepti-patient-image");
      const imageCell = [];
      if (portrait) {
        const portraitPicture = portrait.closest("picture");
        imageCell.push(portraitPicture || portrait);
      }
      const textCell = [];
      const rteComponent = slide.querySelector(".rteComponent");
      if (rteComponent) {
        const heading = rteComponent.querySelector("h2, h3");
        if (heading) textCell.push(heading);
        const paragraphs = Array.from(rteComponent.querySelectorAll(":scope > p"));
        paragraphs.forEach((p) => textCell.push(p));
      }
      return [imageCell, textCell];
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-quote", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/vyepti-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#cookie-information-template-wrapper",
        ".interstitialmodal",
        ".popupinterstitialmodal",
        "#external-link-modal",
        "#patient-site-modal",
        "#prescription-modal"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".cmp-experiencefragment--header",
        "header.header-section",
        ".cmp-experiencefragment--isi",
        "#isi",
        // Footer: the homepage nests it under .footer.iparsys.parsys, but the
        // content-page footer lives in the footer experience fragment / <footer id="footer">.
        // Cover both so the footer never leaks into content.
        ".footer.iparsys.parsys",
        ".cmp-experiencefragment--footer",
        "footer#footer",
        "div.teaser.aem-GridColumn:empty"
      ]);
      Array.from(element.querySelectorAll('a[href="#"]')).forEach((a) => {
        if (!a.querySelector("img, picture") && /^[_\s]*$/.test(a.textContent || "")) {
          a.remove();
        }
      });
      Array.from(element.querySelectorAll("img[src]")).forEach((img) => {
        if (/googleadservices\.com|bat\.bing\.com|px\.deepintent\.com/i.test(img.getAttribute("src") || "")) {
          const pic = img.closest("picture");
          (pic || img).remove();
        }
      });
      WebImporter.DOMUtils.remove(element, [
        "source",
        "link",
        "noscript",
        "iframe",
        "style"
      ]);
    }
  }

  // tools/importer/import-content-page.js
  var parsers = {
    "columns-hero": parse,
    "cards-feature": parse2,
    "columns-diagram": parse3,
    "cards-callout": parse4,
    "carousel-quote": parse5
  };
  var transformers = [
    transform
  ];
  var PAGE_TEMPLATE = {
    name: "content-page",
    description: "VYEPTI content page (requested as about-vyepti, which redirects to how-vyepti-works on the live site): sub-banner teaser hero, 3-up icon feature columns, content section with CGRP diagram, narrow CTA card, patient-quotes carousel, and a 2-up CTA card row. Global header, footer, and ISI handled separately.",
    urls: [
      "https://www.vyepti.com/how-vyepti-works"
    ],
    blocks: [
      {
        name: "columns-hero",
        instances: ["body > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.teaser.sub-banner-teaser.aem-GridColumn.aem-GridColumn--default--12"]
      },
      {
        name: "cards-feature",
        instances: ["body > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.columncontainer.what-vyepti-section.aem-GridColumn.aem-GridColumn--default--12"]
      },
      {
        name: "columns-diagram",
        instances: ["body > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.columncontainer.section-powder-blue-bg-desktop.how-vyepti-section.aem-GridColumn.aem-GridColumn--default--12"]
      },
      {
        name: "cards-callout",
        instances: [
          "body > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.narrowCardCta.aem-GridColumn.aem-GridColumn--default--12",
          "body > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.columncontainer.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(6)"
        ]
      },
      {
        name: "carousel-quote",
        instances: ["body > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.quotescardcarousel.aem-GridColumn.aem-GridColumn--default--12"]
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_content_page_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path: path || "/index",
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_content_page_exports);
})();
