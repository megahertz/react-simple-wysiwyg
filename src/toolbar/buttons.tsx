import { CSSProperties, HTMLAttributes, ReactNode, useState } from 'react';
import * as React from 'react';
import { IEditorContext, withEditorContext } from '../Editor';
import OrderedListIcon from './icons/OrderedListIcon';
import UnorderedListIcon from './icons/UnorderedListIcon';

// tslint:disable:max-line-length

export const BtnBold = createButton('Bold', '𝐁', 'bold');
export const BtnClearFormatting = createButton('Clear formatting', 'T̲ₓ', 'removeFormat');
export const BtnItalic = createButton('Italic', '𝑰', 'italic');
export const BtnLink = createButton('Link', '🔗', (selected: Node) => {
  if (selected && selected.nodeName === 'A') {
    document.execCommand('unlink');
  } else {
    document.execCommand('createLink', false, prompt('URL', ''));
  }
});
export const BtnNumberedList = createButton('Numbered list', <OrderedListIcon />, 'insertOrderedList');
export const BtnRedo = createButton('Redo', '↷', 'redo');
export const BtnUnderline = createButton('Underline', <span style={{ textDecoration: 'underline' }}>𝐔</span>, 'underline');
export const BtnUndo = createButton('Undo', '↶', 'undo');
export const BtnBulletList = createButton('Bullet list', <UnorderedListIcon />, 'insertUnorderedList');

export function Button(props: IButtonProps) {
  const [ hovered, setHovered ] = useState(false);

  const { active, styles, el, selection, ...inputProps } = props;

  const style = {
    ...styles.button.normal,
    ...props.style,
    ...(hovered ? styles.button.hovered : {}),
    ...(hovered ? props.hoverStyle : {}),
    ...(active ? styles.button.active : {}),
  };

  const onHover = (e) => {
    setHovered(true);
    props.onMouseEnter && props.onMouseEnter(e);
  };

  const onUnHover = (e) => {
    setHovered(false);
    props.onMouseLeave && props.onMouseLeave(e);
  };

  return (
    <button
      {...inputProps}
      style={style}
      onMouseEnter={onHover}
      onMouseLeave={onUnHover}
    />
  );
}

export interface IButtonProps
  extends HTMLAttributes<HTMLButtonElement>, IEditorContext {
  active?: boolean;
  hoverStyle?: CSSProperties;
}

function createButton(
  title: string,
  content: ReactNode,
  command: ((selection: Node) => void) | string,
): typeof Button {
  ButtonFactory.displayName = title.replace(/\s/g, '');

  return withEditorContext<typeof Button>(ButtonFactory);

  function ButtonFactory(props: IButtonProps) {
    const { selection, ...buttonProps } = props;

    let active = false;
    if (typeof command === 'string') {
      active = !!selection && document.queryCommandState(command);
    }

    return (
      <Button title={title} {...buttonProps} onMouseDown={action} active={active}>
        {content}
      </Button>
    );

    function action() {
      if (typeof command === 'function') {
        command(selection);
      } else {
        document.execCommand(command);
      }
    }
  }
}
