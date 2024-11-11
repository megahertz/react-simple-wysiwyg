import type { ReactNode } from 'react';
import React from 'react';

export const EditorContext = React.createContext<EditorState | undefined>(
  undefined,
);

export function EditorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = React.useState<EditorState>({
    htmlMode: false,
    update,
  });

  function update(attrs: EditorState) {
    setState((prevState) => {
      return {
        ...prevState,
        ...attrs,
      };
    });
  }

  return (
    <EditorContext.Provider value={state}>{children}</EditorContext.Provider>
  );
}

export function useEditorState(): EditorState {
  const context = React.useContext(EditorContext);
  if (!context) {
    throw new Error('You should wrap your component by EditorProvider');
  }

  return context;
}

export interface EditorState {
  update(attrs: Partial<EditorState>): void;
  $el?: HTMLElement;
  $selection?: Node;
  htmlMode: boolean;
}
