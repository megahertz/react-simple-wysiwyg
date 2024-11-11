import { ComponentProps, ForwardedRef, SyntheticEvent } from 'react';
import React from 'react';
import { getSelectedNode, setForwardRef } from '../utils';
import { ContentEditable, ContentEditableProps } from './ContentEditable';
import { useEditorState } from './EditorContext';
import { HtmlEditor } from './HtmlEditor';
import '../styles.css';

export const Editor = React.forwardRef(function Editor(
  { children, containerProps, onSelect, ...rest }: EditorProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
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

  function onTextSelect(event: SyntheticEvent<HTMLDivElement>) {
    onSelect?.(event);
    editorState.update({ $selection: getSelectedNode() });
  }

  function setContentEditableRef($el: HTMLDivElement) {
    editorState.update({ $el });
    setForwardRef($el, ref);
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
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EditorProps extends ContentEditableProps {
  containerProps?: ComponentProps<'div'>;
}
