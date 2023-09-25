import React from 'react';
import { useEditorState } from '../editor/EditorContext';

export function Separator() {
  const editorState = useEditorState();

  if (editorState.htmlMode) {
    return null;
  }

  return <div className="rsw-separator" />;
}
