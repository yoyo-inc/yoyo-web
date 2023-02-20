import React from 'react';

export default function FormPanel(props: React.PropsWithChildren<any>) {
  return <div style={{ width: '640px' }}>{props.children}</div>;
}
