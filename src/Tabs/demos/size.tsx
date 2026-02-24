import React from 'react';
import { Tabs } from 'aeroui';

const tabItems = [
  { key: '1', label: '标签一', children: <p>面板内容。</p> },
  { key: '2', label: '标签二', children: <p>面板内容。</p> },
  { key: '3', label: '标签三', children: <p>面板内容。</p> },
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
