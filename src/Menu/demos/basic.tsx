import React, { useState } from 'react';
import { Menu } from 'aeroly';
import { Home, FileText, Settings, Users } from 'lucide-react';

const items = [
  { key: 'home', label: '首页', icon: Home },
  { key: 'articles', label: '文章管理', icon: FileText },
  { key: 'users', label: '用户管理', icon: Users },
  { key: 'settings', label: '系统设置', icon: Settings },
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
