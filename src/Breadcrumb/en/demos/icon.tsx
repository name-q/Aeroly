import React from 'react';
import { Breadcrumb } from 'aeroly';
import { Home, Layout, FileText } from 'lucide-react';

export default () => (
  <Breadcrumb
    items={[
      { label: 'Home', icon: Home, onClick: () => console.log('Home') },
      { label: 'Layout', icon: Layout, onClick: () => console.log('Layout') },
      { label: 'Document', icon: FileText },
    ]}
  />
);
