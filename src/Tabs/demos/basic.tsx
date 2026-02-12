import React from 'react';
import { Tabs } from 'aero-ui';

export default () => {
  return (
    <Tabs
      items={[
        { key: '1', label: '概览', children: <p>这里是概览面板的内容。</p> },
        { key: '2', label: '详情', children: <p>这里是详情面板的内容。</p> },
        { key: '3', label: '设置', children: <p>这里是设置面板的内容。</p> },
      ]}
    />
  );
};
