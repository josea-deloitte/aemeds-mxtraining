/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import columnsHeroParser from './parsers/columns-hero.js';
import alertStripParser from './parsers/alert-strip.js';
import cardsFeatureParser from './parsers/cards-feature.js';
import carouselQuoteParser from './parsers/carousel-quote.js';
import cardsCalloutParser from './parsers/cards-callout.js';

// TRANSFORMER IMPORTS
import vyeptiCleanupTransformer from './transformers/vyepti-cleanup.js';

// PARSER REGISTRY
const parsers = {
  'columns-hero': columnsHeroParser,
  'alert-strip': alertStripParser,
  'cards-feature': cardsFeatureParser,
  'carousel-quote': carouselQuoteParser,
  'cards-callout': cardsCalloutParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  vyeptiCleanupTransformer,
];

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'VYEPTI homepage: split hero banner area, a call-out alert strip, a 3-up text-and-image column grid, a patient-quotes carousel, and a 2-up text-and-image card row. Global header, footer, and ISI are handled separately.',
  urls: [
    'https://www.vyepti.com/',
  ],
  blocks: [
    {
      name: 'columns-hero',
      instances: ['#vyepti-banner-swap > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.columncontainer.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(1)'],
    },
    {
      name: 'alert-strip',
      instances: ['#vyepti-banner-swap > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.columncontainer.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(2)'],
    },
    {
      name: 'cards-feature',
      instances: ['#vyepti-banner-swap > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.columncontainer.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(3)'],
    },
    {
      name: 'carousel-quote',
      instances: ['#vyepti-banner-swap > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.quotescardcarousel.aem-GridColumn.aem-GridColumn--default--12'],
    },
    {
      name: 'cards-callout',
      instances: ['#vyepti-banner-swap > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.columncontainer.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(5)'],
    },
  ],
};

/**
 * Execute all page transformers for a specific hook
 * @param {string} hookName - The hook name ('beforeTransform' or 'afterTransform')
 * @param {Element} element - The DOM element to transform
 * @param {Object} payload - The payload containing { document, url, html, params }
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 * @param {Document} document - The DOM document
 * @param {Object} template - The embedded PAGE_TEMPLATE object
 * @returns {Array} Array of block instances found on the page
 */
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
          section: blockDef.section || null,
        });
      });
    });
  });
  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;

    // 1. beforeTransform (initial cleanup: cookie banner, modals)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block (skip elements already replaced by a prior parser)
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

    // 4. afterTransform (strip global header/footer/ISI + leftover non-content)
    executeTransformers('afterTransform', main, payload);

    // 5. WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, ''),
    );

    return [{
      element: main,
      path: path || '/index',
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
