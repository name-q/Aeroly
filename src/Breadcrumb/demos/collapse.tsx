import React from 'react';
import { Breadcrumb } from 'aeroly';

export default () => (
  <Breadcrumb
    maxItems={3}
    items={[
      { label: '首页', onClick: () => console.log('首页') },
      { label: '一级分类', onClick: () => console.log('一级分类') },
      { label: '二级分类', onClick: () => console.log('二级分类') },
      { label: '三级分类', onClick: () => console.log('三级分类') },
      { label: '四级分类', onClick: () => console.log('四级分类') },
      { label: '当前页面' },
    ]}
  />
);
