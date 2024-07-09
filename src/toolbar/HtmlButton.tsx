import React from 'react';
import { useEditorState } from '../editor/EditorContext';

export function HtmlButton({ ...rest }) {
  const editorState = useEditorState();

  function onClick() {
    editorState.update({
      htmlMode: !editorState.htmlMode,
    });
  }

  return (
    <button
      className="rsw-btn"
      data-active={editorState.htmlMode}
      onClick={onClick}
      tabIndex={-1}
      title="HTML mode"
      type="button"
      {...rest}
    >
      &lt;/&gt;
    </button>
  );
}
