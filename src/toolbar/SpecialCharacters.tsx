import React from 'react';
import type { HTMLAttributes } from 'react';
import { useEditorState } from '../editor/EditorContext';
import { CHARS } from './chars';
import { createButton } from './buttons';

export function BtnSpecialCharacters(props: HTMLAttributes<HTMLButtonElement>) {
  const [isOpen, setIsOpen] = React.useState(false);
  const editorState = useEditorState();

  const { title = 'Special characters' } = props;

  const insertChar = (char: string) => {
    document.execCommand('insertText', false, char);
    setIsOpen(false);
  };

  const ButtonComponent = React.useMemo(() => {
    return createButton(title, <span>Ω</span>, () => setIsOpen(true));
  }, [title]);

  if (editorState.htmlMode) return null;

  return (
    <>
      <ButtonComponent {...props} />

      {isOpen && (
        <>
          <div
            className="rsw-click-disabler"
            onClick={() => setIsOpen(false)}
          />
          <div className="rsw-modal">
            <header>
              <h3>{title}</h3>
              <button
                aria-label="Close"
                onClick={() => setIsOpen(false)}
                className="rsw-btn"
              >
                ×
              </button>
            </header>
            <main>
              {CHARS.map((char, i) => (
                <button
                  aria-label={`Insert ${char}`}
                  key={i}
                  onClick={() => insertChar(char)}
                  className="rsw-btn"
                  title={`Insert ${char}`}
                >
                  {char}
                </button>
              ))}
            </main>
          </div>
        </>
      )}
    </>
  );
}
