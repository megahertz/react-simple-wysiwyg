import React from 'react';
import { HTMLAttributes } from 'react';

export function Toolbar(props: HTMLAttributes<HTMLDivElement>) {
  return <div className="rsw-toolbar" {...props} />;
}
