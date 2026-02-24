import React from 'react';
import { Breadcrumb } from 'aeroly';

export default () => (
  <Breadcrumb
    items={[
      { label: '首页', onClick: () => console.log('首页') },
      { label: '组件', onClick: () => console.log('组件') },
      { label: '面包屑' },
    ]}
  />
);
