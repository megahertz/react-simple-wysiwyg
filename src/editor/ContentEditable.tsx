import React from 'react';
import type {
  FocusEvent,
  ForwardedRef,
  HTMLAttributes,
  KeyboardEvent,
  SyntheticEvent,
} from 'react';
import {
  autoconfigureTextDirection,
  cls,
  normalizeHtml,
  replaceCaret,
  setForwardRef,
} from '../utils';

/**
 * Based on https://github.com/lovasoa/react-contenteditable
 * A simple component for a html element with editable contents.
 */
export const ContentEditable = React.memo(
  React.forwardRef(function ContentEditable(
    {
      // Some properties are used here only as useMemo dependencies
      className,
      disabled,
      tagName,
      value = '',
      placeholder,
      ...rest
    }: ContentEditableProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) {
    const elRef = React.useRef<HTMLDivElement>(null);
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
      function onSetRef($el: HTMLDivElement) {
        elRef.current = $el;
        autoconfigureTextDirection($el);
        setForwardRef($el, ref);
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

        autoconfigureTextDirection(el);
        htmlRef.current = elementHtml;
      }

      const cssClass = cls('rsw-ce', className);
      return React.createElement(tagName || 'div', {
        ...rest,
        className: cssClass,
        contentEditable: !disabled,
        dangerouslySetInnerHTML: { __html: value },
        onBlur: (e: FocusEvent<HTMLElement>) =>
          (restRef.current.onBlur || onChange)(e),
        onInput: onChange,
        onKeyDown: (e: KeyboardEvent<HTMLElement>) =>
          (restRef.current.onKeyDown || onChange)(e),
        onKeyUp: (e: KeyboardEvent<HTMLElement>) =>
          (restRef.current.onKeyUp || onChange)(e),
        placeholder,
        ref: onSetRef,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [className, disabled, placeholder, tagName]);
  }),
);

export type ContentEditableEvent = SyntheticEvent<any, Event> & {
  target: { name?: string; value: string };
};

export interface ContentEditableProps extends HTMLAttributes<HTMLElement> {
  disabled?: boolean;
  name?: string;
  onChange?: (event: ContentEditableEvent) => void;
  placeholder?: string;
  tagName?: string;
  value?: string;
}
