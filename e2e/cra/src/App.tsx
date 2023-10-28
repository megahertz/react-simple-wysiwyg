import React from 'react';
import RswEditor, { type ContentEditableEvent } from 'react-simple-wysiwyg';

export default function App() {
  const [html, setHtml] = React.useState('');

  function onChange(e: ContentEditableEvent) {
    setHtml(e.target.value);
  }

  return (
    <>
      <RswEditor
        containerProps={{ style: { resize: 'vertical' } }}
        placeholder="Test 2"
        value={html}
        onChange={onChange}
        title="ed1"
      />
      <hr />
      <textarea data-testid="text" value={html} />
    </>
  );
}
