import { CSSProperties, HTMLAttributes, useState } from 'react';
import * as React from 'react';

export default function Button(props: IProps) {
  const [ hovered, setHovered ] = useState(false);

  const style = {
    ...styles.root,
    ...props.style,
    ...(hovered ? styles.hovered : {}),
    ...(hovered ? props.hoverStyle : {}),
  };

  const onHover = (e) => {
    setHovered(true);
    props.onMouseEnter && props.onMouseEnter(e);
  };

  const onUnHover = (e) => {
    setHovered(false);
    props.onMouseLeave && props.onMouseLeave(e);
  };

  const onMouseDown = (e) => {
    e.preventDefault();
    props.onMouseDown && props.onMouseDown(e);
  };

  return (
    <button
      {...props}
      style={style}
      onMouseDown={onMouseDown}
      onMouseEnter={onHover}
      onMouseLeave={onUnHover}
    />
  );
}

const styles = {
  hovered: {
    backgroundColor: '#e5e5e5',
  },

  root: {
    backgroundColor: 'unset',
    border: 'none',
    height: 24,
    padding: 0,
    verticalAlign: 'top',
    width: 24,
  },
};

export interface IProps extends HTMLAttributes<HTMLButtonElement> {
  hoverStyle?: CSSProperties;
}
