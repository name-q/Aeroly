import React from 'react';
import { Breadcrumb } from 'aero-ui';
import { Home, Layout, FileText } from 'lucide-react';

export default () => (
  <Breadcrumb
    items={[
      { label: '首页', icon: Home, onClick: () => console.log('首页') },
      { label: '布局', icon: Layout, onClick: () => console.log('布局') },
      { label: '文档', icon: FileText },
    ]}
  />
);
