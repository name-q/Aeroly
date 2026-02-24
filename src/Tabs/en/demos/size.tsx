import React from 'react';
import { Tabs } from 'aeroui';

const tabItems = [
  { key: '1', label: 'Tab 1', children: <p>Panel content.</p> },
  { key: '2', label: 'Tab 2', children: <p>Panel content.</p> },
  { key: '3', label: 'Tab 3', children: <p>Panel content.</p> },
];

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Tabs items={tabItems} size="small" />
      <Tabs items={tabItems} size="medium" />
      <Tabs items={tabItems} size="large" />
    </div>
  );
};
