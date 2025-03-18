import React from 'react';
import { useEditorState } from '../editor/EditorContext';

export function Separator(props: React.HTMLAttributes<HTMLDivElement>) {
  const editorState = useEditorState();

  if (editorState.htmlMode) {
    return null;
  }

  return <div className="rsw-separator" {...props} />;
}
