/**
 * title: " "
 * description: The most basic usage. Pass description items via `items`.
 */
import React from 'react';
import { Descriptions } from 'aeroly';

export default () => (
  <Descriptions
    title="User Info"
    items={[
      { label: 'Name', children: 'John Doe' },
      { label: 'Phone', children: '13800138000' },
      { label: 'Region', children: 'Hangzhou, Zhejiang' },
      { label: 'Address', children: '77 Gongzhuan Road, Xihu District' },
      { label: 'Remark', children: 'None' },
    ]}
  />
);
