import * as React from 'react';

import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnUnderline,
  BtnUndo,
} from './components/Buttons';
import { BtnStyles } from './components/Dropdown';
import { Editor, IEditorProps } from './components/Editor';
import { Separator } from './components/Separator';
import { Toolbar } from './components/Toolbar';

export function DefaultEditor(props: IEditorProps) {
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
