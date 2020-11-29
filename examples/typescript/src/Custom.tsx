import * as React from 'react';
import {
  BtnBold,
  BtnItalic,
  Editor,
  IEditorStyles,
  Toolbar,
} from 'react-simple-wysiwyg';

export default function Custom() {
  const [value, setValue] = React.useState('simple text');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Editor value={value} onChange={onChange} styles={styles}>
      <Toolbar>
        <BtnBold />
        <BtnItalic />
      </Toolbar>
    </Editor>
  );
}

const styles: IEditorStyles = {
  editor: {
    height: 200,
  },
};
