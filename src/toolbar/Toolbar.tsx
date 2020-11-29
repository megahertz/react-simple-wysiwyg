import * as React from 'react';

export default function Toolbar(props: React.HTMLAttributes<HTMLDivElement>) {
  const rootStyle = {
    ...styles.root,
    ...props.style,
  };

  return (
    <div {...props} style={rootStyle} />
  );
}

const styles = {
  root: {
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #ddd',
  },
};
