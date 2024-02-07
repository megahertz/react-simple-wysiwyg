import React from 'react';
import { Editor, EditorProps } from './Editor';
import { EditorProvider } from './EditorContext';
import {
  BtnAligenLeft,
  BtnAlignCenter,
  BtnAlignRight,
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  HtmlButton,
  Separator,
  Toolbar,
} from '../toolbar';


export function DefaultEditor(props: EditorProps) {
  return (
    <EditorProvider>
      <Editor {...props}>
        <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <Separator />
          <BtnBulletList />
          <BtnNumberedList />
          <Separator />
          <BtnAligenLeft/>
          <BtnAlignCenter/>
          <BtnAlignRight/>
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
}
