import React, { useState } from 'react';
import { Menu } from 'aeroui';
import { Home, FileText, Settings, Users, BarChart3, Shield } from 'lucide-react';

const items = [
  { key: 'home', label: 'Home', icon: Home },
  {
    key: 'content',
    label: 'Content',
    icon: FileText,
    children: [
      { key: 'articles', label: 'Articles' },
      { key: 'categories', label: 'Categories' },
      { key: 'tags', label: 'Tags' },
    ],
  },
  {
    key: 'users',
    label: 'User Center',
    icon: Users,
    children: [
      { key: 'user-list', label: 'User List' },
      {
        key: 'permissions',
        label: 'Permissions',
        icon: Shield,
        children: [
          { key: 'roles', label: 'Roles' },
          { key: 'policies', label: 'Policies' },
        ],
      },
    ],
  },
  {
    key: 'data',
    label: 'Analytics',
    icon: BarChart3,
    children: [
      { key: 'overview', label: 'Overview' },
      { key: 'reports', label: 'Reports' },
    ],
  },
  { key: 'settings', label: 'Settings', icon: Settings },
];

export default () => {
  const [selected, setSelected] = useState('home');

  return (
    <Menu
      items={items}
      selectedKey={selected}
      onSelect={setSelected}
      defaultOpenKeys={['content']}
    />
  );
};
