/// <reference types="react" />
import React from "react";
import { HTMLAttributes, SyntheticEvent, ComponentProps, ReactNode, FC } from "react";
/**
 * Based on https://github.com/lovasoa/react-contenteditable
 * A simple component for a html element with editable contents.
 */
declare const ContentEditable: React.MemoExoticComponent<React.ForwardRefExoticComponent<ContentEditableProps & React.RefAttributes<HTMLElement>>>;
type ContentEditableEvent = SyntheticEvent<any, Event> & {
    target: {
        name?: string;
        value: string;
    };
};
interface ContentEditableProps extends HTMLAttributes<HTMLElement> {
    disabled?: boolean;
    contentEditableRef?: (el: HTMLElement) => void;
    name?: string;
    onChange?: (event: ContentEditableEvent) => void;
    tagName?: string;
    value?: string;
}
declare function Editor({ children, containerProps, onSelect, ...rest }: EditorProps): React.JSX.Element;
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EditorProps extends ContentEditableProps {
    containerProps?: ComponentProps<"div">;
}
declare function DefaultEditor(props: EditorProps): React.JSX.Element;
declare const EditorContext: React.Context<EditorState | undefined>;
declare function EditorProvider({ children }: {
    children: ReactNode;
}): React.JSX.Element;
declare function useEditorState(): EditorState;
interface EditorState {
    update(attrs: Partial<EditorState>): void;
    $el?: HTMLElement;
    $selection?: Node;
    htmlMode: boolean;
}
declare function HtmlEditor({ ...rest }: {
    [x: string]: any;
}): React.JSX.Element;
declare const BtnBold: {
    (props: HTMLAttributes<HTMLButtonElement>): React.JSX.Element | null;
    displayName: string;
};
declare const BtnBulletList: {
    (props: HTMLAttributes<HTMLButtonElement>): React.JSX.Element | null;
    displayName: string;
};
declare const BtnAligenLeft: {
    (props: HTMLAttributes<HTMLButtonElement>): React.JSX.Element | null;
    displayName: string;
};
declare const BtnAlignCenter: {
    (props: HTMLAttributes<HTMLButtonElement>): React.JSX.Element | null;
    displayName: string;
};
declare const BtnAlignRight: {
    (props: HTMLAttributes<HTMLButtonElement>): React.JSX.Element | null;
    displayName: string;
};
// const toolbar = document.querySelector('.toolbar');
declare const BtnClearFormatting: {
    (props: HTMLAttributes<HTMLButtonElement>): React.JSX.Element | null;
    displayName: string;
};
declare const BtnItalic: {
    (props: HTMLAttributes<HTMLButtonElement>): React.JSX.Element | null;
    displayName: string;
};
declare const BtnStrikeThrough: {
    (props: HTMLAttributes<HTMLButtonElement>): React.JSX.Element | null;
    displayName: string;
};
declare const BtnLink: {
    (props: HTMLAttributes<HTMLButtonElement>): React.JSX.Element | null;
    displayName: string;
};
declare const BtnNumberedList: {
    (props: HTMLAttributes<HTMLButtonElement>): React.JSX.Element | null;
    displayName: string;
};
declare const BtnRedo: {
    (props: HTMLAttributes<HTMLButtonElement>): React.JSX.Element | null;
    displayName: string;
};
declare const BtnUnderline: {
    (props: HTMLAttributes<HTMLButtonElement>): React.JSX.Element | null;
    displayName: string;
};
declare const BtnUndo: {
    (props: HTMLAttributes<HTMLButtonElement>): React.JSX.Element | null;
    displayName: string;
};
declare function createButton(title: string, content: ReactNode, command: ((state: EditorState) => void) | string): {
    (props: HTMLAttributes<HTMLButtonElement>): React.JSX.Element | null;
    displayName: string;
};
declare const BtnStyles: React.FC<DropDownFactoryProps>;
declare function createDropdown(title: string, items: DropDownItem[]): FC<DropDownFactoryProps>;
declare function Dropdown({ items, selected, ...inputProps }: DropdownProps): React.JSX.Element;
type DropDownItem = [
    string,
    string | ((editorState: EditorState) => void),
    string
];
interface DropDownFactoryProps extends HTMLAttributes<HTMLSelectElement> {
    selected?: number;
}
interface DropdownProps extends DropDownFactoryProps {
    items: DropDownItem[];
}
declare function HtmlButton({ ...rest }: {
    [x: string]: any;
}): React.JSX.Element;
declare function Separator(): React.JSX.Element | null;
declare const tolllll: Element | null;
declare function Toolbar(props: HTMLAttributes<HTMLDivElement>): React.JSX.Element;
export { ContentEditable, ContentEditableEvent, ContentEditableProps, DefaultEditor, DefaultEditor as default, Editor, EditorProps, EditorContext, EditorProvider, useEditorState, EditorState, HtmlEditor, BtnBold, BtnBulletList, BtnAligenLeft, BtnAlignCenter, BtnAlignRight, BtnClearFormatting, BtnItalic, BtnStrikeThrough, BtnLink, BtnNumberedList, BtnRedo, BtnUnderline, BtnUndo, createButton, BtnStyles, createDropdown, Dropdown, DropDownItem, DropDownFactoryProps, DropdownProps, HtmlButton, Separator, tolllll, Toolbar };
