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

  // tools/importer/import-stay-connected.js
  var import_stay_connected_exports = {};
  __export(import_stay_connected_exports, {
    default: () => import_stay_connected_default
  });

  // tools/importer/parsers/form.js
  var US_STATES = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "DC",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
    "PR",
    "AA",
    "AP",
    "AE"
  ];
  function parse(element, { document }) {
    const form = element.matches("form") ? element : element.querySelector("form#stayConnected, form");
    if (!form) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const consent = document.createElement("div");
    consent.append(document.createTextNode(
      "By submitting this form, I agree to receive email updates about migraine and migraine treatment with VYEPTI. I authorize Lundbeck, its affiliates, its employees, and its agents to use the information I am providing in order to enroll me in the email program. Lundbeck will not sell your provided data to any third party, at any time. By clicking \u201CSubmit,\u201D you signify that you have read and agree to our "
    ));
    const terms = document.createElement("a");
    terms.href = "https://www.lundbeck.com/us/terms-of-use";
    terms.textContent = "Terms of Use";
    const privacy = document.createElement("a");
    privacy.href = "https://www.lundbeck.com/us/privacy-policy";
    privacy.textContent = "Privacy Policy";
    consent.append(terms, document.createTextNode(" and "), privacy, document.createTextNode("."));
    const rows = [
      ["Have you been prescribed VYEPTI?", "radio: Yes, No"],
      ["Have you had your first VYEPTI infusion?", "radio: Yes, No"],
      ["First infusion date", "optional date"],
      ["Date of birth", "date"],
      ["First name", "text"],
      ["Last name", "text"],
      ["Email address", "email"],
      ["Mobile phone number", "tel"],
      ["Street address 1", "text"],
      ["Street address 2", "optional text"],
      ["City", "text"],
      ["State", `select: ${US_STATES.join(", ")}`],
      ["ZIP code", "text"],
      ["Do you have 4 or more migraine days a month?", "optional radio: Yes, No"],
      [consent, "checkbox"],
      ["Submit", "submit"]
    ];
    const cells = rows.map(([label, config]) => [label, config]);
    const block = WebImporter.Blocks.createBlock(document, { name: "form", cells });
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

  // tools/importer/import-stay-connected.js
  var parsers = {
    form: parse
  };
  var transformers = [
    transform
  ];
  var PAGE_TEMPLATE = {
    name: "stay-connected",
    description: 'VYEPTI Stay Connected page: sign-up ("Stay Connected") lead-capture form. Only the signUpForm is migrated; global header, footer, and ISI are handled separately.',
    urls: [
      "https://www.vyepti.com/stay-connected"
    ],
    blocks: [
      {
        name: "form",
        instances: [".signUpForm"]
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
  var import_stay_connected_default = {
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
  return __toCommonJS(import_stay_connected_exports);
})();
