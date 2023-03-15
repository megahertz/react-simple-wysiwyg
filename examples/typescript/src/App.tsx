import * as React from 'react';
import RswEditor from 'react-simple-wysiwyg';

export default function App() {
  const [html, setHtml] = React.useState('first line <br> <b>second</b> line');

  function onChange(e) {
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
      <RswEditor
        value={html}
        onChange={onChange}
        title="ed2"
        placeholder="Test"
      />
      {html}
    </>
  );
}
