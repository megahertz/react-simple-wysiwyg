import * as React from 'react';
import Editor, { IEditorProps } from './Editor';
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  Separator,
  Toolbar,
} from './toolbar';

export default function DefaultEditor(props: IEditorProps) {
  return (
    <Editor {...props}>
      <Toolbar>
        <BtnUndo />
        <BtnRedo />
        <Separator />
        <BtnBold />
        <BtnItalic />
        <BtnUnderline />
        <Separator />
        <BtnNumberedList />
        <BtnBulletList />
        <Separator />
        <BtnLink />
        <BtnClearFormatting />
        <Separator />
        <BtnStyles />
      </Toolbar>
    </Editor>
  );
}
