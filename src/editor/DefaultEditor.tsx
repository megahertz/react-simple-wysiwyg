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
} from '../toolbar/buttons';
import { BtnStyles } from '../toolbar/dropdowns';
import { HtmlButton } from '../toolbar/HtmlButton';
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
          <HtmlButton />
          <Separator />
          <BtnStyles />
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
}
