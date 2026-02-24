import React, { useState } from 'react';
import { Menu } from 'aeroui';
import { Home, FileText, Settings, Users, BarChart3 } from 'lucide-react';

const items = [
  {
    key: 'main-group',
    label: '主要功能',
    type: 'group' as const,
    children: [
      { key: 'home', label: '首页', icon: Home },
      { key: 'articles', label: '文章管理', icon: FileText },
      { key: 'data', label: '数据统计', icon: BarChart3 },
    ],
  },
  { key: 'd1', label: '', type: 'divider' as const },
  {
    key: 'system-group',
    label: '系统',
    type: 'group' as const,
    children: [
      { key: 'users', label: '用户管理', icon: Users },
      { key: 'settings', label: '系统设置', icon: Settings, disabled: true },
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
