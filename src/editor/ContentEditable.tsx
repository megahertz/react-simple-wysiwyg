import React from 'react';
import type {
  FocusEvent,
  ForwardedRef,
  HTMLAttributes,
  KeyboardEvent,
  SyntheticEvent,
} from 'react';
import { normalizeHtml, replaceCaret, setDirection } from '../utils';

/**
 * Based on https://github.com/lovasoa/react-contenteditable
 * A simple component for a html element with editable contents.
 */
export const ContentEditable = React.memo(
  React.forwardRef(function ContentEditable(
    { className, disabled, tagName, value = '', ...rest }: ContentEditableProps,
    ref: ForwardedRef<HTMLElement>,
  ) {
    const elRef = React.useRef<HTMLElement>();
    const htmlRef = React.useRef(value);
    const restRef = React.useRef(rest);

    React.useEffect(() => {
      restRef.current = rest;
      const el = elRef.current;
      if (el && normalizeHtml(htmlRef.current) !== normalizeHtml(value)) {
        htmlRef.current = value;
        el.innerHTML = value;
        replaceCaret(el);
      }
    });

    return React.useMemo(() => {
      function onSetRef($el: HTMLElement) {
        elRef.current = $el;
        setDirection($el);
        if (typeof ref === 'function') {
          ref($el);
        } else if (typeof ref === 'object' && ref) {
          // eslint-disable-next-line no-param-reassign
          ref.current = $el;
        }
      }

      function onChange(event: SyntheticEvent<any>) {
        const el = elRef.current;
        if (!el) {
          return;
        }

        const elementHtml = el.innerHTML;
        if (elementHtml !== htmlRef.current) {
          restRef.current.onChange?.({
            ...event,
            target: {
              value: elementHtml,
              name: rest.name,
            } as any,
          });
        }

        setDirection(el);
        htmlRef.current = elementHtml;
      }

      return React.createElement(tagName || 'div', {
        ...rest,
        className,
        contentEditable: !disabled,
        dangerouslySetInnerHTML: { __html: value },
        onBlur: (e: FocusEvent<HTMLElement>) =>
          (restRef.current.onBlur || onChange)(e),
        onInput: onChange,
        onKeyDown: (e: KeyboardEvent<HTMLElement>) =>
          (restRef.current.onKeyDown || onChange)(e),
        onKeyUp: (e: KeyboardEvent<HTMLElement>) =>
          (restRef.current.onKeyUp || onChange)(e),
        ref: onSetRef,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [className, disabled, tagName]);
  }),
);

export type ContentEditableEvent = SyntheticEvent<any, Event> & {
  target: { name?: string; value: string };
};

export interface ContentEditableProps extends HTMLAttributes<HTMLElement> {
  disabled?: boolean;
  contentEditableRef?: (el: HTMLElement) => void;
  name?: string;
  onChange?: (event: ContentEditableEvent) => void;
  tagName?: string;
  value?: string;
}
