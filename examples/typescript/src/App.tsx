import * as React from 'react';
import { DefaultEditor } from 'react-simple-wysiwyg';

export default function App() {
  const [html, setHtml] = React.useState('first line <br> <b>second</b> line');

  const onChange = (e) => {
    setHtml(e.target.value);
  };

  return (
    <>
      <DefaultEditor value={html} onChange={onChange} title="ed1" />
      <hr />
      <DefaultEditor value={html} onChange={onChange} title="ed2" />
      {html}
    </>
  );
}
