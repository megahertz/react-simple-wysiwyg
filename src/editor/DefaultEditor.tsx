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
import { Editor, IEditorProps } from './Editor';
import { Separator } from '../toolbar/Separator';
import { Toolbar } from '../toolbar/Toolbar';

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
