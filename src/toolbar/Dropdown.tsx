import * as React from 'react';
import { ChangeEvent, HTMLAttributes } from 'react';
import { EditorState, useEditorState } from '../editor/EditorContext';

export const BtnStyles = createDropdown('Styles', [
  ['Normal', 'formatBlock', 'DIV'],
  ['𝗛𝗲𝗮𝗱𝗲𝗿 𝟭', 'formatBlock', 'H1'],
  ['Header 2', 'formatBlock', 'H2'],
  ['𝙲𝚘𝚍𝚎', 'formatBlock', 'PRE'],
]);

function createDropdown(title: string, items: DropDownItem[]): typeof Dropdown {
  DropdownFactory.displayName = title;

  return DropdownFactory;

  function DropdownFactory(props: DropdownProps) {
    const editorState = useEditorState();
    return (
      <Dropdown {...props} onChange={onChange} title={title} items={items} />
    );

    function onChange(e: ChangeEvent<HTMLSelectElement>) {
      const selected = parseInt(e.target.value, 10);
      const [, command, commandArgument] = items[selected];

      e.preventDefault();
      e.target.selectedIndex = 0;

      if (typeof command === 'function') {
        command(editorState);
      } else {
        document.execCommand(command, false, commandArgument);
      }
    }
  }
}

export function Dropdown({ items, selected, ...inputProps }: DropdownProps) {
  return (
    <select {...inputProps} value={selected} className="rsw-dd">
      <option hidden>{inputProps.title}</option>
      {items.map((item, index) => (
        <option key={item[2]} value={index}>
          {item[0]}
        </option>
      ))}
    </select>
  );
}

export type DropDownItem = [
  string,
  string | ((editorState: EditorState) => void),
  string,
];

export interface DropdownProps extends HTMLAttributes<HTMLSelectElement> {
  selected?: number;
  items?: DropDownItem[];
}
