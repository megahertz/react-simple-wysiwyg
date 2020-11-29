/* eslint-disable no-continue,no-restricted-syntax,no-plusplus */
export function compare<T>(a: T, b: T, keys: Array<keyof T>): boolean {
  return keys.every((key) => a[key] === b[key]);
}

export function deepMerge<T>(target: any, ...sources: T[]): T {
  if (!sources.length) {
    return target;
  }

  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (!Object.prototype.hasOwnProperty.call(source, key)) {
        continue;
      }

      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, { [key]: {} });
        }

        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepMerge(target, ...sources);
}

export function findLastTextNode(node: Node): Node | null {
  if (node.nodeType === Node.TEXT_NODE) {
    return node;
  }

  const children = node.childNodes;
  for (let i = children.length - 1; i >= 0; i--) {
    const textNode = findLastTextNode(children[i]);

    if (textNode !== null) {
      return textNode;
    }
  }
  return null;
}

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

function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

export function normalizeHtml(str: string): string {
  return str && str.replace(/&nbsp;|\u202F|\u00A0/g, ' ');
}

export function replaceCaret(el: HTMLElement) {
  // Place the caret at the end of the element
  const target = findLastTextNode(el);
  // do not move caret if element was not focused
  const isTargetFocused = document.activeElement === el;

  if (target !== null && target.nodeValue !== null && isTargetFocused) {
    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(target, target.nodeValue.length);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);

    if (el instanceof HTMLElement) {
      el.focus();
    }
  }
}
