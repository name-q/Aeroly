import React, { useState } from 'react';
import { Menu, Button } from 'aeroly';
import { Home, FileText, Settings, Users, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

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
  { key: 'users', label: 'Users', icon: Users },
  { key: 'settings', label: 'Settings', icon: Settings },
];

export default () => {
  const [selected, setSelected] = useState('home');
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Button
        onClick={() => setCollapsed(!collapsed)}
        icon={collapsed ? PanelLeftOpen : PanelLeftClose}
        size="small"
        style={{ alignSelf: 'flex-start' }}
      />
      <Menu
        items={items}
        selectedKey={selected}
        onSelect={setSelected}
        collapsed={collapsed}
      />
    </div>
  );
};
