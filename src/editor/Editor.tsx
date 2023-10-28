import type { ComponentProps, SyntheticEvent } from 'react';
import React from 'react';
import { getSelectedNode } from '../utils';
import { ContentEditable, ContentEditableProps } from './ContentEditable';
import { useEditorState } from './EditorContext';
import { HtmlEditor } from './HtmlEditor';
import '../styles.css';

export function Editor({
  children,
  containerProps,
  onSelect,
  ...rest
}: EditorProps) {
  const editorState = useEditorState();

  React.useEffect(() => {
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

    editorState.update({ $selection: undefined });
  }

  function onTextSelect(event: SyntheticEvent<HTMLElement>) {
    onSelect?.(event);
    editorState.update({ $selection: getSelectedNode() });
  }

  function setContentEditableRef($el: HTMLElement) {
    editorState.update({ $el });
  }

  if (editorState.htmlMode) {
    return (
      <div className="rsw-editor" {...containerProps}>
        {children}
        <HtmlEditor {...rest} className="rsw-ce rsw-html" />
      </div>
    );
  }

  return (
    <div className="rsw-editor" {...containerProps}>
      {children}
      <ContentEditable
        {...rest}
        ref={setContentEditableRef}
        onSelect={onTextSelect}
        className="rsw-ce"
      />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EditorProps extends ContentEditableProps {
  containerProps?: ComponentProps<'div'>;
}
