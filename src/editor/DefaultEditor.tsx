import React from 'react';
import { Editor, EditorProps } from './Editor';
import { EditorProvider } from './EditorContext';
import {
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
          <BtnUndo />
          <BtnRedo />
          <Separator />
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
          <BtnClearFormatting />
          <HtmlButton />
          <Separator />
          <BtnStyles />
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
}
