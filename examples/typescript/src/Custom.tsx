import * as React from 'react';
import {
  BtnBold,
  BtnItalic,
  Editor,
  EditorProvider,
  Toolbar,
} from 'react-simple-wysiwyg';

export default function Custom() {
  const [value, setValue] = React.useState('simple text');

  function onChange(e) {
    setValue(e.target.value);
  }

  return (
    <EditorProvider>
      <Editor value={value} onChange={onChange}>
        <Toolbar>
          <BtnBold />
          <BtnItalic />
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
}
