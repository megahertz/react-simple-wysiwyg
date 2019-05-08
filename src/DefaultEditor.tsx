import { CSSProperties } from 'react';
import * as React from 'react';
import ContentEditable, { ICEProps } from './ContentEditable';
import {
  Bold,
  ClearFormatting,
  Italic,
  Link,
  OrderedList,
  Redo,
  Underline,
  Undo,
  UnorderedList,
} from './toolbar/buttons';
import Separator from './toolbar/Separator';
import Toolbar from './toolbar/Toolbar';

export default function DefaultEditor(props: IProps) {
  const containerStyle = {
    ...styles.root,
    ...props.containerStyle,
  };

  const contentEditableStyle = {
    ...styles.contentEditable,
    ...props.style,
  };

  return (
    <div style={containerStyle}>
      <Toolbar>
        <Undo />
        <Redo />
        <Separator />
        <Bold />
        <Italic />
        <Underline />
        <Separator />
        <OrderedList />
        <UnorderedList />
        <Separator />
        <Link />
        <ClearFormatting />
      </Toolbar>
      <ContentEditable {...props} style={contentEditableStyle} />
    </div>
  );
}

export interface IProps extends ICEProps {
  containerStyle?: CSSProperties;
}

const styles = {
  contentEditable: {
    flex: 1,
  },

  root: {
    border: '1px solid #ddd',
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'column' as any,
    minHeight: 100,
  },
};
