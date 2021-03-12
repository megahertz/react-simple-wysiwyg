import { HTMLAttributes, ReactNode } from 'react';
import * as React from 'react';

import { IEditorContext, withEditorContext } from './Editor';
import OrderedListIcon from './icons/OrderedListIcon';
import UnorderedListIcon from './icons/UnorderedListIcon';

export const BtnBold = createButton('Bold', '𝐁', 'bold');
export const BtnClearFormatting = createButton(
  'Clear formatting',
  'T̲ₓ',
  'removeFormat',
);

export const BtnItalic = createButton('Italic', '𝑰', 'italic');

export const BtnLink = createButton('Link', '🔗', (selected: Node) => {
  if (selected && selected.nodeName === 'A') {
    document.execCommand('unlink');
  } else {
    // eslint-disable-next-line no-alert
    document.execCommand('createLink', false, prompt('URL', ''));
  }
});

export const BtnNumberedList = createButton(
  'Numbered list',
  <OrderedListIcon />,
  'insertOrderedList',
);

export const BtnRedo = createButton('Redo', '↷', 'redo');

export const BtnUnderline = createButton(
  'Underline',
  <span style={{ textDecoration: 'underline' }}>𝐔</span>,
  'underline',
);

export const BtnUndo = createButton('Undo', '↶', 'undo');

export const BtnBulletList = createButton(
  'Bullet list',
  <UnorderedListIcon />,
  'insertUnorderedList',
);

export interface IButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
  IEditorContext {}

function createButton(
  title: string,
  content: ReactNode,
  command: ((selection: Node) => void) | string,
) {
  ButtonFactory.displayName = title.replace(/\s/g, '');

  return withEditorContext(ButtonFactory);

  function ButtonFactory(props: IButtonProps) {
    const { selection, ...buttonProps } = props;

    let active = false;
    if (typeof command === 'string') {
      active = !!selection && document.queryCommandState(command);
    }

    return (
      <button
        type="button"
        title={title}
        {...buttonProps}
        className="rswBtn"
        onMouseDown={action}
        data-active={active}
      >
        {content}
      </button>
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
