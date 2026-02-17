import React, { useState } from 'react';
import { Menu } from 'aero-ui';
import { Home, FileText, Settings, Users, BarChart3 } from 'lucide-react';

const items = [
  { key: 'home', label: 'Home', icon: Home },
  {
    key: 'content',
    label: 'Content',
    icon: FileText,
    children: [
      { key: 'articles', label: 'Articles' },
      { key: 'categories', label: 'Categories' },
    ],
  },
  { key: 'data', label: 'Data', icon: BarChart3 },
  { key: 'users', label: 'Users', icon: Users },
  { key: 'settings', label: 'Settings', icon: Settings },
];

export default () => {
  const [selected, setSelected] = useState('home');

  return (
    <Menu
      items={items}
      mode="horizontal"
      selectedKey={selected}
      onSelect={setSelected}
    />
  );
};
