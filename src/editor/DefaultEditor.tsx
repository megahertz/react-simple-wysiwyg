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
} from '../toolbar/Buttons';
import { BtnStyles } from '../toolbar/Dropdown';
import { Editor, EditorProps } from './Editor';
import { Separator } from '../toolbar/Separator';
import { Toolbar } from '../toolbar/Toolbar';
import { EditorProvider } from './EditorContext';

export function DefaultEditor(props: EditorProps) {
  return (
    <EditorProvider>
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
    </EditorProvider>
  );
}
