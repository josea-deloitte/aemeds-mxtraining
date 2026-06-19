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

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/columns-hero.js
  function parse(element, { document }) {
    const columns = Array.from(element.querySelectorAll(':scope .row > [class*="col-"]'));
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

  // tools/importer/parsers/alert-strip.js
  function parse2(element, { document }) {
    const iconPicture = element.querySelector(".vyepti-homepage-info-icon picture, .image-text-comp picture");
    const iconImg = element.querySelector(".vyepti-homepage-info-icon img, .image-text-comp img");
    const text = element.querySelector(".vyepti-homepage-cta .rteComponent, .vyepti-homepage-cta p, .rteComponent");
    if (!text) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const iconCell = [];
    if (iconPicture) iconCell.push(iconPicture);
    else if (iconImg) iconCell.push(iconImg);
    const cells = [[iconCell, [text]]];
    const block = WebImporter.Blocks.createBlock(document, { name: "alert-strip", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-feature.js
  function parse3(element, { document }) {
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

  // tools/importer/parsers/carousel-quote.js
  function parse4(element, { document }) {
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

  // tools/importer/parsers/cards-callout.js
  function parse5(element, { document }) {
    const cards = Array.from(element.querySelectorAll(':scope .row > [class*="col-"]'));
    if (!cards.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = cards.map((card) => {
      const scope = card.querySelector(".bgcard-parsys") || card;
      const cardContent = [];
      const description = scope.querySelector(".description-after");
      if (description) cardContent.push(description);
      const cta = scope.querySelector(".boxed-link a, a.button-primary");
      if (cta) cardContent.push(cta);
      return [cardContent];
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-callout", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/vyepti-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#cookie-information-template-wrapper",
        ".interstitialmodal",
        "#external-link-modal",
        "#patient-site-modal"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".cmp-experiencefragment--header",
        "header.header-section",
        ".cmp-experiencefragment--isi",
        "#isi",
        ".footer.iparsys.parsys",
        "div.teaser.aem-GridColumn:empty"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "source",
        "link",
        "noscript",
        "iframe",
        "style"
      ]);
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "columns-hero": parse,
    "alert-strip": parse2,
    "cards-feature": parse3,
    "carousel-quote": parse4,
    "cards-callout": parse5
  };
  var transformers = [
    transform
  ];
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "VYEPTI homepage: split hero banner area, a call-out alert strip, a 3-up text-and-image column grid, a patient-quotes carousel, and a 2-up text-and-image card row. Global header, footer, and ISI are handled separately.",
    urls: [
      "https://www.vyepti.com/"
    ],
    blocks: [
      {
        name: "columns-hero",
        instances: ["#vyepti-banner-swap > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.columncontainer.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(1)"]
      },
      {
        name: "alert-strip",
        instances: ["#vyepti-banner-swap > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.columncontainer.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(2)"]
      },
      {
        name: "cards-feature",
        instances: ["#vyepti-banner-swap > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.columncontainer.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(3)"]
      },
      {
        name: "carousel-quote",
        instances: ["#vyepti-banner-swap > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.quotescardcarousel.aem-GridColumn.aem-GridColumn--default--12"]
      },
      {
        name: "cards-callout",
        instances: ["#vyepti-banner-swap > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.columncontainer.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(5)"]
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
  var import_homepage_default = {
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
  return __toCommonJS(import_homepage_exports);
})();
