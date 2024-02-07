import React from 'react';
import { HTMLAttributes } from 'react';
export const tolllll = document.querySelector('.rsw-toolbar');

export function Toolbar(props: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className="rsw-toolbar" />;
}
