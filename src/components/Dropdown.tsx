import { ChangeEvent, HTMLAttributes } from 'react';
import * as React from 'react';

import { IEditorContext, withEditorContext } from './Editor';

export const BtnStyles = createDropdown('Styles', [
  ['Normal', 'formatBlock', 'DIV'],
  ['𝗛𝗲𝗮𝗱𝗲𝗿 𝟭', 'formatBlock', 'H1'],
  ['Header 2', 'formatBlock', 'H2'],
  ['𝙲𝚘𝚍𝚎', 'formatBlock', 'PRE'],
]);

function createDropdown(
  title: string,
  items: IDropDownItem[],
): typeof Dropdown {
  DropdownFactory.displayName = title;

  return withEditorContext<typeof Dropdown>(DropdownFactory);

  function DropdownFactory(props: IDropdownProps) {
    const { selection, ...ddProps } = props;

    return (
      <Dropdown {...ddProps} onChange={onChange} title={title} items={items} />
    );

    function onChange(e: ChangeEvent<HTMLSelectElement>) {
      const selected = parseInt(e.target.value, 10);
      const [, command, commandArgument] = items[selected];

      e.preventDefault();
      e.target.selectedIndex = 0;

      if (typeof command === 'function') {
        command(selection);
      } else {
        document.execCommand(command, false, commandArgument);
      }
    }
  }
}

export function Dropdown({
  el,
  items,
  selected,
  selection,
  ...inputProps
}: IDropdownProps) {
  return (
    <select {...inputProps} value={selected} className="rswDD">
      <option hidden>{inputProps.title}</option>
      {items.map((item, index) => (
        <option key={item[2]} value={index}>
          {item[0]}
        </option>
      ))}
    </select>
  );
}

type IDropDownItem = any[];

export interface IDropdownProps
  extends HTMLAttributes<HTMLSelectElement>,
  IEditorContext {
  selected?: number;
  items?: IDropDownItem;
}
