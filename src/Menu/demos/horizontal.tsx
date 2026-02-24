import React, { useState } from 'react';
import { Menu } from 'aeroui';
import { Home, FileText, Settings, Users, BarChart3 } from 'lucide-react';

const items = [
  { key: 'home', label: '首页', icon: Home },
  {
    key: 'content',
    label: '内容',
    icon: FileText,
    children: [
      { key: 'articles', label: '文章列表' },
      { key: 'categories', label: '分类管理' },
    ],
  },
  { key: 'data', label: '数据', icon: BarChart3 },
  { key: 'users', label: '用户', icon: Users },
  { key: 'settings', label: '设置', icon: Settings },
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
