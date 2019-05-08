import { ReactNode } from 'react';
import * as React from 'react';
import { getSelectedNode } from '../utils';
import Button from './Button';
import OrderedListIcon from './icons/OrderedListIcon';
import UnorderedListIcon from './icons/UnorderedListIcon';

// tslint:disable:max-line-length

function createButton(
  title: string,
  content: ReactNode,
  command: string | Function,
) {
  return (props: React.HTMLAttributes<HTMLButtonElement>) => {
    return (
      <Button title={title} {...props} onClick={action}>
        {content}
      </Button>
    );

    function action() {
      if (typeof command === 'function') {
        command();
      } else {
        document.execCommand(command);
      }
    }
  };
}

export const Bold = createButton('Bold', '𝐁', 'bold');
export const ClearFormatting = createButton('Clear formatting', '𝘛̲ₓ', 'removeFormat');
export const Italic = createButton('Italic', '𝑰', 'italic');
export const Link = createButton('Link', '🔗', () => {
  const selected = getSelectedNode();
  if (selected && selected.nodeName === 'A') {
    document.execCommand('unlink');
  } else {
    document.execCommand('createLink', true, prompt('URL'));
  }
});
export const OrderedList = createButton('Numbered list', <OrderedListIcon />, 'insertOrderedList');
export const Redo = createButton('Redo', '↷', 'redo');
export const Underline = createButton('Underline', <span style={{ textDecoration: 'underline' }}>𝐔</span>, 'underline');
export const Undo = createButton('Undo', '↶', 'undo');
export const UnorderedList = createButton('Bullet list', <UnorderedListIcon />, 'insertUnorderedList');
