'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function getSelectedNode() {
    if (document.selection) {
        return document.selection.createRange().parentElement();
    }
    var selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
        return selection.getRangeAt(0).startContainer.parentNode || undefined;
    }
    return undefined;
}
function normalizeHtml(str) {
    return str ? str.replace(/&nbsp;|\u202F|\u00A0/g, ' ') : '';
}
function replaceCaret(el) {
    // Place the caret at the end of the element
    var target = document.createTextNode('');
    el.appendChild(target);
    // do not move caret if element was not focused
    var isTargetFocused = document.activeElement === el;
    if (target !== null && target.nodeValue !== null && isTargetFocused) {
        var sel = window.getSelection();
        if (sel !== null) {
            var range = document.createRange();
            range.setStart(target, target.nodeValue.length);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
        if (el instanceof HTMLElement)
            el.focus();
    }
}

/**
 * Based on https://github.com/lovasoa/react-contenteditable
 * A simple component for a html element with editable contents.
 */
var ContentEditable = React.memo(React.forwardRef(function ContentEditable(_a, ref) {
    var className = _a.className, disabled = _a.disabled, tagName = _a.tagName, _b = _a.value, value = _b === void 0 ? '' : _b, rest = __rest(_a, ["className", "disabled", "tagName", "value"]);
    var elRef = React.useRef();
    var htmlRef = React.useRef(value);
    var restRef = React.useRef(rest);
    React.useEffect(function () {
        restRef.current = rest;
        var el = elRef.current;
        if (el && normalizeHtml(htmlRef.current) !== normalizeHtml(value)) {
            htmlRef.current = value;
            el.innerHTML = value;
            replaceCaret(el);
        }
    });
    return React.useMemo(function () {
        function onSetRef($el) {
            elRef.current = $el;
            if (typeof ref === 'function') {
                ref($el);
            }
            else if (typeof ref === 'object' && ref) {
                // eslint-disable-next-line no-param-reassign
                ref.current = $el;
            }
        }
        function onChange(event) {
            var _a, _b;
            var el = elRef.current;
            if (!el) {
                return;
            }
            var elementHtml = el.innerHTML;
            if (elementHtml !== htmlRef.current) {
                (_b = (_a = restRef.current).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, __assign(__assign({}, event), { target: {
                        value: elementHtml,
                        name: rest.name,
                    } }));
            }
            htmlRef.current = elementHtml;
        }
        return React.createElement(tagName || 'div', __assign(__assign({}, rest), { className: className, contentEditable: !disabled, dangerouslySetInnerHTML: { __html: value }, onBlur: function (e) {
                return (restRef.current.onBlur || onChange)(e);
            }, onInput: onChange, onKeyDown: function (e) {
                return (restRef.current.onKeyDown || onChange)(e);
            }, onKeyUp: function (e) {
                return (restRef.current.onKeyUp || onChange)(e);
            }, ref: onSetRef }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [className, disabled, tagName]);
}));

var EditorContext = React.createContext(undefined);
function EditorProvider(_a) {
    var children = _a.children;
    var _b = React.useState({
        htmlMode: false,
        update: update,
    }), state = _b[0], setState = _b[1];
    function update(attrs) {
        setState(function (prevState) {
            return __assign(__assign(__assign({}, prevState), attrs), { date: Date.now() });
        });
    }
    return (React.createElement(EditorContext.Provider, { value: state }, children));
}
function useEditorState() {
    var context = React.useContext(EditorContext);
    if (!context) {
        throw new Error('You should wrap your component by EditorProvider');
    }
    return context;
}

function HtmlEditor(_a) {
    var rest = __rest(_a, []);
    return React.createElement("textarea", __assign({}, rest));
}

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = ".rsw-editor{display:flex;flex-direction:column;min-height:100px;overflow:hidden;position:relative}.rsw-ce{border:1px solid #eeeff3;border-radius:6px;flex:1 0 auto;min-height:164px;outline:none;padding-left:28px;padding-right:8px;padding-top:65px;position:relative}.rsw-ce[contentEditable=true]:empty:not(:focus):before{color:grey;content:attr(placeholder)}.rsw-html{border:none;font-family:Inter,sans-serif}.rsw-ce:focus{border:2px solid #7c91fa}.rsw-separator{background:#eeeff3;height:24px;margin-left:6px;margin-right:6px;width:1px}.rsw-dd{box-sizing:border-box;outline:none}.rsw-btn{align-items:center;background:transparent;border:0;border-radius:6px;cursor:pointer;display:flex;font-size:1em;height:24px;justify-content:center;outline:none;padding:0;width:24px;z-index:1}.rsw-btn:hover,.rsw-btn[data-active=true]{background:#e6eafe}.rsw-toolbar{align-items:center;background-color:#fafbfc;border:1px solid #f4f5f8;border-radius:6px;display:flex;height:32px;padding-left:4px;position:absolute;right:25px;top:25px;width:97%}";
n(css,{});

function Editor(_a) {
    var children = _a.children, containerProps = _a.containerProps, onSelect = _a.onSelect, rest = __rest(_a, ["children", "containerProps", "onSelect"]);
    var editorState = useEditorState();
    React.useEffect(function () {
        document.addEventListener('click', onClickOutside);
        return function () { return document.removeEventListener('click', onClickOutside); };
    });
    function onClickOutside(event) {
        var _a;
        if (event.target === editorState.$el) {
            return;
        }
        if ((_a = editorState.$el) === null || _a === void 0 ? void 0 : _a.contains(event.target)) {
            return;
        }
        editorState.update({ $selection: undefined });
    }
    function onTextSelect(event) {
        onSelect === null || onSelect === void 0 ? void 0 : onSelect(event);
        editorState.update({ $selection: getSelectedNode() });
    }
    function setContentEditableRef($el) {
        editorState.update({ $el: $el });
    }
    if (editorState.htmlMode) {
        return (React.createElement("div", __assign({ className: "rsw-editor" }, containerProps),
            children,
            React.createElement(HtmlEditor, __assign({}, rest, { className: "rsw-ce rsw-html" }))));
    }
    return (React.createElement("div", __assign({ className: "rsw-editor" }, containerProps),
        children,
        React.createElement(ContentEditable, __assign({}, rest, { ref: setContentEditableRef, onSelect: onTextSelect, className: "rsw-ce" }))));
}

function OrderedListIcon() {
    return (React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("path", { d: "M3.52135 8.04332C3.23602 8.26198 3.04135 8.44932 2.93802 8.61065C2.83469 8.77065 2.77202 8.94265 2.75202 9.12265H4.53802V8.62398H3.60869C3.66269 8.56998 3.71002 8.52332 3.75002 8.48998C3.79135 8.45665 3.87135 8.39532 3.99069 8.30998C4.19269 8.16465 4.33135 8.02998 4.40802 7.90732C4.48535 7.78332 4.52335 7.65732 4.52335 7.52198C4.52517 7.40063 4.49007 7.2816 4.42269 7.18065C4.35654 7.07856 4.26067 6.99922 4.14802 6.95332C4.03202 6.90265 3.86869 6.87932 3.65935 6.87932C3.45935 6.87932 3.30135 6.90465 3.18869 6.95532C3.08017 7.0024 2.98823 7.08088 2.92469 7.18065C2.86202 7.27598 2.81869 7.41132 2.79535 7.58332L3.39135 7.63398C3.40802 7.50865 3.44069 7.42265 3.48935 7.37132C3.51376 7.34719 3.54286 7.32835 3.57486 7.31597C3.60686 7.30358 3.64107 7.29791 3.67535 7.29932C3.74869 7.29932 3.80869 7.32265 3.85669 7.37132C3.88006 7.39335 3.89855 7.42004 3.91096 7.44967C3.92336 7.4793 3.9294 7.5112 3.92869 7.54332C3.92457 7.61494 3.89954 7.68378 3.85669 7.74132C3.80735 7.80932 3.69602 7.91065 3.52135 8.04332ZM3.55802 12.3007C3.48861 12.3028 3.42111 12.2777 3.37002 12.2307C3.32069 12.184 3.28469 12.1007 3.26202 11.9787L2.66669 12.0573C2.70602 12.1933 2.76135 12.3053 2.83402 12.3947C2.90669 12.4833 2.99935 12.5513 3.11202 12.5987C3.22402 12.6447 3.37802 12.6673 3.57335 12.6673C3.77335 12.6673 3.93402 12.636 4.05669 12.574C4.17558 12.5146 4.27402 12.421 4.33935 12.3053C4.40469 12.1887 4.43669 12.0693 4.43669 11.9427C4.43913 11.8518 4.41897 11.7618 4.37802 11.6807C4.33864 11.6093 4.28145 11.5493 4.21202 11.5067C4.15254 11.4727 4.08825 11.448 4.02135 11.4333C4.11319 11.3867 4.19217 11.3183 4.25135 11.234C4.30172 11.1585 4.32799 11.0694 4.32669 10.9787C4.32792 10.9025 4.31167 10.8271 4.2792 10.7582C4.24672 10.6893 4.19888 10.6288 4.13935 10.5813C4.01469 10.4753 3.81269 10.4227 3.53335 10.4227C3.29002 10.4227 3.10135 10.4707 2.96869 10.5687C2.83535 10.664 2.74602 10.804 2.69935 10.986L3.26202 11.0867C3.27735 10.9787 3.30669 10.904 3.35069 10.8613C3.39469 10.8187 3.45135 10.796 3.52202 10.796C3.55141 10.7946 3.58077 10.7992 3.60836 10.8094C3.63596 10.8196 3.66123 10.8352 3.68269 10.8553C3.72202 10.8953 3.74069 10.948 3.74069 11.014C3.74069 11.0833 3.71535 11.1427 3.66269 11.194C3.61002 11.2453 3.54469 11.2687 3.46735 11.2687C3.44145 11.2679 3.41561 11.2654 3.39002 11.2613L3.36002 11.694C3.42234 11.6732 3.48711 11.6606 3.55269 11.6567C3.64069 11.6567 3.71069 11.684 3.76135 11.7407C3.81269 11.7953 3.83802 11.8733 3.83802 11.9753C3.83802 12.0727 3.81135 12.1527 3.75869 12.2113C3.73367 12.2398 3.70278 12.2625 3.66814 12.278C3.6335 12.2934 3.59593 12.3011 3.55802 12.3007ZM4.19002 5.57865V3.33398H3.69735C3.63713 3.46848 3.54734 3.58766 3.43469 3.68265C3.32269 3.77732 3.16535 3.85732 2.96269 3.92598V4.42865C3.19059 4.36579 3.40318 4.25688 3.58735 4.10865V5.57932H4.19002V5.57865ZM6.00002 4.00065H13.3334V5.33398H6.00002V4.00065ZM6.00002 7.33398H13.3334V8.66732H6.00002V7.33398ZM6.00002 10.6673H13.3334V12.0007H6.00002V10.6673Z", fill: "#393F63" })));
}

function UnorderedListIcon() {
    return (React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("path", { d: "M2.66669 4H4.00002V5.33333H2.66669V4ZM2.66669 7.33333H4.00002V8.66667H2.66669V7.33333ZM2.66669 10.6667H4.00002V12H2.66669V10.6667ZM13.3334 5.33333V4H5.34869V5.33333H12.5334H13.3334ZM5.33335 7.33333H13.3334V8.66667H5.33335V7.33333ZM5.33335 10.6667H13.3334V12H5.33335V10.6667Z", fill: "#393F63" })));
}

function BoldButton() {
    return (React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("path", { d: "M11.374 7.47935C11.7773 6.96067 11.9974 6.32302 12 5.66602C12 4.01202 10.654 2.66602 9 2.66602H4V12.666H9.33333C10.9873 12.666 12.3333 11.32 12.3333 9.66602C12.3324 9.25515 12.2468 8.84889 12.0817 8.47264C11.9166 8.09639 11.6757 7.75824 11.374 7.47935ZM9 4.66602C9.55133 4.66602 10 5.11468 10 5.66602C10 6.21735 9.55133 6.66602 9 6.66602H6V4.66602H9ZM9.33333 10.666H6V8.66602H9.33333C9.88467 8.66602 10.3333 9.11468 10.3333 9.66602C10.3333 10.2173 9.88467 10.666 9.33333 10.666Z", fill: "#393F63" })));
}

function ItalicButton() {
    return (React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("path", { d: "M12.6667 4.66602V2.66602H6.00004V4.66602H7.91204L6.00804 11.3327H3.33337V13.3327H10V11.3327H8.08804L9.99204 4.66602H12.6667Z", fill: "#393F63" })));
}

function UnderLIneButton() {
    return (React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("path", { d: "M3.33337 11.9993H12.6667V13.3327H3.33337V11.9993ZM4.00004 2.66602V6.66602C4.00004 8.87202 5.79404 10.666 8.00004 10.666C10.206 10.666 12 8.87202 12 6.66602V2.66602H10.6667V6.66602C10.6667 8.13668 9.47071 9.33268 8.00004 9.33268C6.52937 9.33268 5.33337 8.13668 5.33337 6.66602V2.66602H4.00004Z", fill: "#393F63" })));
}

function AlignLeft() {
    return (React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("path", { d: "M2.6665 12.6667H13.3332V14H2.6665V12.6667ZM2.6665 10H9.99984V11.3333H2.6665V10ZM2.6665 7.33333H13.3332V8.66667H2.6665V7.33333ZM2.6665 2H13.3332V3.33333H2.6665V2ZM2.6665 4.66667H9.99984V6H2.6665V4.66667Z", fill: "#393F63" })));
}

function AlignCenter() {
    return (React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("path", { d: "M2.6665 12.6667H13.3332V14H2.6665V12.6667ZM4.6665 10H11.3332V11.3333H4.6665V10ZM2.6665 7.33333H13.3332V8.66667H2.6665V7.33333ZM2.6665 2H13.3332V3.33333H2.6665V2ZM4.6665 4.66667H11.3332V6H4.6665V4.66667Z", fill: "#393F63" })));
}

function AlignRight() {
    return (React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("path", { d: "M2.6665 12.6667H13.3332V14H2.6665V12.6667ZM5.99984 10H13.3332V11.3333H5.99984V10ZM2.6665 7.33333H13.3332V8.66667H2.6665V7.33333ZM2.6665 2H13.3332V3.33333H2.6665V2ZM5.99984 4.66667H13.3332V6H5.99984V4.66667Z", fill: "#393F63" })));
}

var BtnBold = createButton('Bold', React.createElement(BoldButton, null), 'bold');
var BtnBulletList = createButton('Bullet list', React.createElement(UnorderedListIcon, null), 'insertUnorderedList');
var BtnAligenLeft = createButton('Aligen left', React.createElement(AlignLeft, null), 'justifyLeft');
var BtnAlignCenter = createButton('Align center', React.createElement(AlignCenter, null), 'justifyCenter');
var BtnAlignRight = createButton('Aligen right', React.createElement(AlignRight, null), 'justifyRight');
// const toolbar = document.querySelector('.toolbar');
var BtnClearFormatting = createButton('Clear formatting', 'T̲ₓ', 'removeFormat');
var BtnItalic = createButton('Italic', React.createElement(ItalicButton, null), 'italic');
var BtnStrikeThrough = createButton('Strike through', React.createElement("s", null, "ab"), 'strikeThrough');
var BtnLink = createButton('Link', '🔗', function (_a) {
    var $selection = _a.$selection;
    if (($selection === null || $selection === void 0 ? void 0 : $selection.nodeName) === 'A') {
        document.execCommand('unlink');
    }
    else {
        // eslint-disable-next-line no-alert
        document.execCommand('createLink', false, prompt('URL', '') || undefined);
    }
});
var BtnNumberedList = createButton('Numbered list', React.createElement(OrderedListIcon, null), 'insertOrderedList');
var BtnRedo = createButton('Redo', '↷', 'redo');
var BtnUnderline = createButton('Underline', React.createElement(UnderLIneButton, null), 'underline');
var BtnUndo = createButton('Undo', '↶', 'undo');
function createButton(title, content, command) {
    ButtonFactory.displayName = title.replace(/\s/g, '');
    return ButtonFactory;
    function ButtonFactory(props) {
        var editorState = useEditorState();
        var $el = editorState.$el, $selection = editorState.$selection;
        var active = false;
        if (typeof command === 'string') {
            active = !!$selection && document.queryCommandState(command);
        }
        function onAction(e) {
            e.preventDefault();
            if (document.activeElement !== $el) {
                $el === null || $el === void 0 ? void 0 : $el.focus();
            }
            if (typeof command === 'function') {
                command(editorState);
            }
            else {
                document.execCommand(command);
            }
        }
        if (editorState.htmlMode) {
            return null;
        }
        return (React.createElement("button", __assign({ type: "button", title: title }, props, { className: "rsw-btn", onMouseDown: onAction, "data-active": active }), content));
    }
}

var BtnStyles = createDropdown('Styles', [
    ['Normal', 'formatBlock', 'DIV'],
    ['𝗛𝗲𝗮𝗱𝗲𝗿 𝟭', 'formatBlock', 'H1'],
    ['Header 2', 'formatBlock', 'H2'],
    ['𝙲𝚘𝚍𝚎', 'formatBlock', 'PRE'],
]);
function createDropdown(title, items) {
    DropdownFactory.displayName = title;
    return DropdownFactory;
    function DropdownFactory(props) {
        var editorState = useEditorState();
        var $el = editorState.$el, $selection = editorState.$selection, htmlMode = editorState.htmlMode;
        if (htmlMode) {
            return null;
        }
        var activeIndex = items.findIndex(function (item) { return item[1] === 'formatBlock' && ($selection === null || $selection === void 0 ? void 0 : $selection.nodeName) === item[2]; });
        return (React.createElement(Dropdown, __assign({}, props, { onChange: onChange, title: title, items: items, selected: activeIndex })));
        function onChange(e) {
            var target = e.target;
            var selectedValue = target.value;
            var selectedIndex = parseInt(selectedValue, 10);
            var _a = items[selectedIndex], command = _a[1], commandArgument = _a[2];
            e.preventDefault();
            if (document.activeElement !== $el) {
                $el === null || $el === void 0 ? void 0 : $el.focus();
            }
            if (typeof command === 'function') {
                command(editorState);
            }
            else {
                document.execCommand(command, false, commandArgument);
            }
            setTimeout(function () { return (target.value = selectedValue); }, 10);
        }
    }
}
function Dropdown(_a) {
    var items = _a.items, selected = _a.selected, inputProps = __rest(_a, ["items", "selected"]);
    return (React.createElement("select", __assign({}, inputProps, { value: selected, className: "rsw-dd" }),
        React.createElement("option", { hidden: true }, inputProps.title),
        items.map(function (item, index) { return (React.createElement("option", { key: item[2], value: index }, item[0])); })));
}

function HtmlButton(_a) {
    var rest = __rest(_a, []);
    var editorState = useEditorState();
    function onClick() {
        editorState.update({
            htmlMode: !editorState.htmlMode,
        });
    }
    return (React.createElement("button", __assign({ type: "button", title: "HTML mode", className: "rsw-btn", onClick: onClick, "data-active": editorState.htmlMode }, rest), "</>"));
}

function Separator() {
    var editorState = useEditorState();
    if (editorState.htmlMode) {
        return null;
    }
    return React.createElement("div", { className: "rsw-separator" });
}

var tolllll = document.querySelector('.rsw-toolbar');
function Toolbar(props) {
    return React.createElement("div", __assign({}, props, { className: "rsw-toolbar" }));
}

function DefaultEditor(props) {
    return (React.createElement(EditorProvider, null,
        React.createElement(Editor, __assign({}, props),
            React.createElement(Toolbar, null,
                React.createElement(BtnBold, null),
                React.createElement(BtnItalic, null),
                React.createElement(BtnUnderline, null),
                React.createElement(Separator, null),
                React.createElement(BtnBulletList, null),
                React.createElement(BtnNumberedList, null),
                React.createElement(Separator, null),
                React.createElement(BtnAligenLeft, null),
                React.createElement(BtnAlignCenter, null),
                React.createElement(BtnAlignRight, null)))));
}

exports.BtnAligenLeft = BtnAligenLeft;
exports.BtnAlignCenter = BtnAlignCenter;
exports.BtnAlignRight = BtnAlignRight;
exports.BtnBold = BtnBold;
exports.BtnBulletList = BtnBulletList;
exports.BtnClearFormatting = BtnClearFormatting;
exports.BtnItalic = BtnItalic;
exports.BtnLink = BtnLink;
exports.BtnNumberedList = BtnNumberedList;
exports.BtnRedo = BtnRedo;
exports.BtnStrikeThrough = BtnStrikeThrough;
exports.BtnStyles = BtnStyles;
exports.BtnUnderline = BtnUnderline;
exports.BtnUndo = BtnUndo;
exports.ContentEditable = ContentEditable;
exports.DefaultEditor = DefaultEditor;
exports.Dropdown = Dropdown;
exports.Editor = Editor;
exports.EditorContext = EditorContext;
exports.EditorProvider = EditorProvider;
exports.HtmlButton = HtmlButton;
exports.HtmlEditor = HtmlEditor;
exports.Separator = Separator;
exports.Toolbar = Toolbar;
exports.createButton = createButton;
exports.createDropdown = createDropdown;
exports.default = DefaultEditor;
exports.tolllll = tolllll;
exports.useEditorState = useEditorState;
//# sourceMappingURL=index.cjs.js.map
