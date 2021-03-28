/* eslint-disable react/prop-types */

import {
  createElement,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  memo,
  SyntheticEvent,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { normalizeHtml, replaceCaret } from '../utils';

/**
 * Based on https://github.com/lovasoa/react-contenteditable
 * A simple component for an html element with editable contents.
 */
export const ContentEditable = memo(
  forwardRef(function ContentEditable(
    {
      className,
      disabled,
      onBlur,
      onKeyDown,
      onKeyUp,
      tagName,
      value,
      ...rest
    }: ContentEditableProps,
    ref: ForwardedRef<HTMLElement>,
  ) {
    const elRef = useRef<HTMLElement>();
    const htmlRef = useRef(value);

    useEffect(() => {
      const el = elRef.current;
      if (el && normalizeHtml(htmlRef.current) !== normalizeHtml(value)) {
        htmlRef.current = value;
        el.innerHTML = value;
        replaceCaret(el);
      }
    });

    return useMemo(() => {
      function onSetRef($el: HTMLElement) {
        elRef.current = $el;
        if (typeof ref === 'function') {
          ref($el);
        } else if (typeof ref === 'object') {
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
          rest.onChange?.({
            ...event,
            target: {
              value: elementHtml,
              name: rest.name,
            } as any,
          });
        }

        htmlRef.current = elementHtml;
      }

      return createElement(tagName || 'div', {
        ...rest,
        className,
        contentEditable: !disabled,
        dangerouslySetInnerHTML: { __html: value },
        onBlur: onBlur || onChange,
        onInput: onChange,
        onKeyDown: onKeyDown || onChange,
        onKeyUp: onKeyUp || onChange,
        ref: onSetRef,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [className, disabled, onBlur, onKeyDown, onKeyUp, tagName]);
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
