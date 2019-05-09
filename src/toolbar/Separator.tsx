import * as React from 'react';
import { IEditorContext, withEditorContext } from '../Editor';

function Separator(context: IEditorContext) {
  return (
    <span style={context.styles.separator} />
  );
}

const WrappedSeparator = withEditorContext(Separator);
export default WrappedSeparator;
