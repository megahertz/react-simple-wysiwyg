import React, { type ForwardedRef } from 'react';
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
  BtnSubscript,
  BtnSuperscript,
  BtnUnderline,
  BtnUndo,
  BtnSpecialCharacters,
  HtmlButton,
  Separator,
  Toolbar,
} from '../toolbar';

export const DefaultEditor = React.forwardRef(function DefaultEditor(
  props: EditorProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <EditorProvider>
      <Editor {...props} ref={ref}>
        {props.children || (
          <Toolbar>
            <BtnUndo />
            <BtnRedo />
            <Separator />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnSuperscript />
            <BtnSubscript />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
            <BtnClearFormatting />
            <BtnSpecialCharacters />
            <HtmlButton />
            <Separator />
            <BtnStyles />
          </Toolbar>
        )}
      </Editor>
    </EditorProvider>
  );
});
