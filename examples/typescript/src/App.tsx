import * as React from 'react';
import { DefaultEditor } from 'react-simple-wysiwyg';

export default function App() {
  const [html, setHtml] = React.useState('first line <br> <b>second</b> line');

  function onChange(e) {
    setHtml(e.target.value);
  }

  return (
    <>
      <DefaultEditor
        placeholder="Test 2"
        value={html}
        onChange={onChange}
        title="ed1"
      />
      <hr />
      <DefaultEditor
        value={html}
        onChange={onChange}
        title="ed2"
        placeholder="Test"
      />
      {html}
    </>
  );
}
