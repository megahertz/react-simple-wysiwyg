export function getSelectedNode(): Node | undefined {
  if ((document as any).selection) {
    return (document as any).selection.createRange().parentElement();
  }

  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    return selection.getRangeAt(0).startContainer.parentNode || undefined;
  }

  return undefined;
}

export function normalizeHtml(str: string | undefined): string {
  return str ? str.replace(/&nbsp;|\u202F|\u00A0/g, ' ') : '';
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

// Auto direction
export function setDirection(el: HTMLElement | undefined) {
  if (el) {
    const unformattedText = el.textContent;
    const rtlPattern = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
    const dir = unformattedText && rtlPattern.test(unformattedText[0]) ? 'rtl' : 'ltr';
    el.style.direction = dir;
  }
}