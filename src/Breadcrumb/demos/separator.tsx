import React from 'react';
import { Breadcrumb } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Breadcrumb
      separator="/"
      items={[
        { label: '首页', onClick: () => console.log('首页') },
        { label: '组件', onClick: () => console.log('组件') },
        { label: '面包屑' },
      ]}
    />
    <Breadcrumb
      separator=">"
      items={[
        { label: '首页', onClick: () => console.log('首页') },
        { label: '组件', onClick: () => console.log('组件') },
        { label: '面包屑' },
      ]}
    />
  </div>
);
