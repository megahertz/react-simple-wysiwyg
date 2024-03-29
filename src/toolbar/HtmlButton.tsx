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
      type="button"
      title="HTML mode"
      className="rsw-btn"
      onClick={onClick}
      data-active={editorState.htmlMode}
      {...rest}
    >
      &lt;/&gt;
    </button>
  );
}
