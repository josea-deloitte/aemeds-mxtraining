import { decorateBlock, loadBlock } from '../../scripts/aem.js';

const OPEN_CLASS = 'is-open';
const BODY_OPEN_CLASS = 'modal-is-open';
const TRANSITION_MS = 220;
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

function getModalId(block) {
  if (block.id) return block.id;
  const uid = Math.random().toString(36).slice(2, 8);
  const id = `modal-${uid}`;
  block.id = id;
  return id;
}

function isVisibleFocusable(element) {
  return !element.hasAttribute('hidden') && element.getClientRects().length > 0;
}

function getFocusableElements(container) {
  return [...container.querySelectorAll(FOCUSABLE_SELECTOR)].filter(isVisibleFocusable);
}

function isLikelyBlockElement(candidate) {
  if (candidate.tagName !== 'DIV') return false;
  if (candidate.classList.contains('block')) return true;
  if (candidate.classList.length !== 1) return false;

  const className = candidate.classList[0];
  if (className.startsWith('modal-')) return false;

  const children = [...candidate.children];
  return children.length > 0 && children.every((child) => child.tagName === 'DIV');
}

async function loadNestedBlocks(container) {
  const candidates = [...container.querySelectorAll('div')]
    .filter((candidate) => isLikelyBlockElement(candidate))
    .filter((candidate) => {
      const parentBlock = candidate.parentElement?.closest('.block');
      return !parentBlock || parentBlock === candidate;
    })
    .filter((candidate, index, list) => list.indexOf(candidate) === index)
    .filter((candidate) => candidate.dataset.blockStatus !== 'loaded');

  await Promise.all(
    candidates.map(async (candidate) => {
      if (!candidate.classList.contains('block')) decorateBlock(candidate);
      await loadBlock(candidate);
    })
  );
}

function buildBodyContent(block, body) {
  const rows = [...block.children].filter((row) => row.tagName === 'DIV');

  rows.forEach((row, rowIndex) => {
    const cells = [...row.children].filter((cell) => cell.tagName === 'DIV');
    if (!cells.length) return;

    const hasMultipleCells = cells.length > 1;
    const rowWrapper = document.createElement('div');
    rowWrapper.className = hasMultipleCells ? 'modal-row modal-row-multi' : 'modal-row';

    const isActionsRow =
      hasMultipleCells &&
      cells.every((cell) => cell.querySelector('a[href]')) &&
      cells.every((cell) => !cell.querySelector('.block, table, ul, ol'));
    if (isActionsRow) rowWrapper.classList.add('modal-row-actions');
    if (rowIndex === 0) rowWrapper.classList.add('modal-row-intro');

    cells.forEach((cell, index) => {
      const cellWrapper = document.createElement('div');
      cellWrapper.classList.add('modal-cell');
      [...cell.classList].forEach((className) => cellWrapper.classList.add(className));
      while (cell.firstChild) cellWrapper.append(cell.firstChild);

      if (isActionsRow) {
        const link = cellWrapper.querySelector('a[href]');
        const wrapper = link?.closest('p');
        if (wrapper) wrapper.classList.add('button-wrapper');

        if (link) {
          link.classList.add('button');
          if (
            !link.classList.contains('primary') &&
            !link.classList.contains('secondary') &&
            !link.classList.contains('accent')
          ) {
            link.classList.add(index === 0 ? 'secondary' : 'primary');
          }
        }
      }

      rowWrapper.append(cellWrapper);
    });

    body.append(rowWrapper);
  });
}

function bindExternalTriggers(modalId, onOpen) {
  const selector = [
    `a[href="#${modalId}"]`,
    `button[data-modal-target="${modalId}"]`,
    `[data-modal-target="${modalId}"]:not(button)`,
  ].join(', ');

  document.querySelectorAll(selector).forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      onOpen(trigger);
    });
  });
}

function ensureDialogLabel(dialog, modalId) {
  const heading = dialog.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) {
    if (!heading.id) heading.id = `${modalId}-title`;
    dialog.setAttribute('aria-labelledby', heading.id);
    return;
  }

  dialog.setAttribute('aria-label', 'Dialog');
}

function createModalShell(modalId, block) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  if (block.classList.contains('split-desktop')) {
    overlay.classList.add('modal-overlay-split-desktop');
  }
  overlay.setAttribute('aria-hidden', 'true');
  overlay.hidden = true;

  const dialog = document.createElement('div');
  dialog.className = 'modal-dialog';
  dialog.id = `${modalId}-dialog`;
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');

  const header = document.createElement('div');
  header.className = 'modal-header';

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'modal-close';
  closeButton.setAttribute('aria-label', 'Close dialog');
  closeButton.innerHTML = '<span aria-hidden="true">&times;</span>';

  const body = document.createElement('div');
  body.className = 'modal-body';

  buildBodyContent(block, body);

  header.append(closeButton);
  dialog.append(header, body);
  overlay.append(dialog);
  ensureDialogLabel(dialog, modalId);

  return {
    overlay,
    dialog,
    closeButton,
    body,
  };
}

function shouldAutoOpen(block) {
  return block.classList.contains('auto-open');
}

function shouldCloseOnOverlayClick(block) {
  return !block.classList.contains('no-overlay-close');
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const modalId = getModalId(block);
  const { overlay, dialog, closeButton, body } = createModalShell(modalId, block);

  document.body.append(overlay);
  block.textContent = '';
  block.hidden = true;

  let isOpen = false;
  let lastFocusedElement = null;
  let nestedBlocksLoaded = false;

  function handleKeydown(event) {
    if (!isOpen) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeButton.click();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusableElements = getFocusableElements(dialog);
    if (!focusableElements.length) {
      event.preventDefault();
      closeButton.focus();
      return;
    }

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function closeModal({ restoreFocus = true } = {}) {
    if (!isOpen) return;
    isOpen = false;

    overlay.classList.remove(OPEN_CLASS);
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove(BODY_OPEN_CLASS);
    window.removeEventListener('keydown', handleKeydown);

    window.setTimeout(() => {
      if (!isOpen) overlay.hidden = true;
    }, TRANSITION_MS);

    if (restoreFocus && lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  function closeOtherOpenModals() {
    document.querySelectorAll('.modal-overlay.is-open').forEach((activeOverlay) => {
      if (activeOverlay === overlay) return;
      const close = activeOverlay.querySelector('.modal-close');
      if (close instanceof HTMLButtonElement) close.click();
    });
  }

  const openModal = async (trigger = null) => {
    if (isOpen) return;
    closeOtherOpenModals();
    isOpen = true;

    if (!nestedBlocksLoaded) {
      await loadNestedBlocks(body);
      nestedBlocksLoaded = true;
    }

    lastFocusedElement = trigger || document.activeElement;
    overlay.hidden = false;
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add(BODY_OPEN_CLASS);

    requestAnimationFrame(() => {
      overlay.classList.add(OPEN_CLASS);
      const focusableElements = getFocusableElements(dialog);
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      } else {
        closeButton.focus();
      }
    });

    window.addEventListener('keydown', handleKeydown);
  };

  closeButton.addEventListener('click', closeModal);

  overlay.addEventListener('click', (event) => {
    if (event.target.closest('[data-modal-close]')) {
      closeModal();
      return;
    }

    if (event.target === overlay && shouldCloseOnOverlayClick(block)) {
      closeModal();
    }
  });

  bindExternalTriggers(modalId, openModal);

  if (window.location.hash === `#${modalId}`) {
    openModal();
    return;
  }

  if (shouldAutoOpen(block) && !document.querySelector('.modal-overlay.is-open')) {
    openModal();
  }
}
