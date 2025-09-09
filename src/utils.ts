import type { ForwardedRef } from 'react';

export function autoconfigureTextDirection(el: HTMLElement | undefined) {
  if (el) {
    const text = el.textContent;
    const rtlPattern = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
    el.style.direction = text && rtlPattern.test(text[0]) ? 'rtl' : 'ltr';
  }
}

export function cls(...classNames: unknown[]): string {
  return classNames.filter(Boolean).join(' ');
}

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

export function normalizeHtml(str: unknown): string {
  return typeof str === 'string'
    ? str.replace(/&nbsp;|\u202F|\u00A0/g, ' ').replace(/<br \/>/g, '<br>')
    : String(str);
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

export function setForwardRef<T = HTMLDivElement>(
  el: T,
  ref?: ForwardedRef<T>,
) {
  if (typeof ref === 'function') {
    ref(el);
  } else if (typeof ref === 'object' && ref) {
    // eslint-disable-next-line no-param-reassign
    ref.current = el;
  }
}
