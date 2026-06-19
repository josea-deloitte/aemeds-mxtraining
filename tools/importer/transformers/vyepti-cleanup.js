/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: VYEPTI site-wide cleanup.
 *
 * Removes non-authorable site shell/chrome so the import contains only the
 * main page content under #vyepti-banner-swap.
 *
 * All selectors below were verified against migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Overlays / modals that block parsing and carry the body `modal-open` state.
    // Verified in DOM:
    //   <div id="cookie-information-template-wrapper">                         (cookie banner)
    //   <div class="interstitialmodal ..."><div class="modal fade header-modal"
    //        id="external-link-modal"> / id="patient-site-modal">              (interstitial / prescription modals)
    WebImporter.DOMUtils.remove(element, [
      '#cookie-information-template-wrapper',
      '.interstitialmodal',
      '#external-link-modal',
      '#patient-site-modal',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Non-authorable global chrome (header, footer, ISI). Verified in DOM:
    //   <div class="experiencefragment"><div class="cmp-experiencefragment cmp-experiencefragment--header">
    //   <header class="header-section"> ... <nav class="navbar ...">           (global header + nav)
    //   <div class="footer iparsys parsys">                                    (global footer)
    //   <div class="cmp-experiencefragment cmp-experiencefragment--isi"><div id="isi"> (Important Safety Information)
    //   <div class="teaser aem-GridColumn aem-GridColumn--default--12"></div>  (trailing empty ISI placeholder grid child)
    WebImporter.DOMUtils.remove(element, [
      '.cmp-experiencefragment--header',
      'header.header-section',
      '.cmp-experiencefragment--isi',
      '#isi',
      '.footer.iparsys.parsys',
      'div.teaser.aem-GridColumn:empty',
    ]);

    // Leftover non-content elements safe to strip site-wide. Verified in DOM:
    //   <source> (inside <picture>; <img> is preserved for parsers)
    //   <link href="/etc.clientlibs/.../clientlibs.min....css">
    WebImporter.DOMUtils.remove(element, [
      'source',
      'link',
      'noscript',
      'iframe',
      'style',
    ]);
  }
}
