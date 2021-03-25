import '../styles.css';

import { SyntheticEvent, useEffect } from 'react';
import { getSelectedNode } from '../utils';
import { ContentEditable, ContentEditableProps } from './ContentEditable';
import { useEditorState } from './EditorContext';

export function Editor({ children, onSelect, ...rest }: EditorProps) {
  const editorState = useEditorState();

  useEffect(() => {
    document.addEventListener('click', onClickOutside);
    return () => document.removeEventListener('click', onClickOutside);
  });

  function onClickOutside(event: MouseEvent) {
    if (event.target === editorState.$el) {
      return;
    }

    if (editorState.$el?.contains(event.target as HTMLElement)) {
      return;
    }

    editorState.update({ $selection: null });
  }

  function onTextSelect(event: SyntheticEvent<HTMLElement>) {
    onSelect?.(event);
    editorState.update({ $selection: getSelectedNode() });
  }

  function setContentEditableRef($el: HTMLElement) {
    editorState.update({ $el });
  }

  return (
    <div className="rsw-editor">
      {children}
      <ContentEditable
        {...rest}
        contentEditableRef={setContentEditableRef}
        onSelect={onTextSelect}
        className="rsw-ce"
      />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EditorProps extends ContentEditableProps {}
