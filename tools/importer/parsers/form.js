/* eslint-disable */
/* global WebImporter */
/**
 * Parser for the form block (VYEPTI "Stay Connected" sign-up form).
 * Base block: form.
 * Source: https://www.vyepti.com/stay-connected  (<form id="stayConnected">)
 *
 * The source form is JS-driven: selecting "Have you been prescribed VYEPTI?"
 * Yes/No swaps between two near-identical field branches (#signupEmailUpdate for
 * Yes, plus a second branch for No). Both branches collect the same contact
 * fields. For a static EDS form we emit the canonical flattened field set that
 * matches the primary (prescribed = Yes) path, dropping duplicated hidden inputs
 * and the geolocation/autocomplete plumbing that has no EDS equivalent.
 *
 * Emitted rows (col1 = label, col2 = field config understood by blocks/form/form.js):
 *   radio: Yes, No | date | optional date | text | email | tel | select: ... | checkbox | submit
 * "optional" prefix marks a field as not required.
 */

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID',
  'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO',
  'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA',
  'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'PR',
  'AA', 'AP', 'AE',
];

export default function parse(element, { document }) {
  // Empty-block guard: if the expected form isn't present, unwrap and bail.
  const form = element.matches('form') ? element : element.querySelector('form#stayConnected, form');
  if (!form) {
    element.replaceWith(...element.childNodes);
    return;
  }

  // Build the consent cell, preserving Terms of Use / Privacy Policy links.
  const consent = document.createElement('div');
  consent.append(document.createTextNode(
    'By submitting this form, I agree to receive email updates about migraine and '
    + 'migraine treatment with VYEPTI. I authorize Lundbeck, its affiliates, its '
    + 'employees, and its agents to use the information I am providing in order to '
    + 'enroll me in the email program. Lundbeck will not sell your provided data to '
    + 'any third party, at any time. By clicking “Submit,” you signify that '
    + 'you have read and agree to our ',
  ));
  const terms = document.createElement('a');
  terms.href = 'https://www.lundbeck.com/us/terms-of-use';
  terms.textContent = 'Terms of Use';
  const privacy = document.createElement('a');
  privacy.href = 'https://www.lundbeck.com/us/privacy-policy';
  privacy.textContent = 'Privacy Policy';
  consent.append(terms, document.createTextNode(' and '), privacy, document.createTextNode('.'));

  const rows = [
    ['Have you been prescribed VYEPTI?', 'radio: Yes, No'],
    ['Have you had your first VYEPTI infusion?', 'radio: Yes, No'],
    ['First infusion date', 'optional date'],
    ['Date of birth', 'date'],
    ['First name', 'text'],
    ['Last name', 'text'],
    ['Email address', 'email'],
    ['Mobile phone number', 'tel'],
    ['Street address 1', 'text'],
    ['Street address 2', 'optional text'],
    ['City', 'text'],
    ['State', `select: ${US_STATES.join(', ')}`],
    ['ZIP code', 'text'],
    ['Do you have 4 or more migraine days a month?', 'optional radio: Yes, No'],
    [consent, 'checkbox'],
    ['Submit', 'submit'],
  ];

  const cells = rows.map(([label, config]) => [label, config]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'form', cells });
  element.replaceWith(block);
}
