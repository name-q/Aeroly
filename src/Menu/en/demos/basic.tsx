import React, { useState } from 'react';
import { Menu } from 'aeroui';
import { Home, FileText, Settings, Users } from 'lucide-react';

const items = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'articles', label: 'Articles', icon: FileText },
  { key: 'users', label: 'Users', icon: Users },
  { key: 'settings', label: 'Settings', icon: Settings },
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
