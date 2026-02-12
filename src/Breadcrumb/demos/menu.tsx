import React from 'react';
import { Breadcrumb } from 'aero-ui';

export default () => (
  <Breadcrumb
    items={[
      { label: '首页', onClick: () => console.log('首页') },
      {
        label: '组件',
        onClick: () => console.log('组件'),
        menu: [
          { label: '数据录入', onClick: () => console.log('数据录入') },
          { label: '数据展示', onClick: () => console.log('数据展示') },
          { label: '导航', onClick: () => console.log('导航') },
        ],
      },
      { label: '面包屑' },
    ]}
  />
);
