import {
  ComponentType,
  createContext,
  PureComponent,
  SyntheticEvent,
} from 'react';
import * as React from 'react';
import ContentEditable, { ICEProps } from './ContentEditable';
import defaultStyles, { IEditorStyles, IStyles } from './styles';
import { deepMerge, getSelectedNode } from './utils';

export const EditorContext = createContext<IEditorContext>({
  styles: defaultStyles,
});

export default class Editor extends PureComponent<IEditorProps, IState> {
  constructor(props: IEditorProps) {
    super(props);

    this.state = {};

    this.onClickOutside = this.onClickOutside.bind(this);
    this.onTextSelect = this.onTextSelect.bind(this);
    this.setContentEditableRef = this.setContentEditableRef.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.onClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickOutside);
  }

  onClickOutside(event: MouseEvent) {
    const { contentEditable } = this.state;

    if (event.target === contentEditable) {
      return;
    }

    if (contentEditable && contentEditable.contains(event.target as any)) {
      return;
    }

    this.setState({ selection: null });
  }

  onTextSelect(e: SyntheticEvent<HTMLElement>) {
    this.props.onSelect && this.props.onSelect(e);
    this.setState({ selection: getSelectedNode() });
  }

  setContentEditableRef(el: HTMLElement) {
    this.setState({ contentEditable: el });
    this.props.contentEditableRef && this.props.contentEditableRef(el);
  }

  render() {
    const { children, styles, ...props } = this.props;
    const { contentEditable, selection } = this.state;

    const allStyles = deepMerge({}, defaultStyles, styles as any);

    const context: IEditorContext = {
      el: contentEditable,
      selection,
      styles: allStyles,
    };

    return (
      <div style={context.styles.editor as any}>
        <EditorContext.Provider value={context}>
          {children}
          <ContentEditable
            {...props}
            contentEditableRef={this.setContentEditableRef}
            onSelect={this.onTextSelect}
            style={allStyles.contentEditable}
          />
        </EditorContext.Provider>
      </div>
    );
  }
}

export function withEditorContext<T extends ComponentType<any>>(
  Component: T,
): T {
  const childName = Component.displayName || Component.name;
  WithEditorContext.displayName = `withEditorContext(${childName})`;

  return WithEditorContext as any;

  function WithEditorContext(props) {
    return (
      <EditorContext.Consumer>
        {(context: IEditorContext) => (
          <Component
            {...props}
            el={context.el}
            selection={context.selection}
            styles={context.styles}
          />
        )}
      </EditorContext.Consumer>
    );
  }
}

export interface IEditorProps extends ICEProps {
  styles?: IEditorStyles;
}

export interface IEditorContext {
  el?: HTMLElement;
  selection?: Node;
  styles?: IStyles;
}

interface IState {
  contentEditable?: HTMLElement;
  selection?: Node;
}
