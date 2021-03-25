import { Component, createElement, FormEvent, HTMLAttributes } from 'react';
import { compare, normalizeHtml, replaceCaret } from '../utils';

/**
 * Based on https://github.com/lovasoa/react-contenteditable
 * A simple component for an html element with editable contents.
 */
export class ContentEditable extends Component<ICEProps> {
  el: HTMLElement;
  previousValue: string;

  constructor(props: ICEProps) {
    super(props);

    this.previousValue = props.value;

    this.onChange = this.onChange.bind(this);
    this.setElementRef = this.setElementRef.bind(this);
  }

  shouldComponentUpdate(nextProps: ICEProps): boolean {
    if (!this.el) {
      return true;
    }

    if (normalizeHtml(nextProps.value) !== normalizeHtml(this.el.innerHTML)) {
      return true;
    }

    return !compare(this.props, nextProps, [
      'disabled',
      'tagName',
      'className',
    ]);
  }

  componentDidUpdate() {
    if (!this.el) {
      return;
    }

    if (this.props.value !== this.el.innerHTML) {
      this.previousValue = this.props.value;
      this.el.innerHTML = this.props.value;
    }

    replaceCaret(this.el);
  }

  onChange(event: FormEvent<HTMLElement>) {
    if (!this.el) {
      return;
    }

    const value = this.el.innerHTML;
    const previous = this.previousValue;
    this.previousValue = value;

    if (this.props.onChange && value !== previous) {
      this.props.onChange({ ...event, target: { value } as any });
    }
  }

  setElementRef(el) {
    const { contentEditableRef } = this.props;
    this.el = el;

    contentEditableRef && contentEditableRef(el);
  }

  render() {
    const { contentEditableRef, tagName, value, ...props } = this.props;

    return createElement(tagName || 'div', {
      ...props,
      contentEditable: !this.props.disabled,
      dangerouslySetInnerHTML: { __html: value },
      onBlur: this.props.onBlur || this.onChange,
      onInput: this.onChange,
      onKeyDown: this.props.onKeyDown || this.onChange,
      onKeyUp: this.props.onKeyUp || this.onChange,
      ref: this.setElementRef,
    });
  }
}

export interface ICEProps extends HTMLAttributes<HTMLElement> {
  disabled?: boolean;
  contentEditableRef?: (el: HTMLElement) => void;
  tagName?: string;
  value?: string;
}
