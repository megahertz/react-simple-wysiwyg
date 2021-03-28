export function getSelectedNode(): Node {
  if ((document as any).selection) {
    return (document as any).selection.createRange().parentElement();
  }

  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    return selection.getRangeAt(0).startContainer.parentNode;
  }

  return null;
}

export function normalizeHtml(str: string): string {
  return str && str.replace(/&nbsp;|\u202F|\u00A0/g, ' ');
}

export function replaceCaret(el: HTMLElement) {
  // Place the caret at the end of the element
  const target = document.createTextNode('');
  el.appendChild(target);

  // do not move caret if element was not focused
  const isTargetFocused = document.activeElement === el;
  if (target !== null && target.nodeValue !== null && isTargetFocused) {
    const sel = window.getSelection();
    if (sel !== null) {
      const range = document.createRange();
      range.setStart(target, target.nodeValue.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    if (el instanceof HTMLElement) el.focus();
  }
}
