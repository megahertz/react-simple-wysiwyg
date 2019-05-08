import * as React from 'react';

export default function Separator() {
  return (
    <span style={styles} />
  );
}

const styles = {
  backgroundColor: '#ddd',
  display: 'inline-block',
  margin: 2,
  height: 20,
  verticalAlign: 'top',
  width: 1,
};
