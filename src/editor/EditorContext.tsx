import { createContext, ReactNode, useContext, useState } from 'react';

export const EditorContext = createContext<EditorState>(null);

export function EditorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EditorState>({
    htmlMode: false,
    update,
  });

  function update(attrs) {
    setState((prevState) => {
      return {
        ...prevState,
        ...attrs,
        date: Date.now(),
      };
    });
  }

  return (
    <EditorContext.Provider value={state}>{children}</EditorContext.Provider>
  );
}

export function useEditorState(): EditorState {
  return useContext(EditorContext);
}

export interface EditorState {
  update(attrs: Partial<EditorState>): void;
  $el?: HTMLElement;
  $selection?: Node;
  htmlMode: boolean;
}
