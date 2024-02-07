import React from 'react';
import type { HTMLAttributes, MouseEvent, ReactNode } from 'react';
import { EditorState, useEditorState } from '../editor/EditorContext';
import OrderedListIcon from './icons/OrderedListIcon';
import UnorderedListIcon from './icons/UnorderedListIcon';
import BoldButton from './icons/BoldButton';
import ItalicButton from './icons/ItalicButton';
import UnderLIneButton from './icons/UnderLIneButton';
import AlignLeft from './icons/AlignLeft';
import AlignCenter from './icons/AlignCenter';
import AlignRight from './icons/AlignRight';

export const BtnBold = createButton('Bold', <BoldButton/>, 'bold');

export const BtnBulletList = createButton(
  'Bullet list',
  <UnorderedListIcon />,
  'insertUnorderedList',
);
export const BtnAligenLeft = createButton('Aligen left', <AlignLeft/> , 'justifyLeft');
export const BtnAlignCenter = createButton('Align center', <AlignCenter/>, 'justifyCenter');
export const BtnAlignRight = createButton('Aligen right', <AlignRight/> ,'justifyRight');
// const toolbar = document.querySelector('.toolbar');



export const BtnClearFormatting = createButton(
  'Clear formatting',
  'T̲ₓ',
  'removeFormat',
);

export const BtnItalic = createButton('Italic', <ItalicButton/>, 'italic');

export const BtnStrikeThrough = createButton(
  'Strike through',
  <s>ab</s>,
  'strikeThrough',
);

export const BtnLink = createButton('Link', '🔗', ({ $selection }) => {
  if ($selection?.nodeName === 'A') {
    document.execCommand('unlink');
  } else {
    // eslint-disable-next-line no-alert
    document.execCommand('createLink', false, prompt('URL', '') || undefined);
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
  <UnderLIneButton/>,
  'underline',
);

export const BtnUndo = createButton('Undo', '↶', 'undo');

export function createButton(
  title: string,
  content: ReactNode,
  command: ((state: EditorState) => void) | string,
) {
  ButtonFactory.displayName = title.replace(/\s/g, '');

  return ButtonFactory;

  function ButtonFactory(props: HTMLAttributes<HTMLButtonElement>) {
    const editorState = useEditorState();
    const { $el, $selection } = editorState;

    let active = false;
    if (typeof command === 'string') {
      active = !!$selection && document.queryCommandState(command);
    }

    function onAction(e: MouseEvent<HTMLButtonElement>) {
      e.preventDefault();

      if (document.activeElement !== $el) {
        $el?.focus();
      }

      if (typeof command === 'function') {
        command(editorState);
      } else {
        document.execCommand(command);
      }
    }

    if (editorState.htmlMode) {
      return null;
    }

    return (
      <button
        type="button"
        title={title}
        {...props}
        className="rsw-btn"
        onMouseDown={onAction}
        data-active={active}
      >
        {content}
      </button>
    );
  }
}
