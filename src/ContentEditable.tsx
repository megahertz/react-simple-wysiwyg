import {
  Component,
  createElement,
  CSSProperties,
  FocusEventHandler,
  FormEventHandler,
  HTMLAttributes,
  KeyboardEventHandler,
  RefObject,
} from 'react';
import * as React from 'react';
import { normalizeHtml, replaceCaret, shallowCompare } from './utils';

/**
 * Based on https://github.com/lovasoa/react-contenteditable
 * A simple component for an html element with editable contents.
 */
export default class ContentEditable extends Component<ICEProps> {
  el: HTMLElement;
  previousValue: string;

  constructor(props: ICEProps) {
    super(props);

    this.previousValue = props.value;

    this.onChange = this.onChange.bind(this);
    this.setElementRef = this.setElementRef.bind(this);
  }

  shouldComponentUpdate(nextProps: ICEProps): boolean {
    const props = this.props;

    if (!this.el) {
      return true;
    }

    // Render call leads to cursor jump, so prevent it if possible

    if (normalizeHtml(nextProps.value) !== normalizeHtml(this.el.innerHTML)) {
      return true;
    }

    console.log('scu');

    if (!shallowCompare(props.style, nextProps.style)) {
      return true;
    }

    return shallowCompare(props, nextProps);
  }

  componentDidUpdate() {
    if (!this.el) {
      return;
    }

    if (this.props.value !== this.el.innerHTML) {
      this.el.innerHTML = this.props.value;
      this.previousValue = this.props.value;
    }

    replaceCaret(this.el);
  }

  setElementRef(el) {
    const { innerRef } = this.props;
    this.el = el;

    if (typeof innerRef === 'function') {
      innerRef(el);
    } else if (typeof innerRef === 'object') {
      (innerRef as any).current = el;
    }
  }

  onChange(event: React.FormEvent<HTMLElement>) {
    if (!this.el) {
      return;
    }

    const html = this.el.innerHTML;

    if (this.props.onChange && html !== this.previousValue) {
      this.props.onChange({
        ...event,
        target: {
          value: html,
        } as any,
      });
    }
    this.previousValue = html;
  }

  render() {
    const { tagName, value, innerRef, ...props } = this.props;

    const style = { ...styles.root, ...props.style };

    return createElement(tagName || 'div', {
      ...props,
      contentEditable: !this.props.disabled,
      dangerouslySetInnerHTML: { __html: value },
      onInput: this.onChange,
      onBlur: this.props.onBlur || this.onChange,
      onKeyUp: this.props.onKeyUp || this.onChange,
      onKeyDown: this.props.onKeyDown || this.onChange,
      ref: this.setElementRef,
      style,
    }, this.props.children);
  }
}

export interface ICEProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  disabled?: boolean;
  innerRef?: (el: HTMLElement) => void | RefObject<HTMLElement>;
  onChange?: FormEventHandler<HTMLElement>;
  onBlur?: FocusEventHandler<HTMLElement>;
  onKeyUp?: KeyboardEventHandler<HTMLElement>;
  onKeyDown?: KeyboardEventHandler<HTMLElement>;
  tagName?: string;
  style?: CSSProperties;
  value?: string;
}

const styles = {
  root: {
    outline: 'none',
    padding: 5,
  },
};
