import React from 'react';
import type { ChangeEvent, FC, HTMLAttributes } from 'react';
import { EditorState, useEditorState } from '../editor/EditorContext';

export const BtnStyles = createDropdown('Styles', [
  ['Normal', 'formatBlock', 'DIV'],
  ['𝗛𝗲𝗮𝗱𝗲𝗿 𝟭', 'formatBlock', 'H1'],
  ['Header 2', 'formatBlock', 'H2'],
  ['𝙲𝚘𝚍𝚎', 'formatBlock', 'PRE'],
]);

export function createDropdown(
  title: string,
  items: DropDownItem[],
): FC<DropDownFactoryProps> {
  DropdownFactory.displayName = title;

  return DropdownFactory;

  function DropdownFactory(props: DropDownFactoryProps) {
    const editorState = useEditorState();
    const { $el, $selection, htmlMode } = editorState;

    if (htmlMode) {
      return null;
    }

    const activeIndex = items.findIndex(
      (item) => item[1] === 'formatBlock' && $selection?.nodeName === item[2],
    );

    return (
      <Dropdown
        {...props}
        items={items}
        onChange={onChange}
        selected={activeIndex}
        tabIndex={-1}
        title={title}
      />
    );

    function onChange(e: ChangeEvent<HTMLSelectElement>) {
      const target = e.target;
      const selectedValue = target.value;
      const selectedIndex = parseInt(selectedValue, 10);

      const [, command, commandArgument] = items[selectedIndex] || [];

      e.preventDefault();

      if (document.activeElement !== $el) {
        $el?.focus();
      }

      if (typeof command === 'function') {
        command(editorState);
      } else if (command) {
        document.execCommand(command, false, commandArgument);
      }

      setTimeout(() => (target.value = selectedValue), 10);
    }
  }
}

export function Dropdown({ items, selected, ...inputProps }: DropdownProps) {
  return (
    <select className="rsw-dd" {...inputProps} value={selected}>
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

export interface DropDownFactoryProps
  extends HTMLAttributes<HTMLSelectElement> {
  selected?: number;
}

export interface DropdownProps extends DropDownFactoryProps {
  items: DropDownItem[];
}
