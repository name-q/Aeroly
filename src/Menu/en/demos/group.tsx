import React, { useState } from 'react';
import { Menu } from 'aeroly';
import { Home, FileText, Settings, Users, BarChart3 } from 'lucide-react';

const items = [
  {
    key: 'main-group',
    label: 'Main',
    type: 'group' as const,
    children: [
      { key: 'home', label: 'Home', icon: Home },
      { key: 'articles', label: 'Articles', icon: FileText },
      { key: 'data', label: 'Analytics', icon: BarChart3 },
    ],
  },
  { key: 'd1', label: '', type: 'divider' as const },
  {
    key: 'system-group',
    label: 'System',
    type: 'group' as const,
    children: [
      { key: 'users', label: 'Users', icon: Users },
      { key: 'settings', label: 'Settings', icon: Settings, disabled: true },
    ],
  },
];

export default () => {
  const [selected, setSelected] = useState('home');

  return (
    <Menu
      items={items}
      selectedKey={selected}
      onSelect={setSelected}
    />
  );
};
