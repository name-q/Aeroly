import React, { useState } from 'react';
import { Menu, Button } from 'aeroui';
import { Home, FileText, Settings, Users, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

const items = [
  { key: 'home', label: '首页', icon: Home },
  {
    key: 'content',
    label: '内容管理',
    icon: FileText,
    children: [
      { key: 'articles', label: '文章列表' },
      { key: 'categories', label: '分类管理' },
    ],
  },
  { key: 'users', label: '用户管理', icon: Users },
  { key: 'settings', label: '系统设置', icon: Settings },
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
