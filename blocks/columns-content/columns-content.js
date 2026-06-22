const CALLOUT_MARKER_PATTERN = /^(\[?callout(?:-start)?\]?|---)$/i;

function isCalloutMarker(element) {
  if (!element) return false;
  if (element.classList.contains('callout-start')) return true;
  if (element.tagName === 'HR') return true;

  const markerText = (element.textContent || '').trim();
  return CALLOUT_MARKER_PATTERN.test(markerText);
}

function getCalloutStartIndex(columnChildren) {
  const markerIndex = columnChildren.findIndex(isCalloutMarker);
  if (markerIndex !== -1) return markerIndex + 1;

  // Backward compatibility with existing authored content.
  return columnChildren.length > 2 ? 2 : -1;
}

function buildCallout(column, columnIndex = 1) {
  const directChildren = [...column.children];
  const startIndex = getCalloutStartIndex(directChildren);
  if (startIndex < 0 || startIndex >= directChildren.length) return;

  const markerIndex = directChildren.findIndex(isCalloutMarker);
  if (markerIndex !== -1) {
    directChildren[markerIndex].remove();
  }

  const callout = document.createElement('div');
  callout.className = 'columns-content-callout';

  const icon = document.createElement('span');
  icon.className = 'columns-content-callout-icon';
  icon.setAttribute('aria-hidden', 'true');

  const content = document.createElement('div');
  content.className = 'columns-content-callout-content';

  directChildren.slice(startIndex).forEach((element) => content.append(element));

  callout.append(icon, content);
  column.append(callout);
}

/**
 * Decorates 2-column layout with optional callout.
 * data-callout="left" | "right" (default) | "both" controls which column(s) get callout.
 * @param {Element} block
 */
export default function decorate(block) {
  const calloutConfig = (block.dataset.callout || 'right').toLowerCase();
  const shouldDecorateLeft = calloutConfig === 'left' || calloutConfig === 'both';
  const shouldDecorateRight = calloutConfig === 'right' || calloutConfig === 'both';

  [...block.children].forEach((row) => {
    const cols = [...row.children];
    if (cols.length !== 2) return;

    row.classList.add('columns-content-row');
    cols[0].classList.add('columns-content-left');
    cols[1].classList.add('columns-content-right');

    if (shouldDecorateLeft) buildCallout(cols[0], 0);
    if (shouldDecorateRight) buildCallout(cols[1], 1);
  });
}
