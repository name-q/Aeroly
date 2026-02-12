import React, { useState } from 'react';
import { Menu } from 'aero-ui';
import { Home, FileText, Settings, Users, FolderOpen, BarChart3, Shield, Bell } from 'lucide-react';

const items = [
  { key: 'home', label: '首页', icon: Home },
  {
    key: 'content',
    label: '内容管理',
    icon: FileText,
    children: [
      { key: 'articles', label: '文章列表' },
      { key: 'categories', label: '分类管理' },
      { key: 'tags', label: '标签管理' },
    ],
  },
  {
    key: 'users',
    label: '用户中心',
    icon: Users,
    children: [
      { key: 'user-list', label: '用户列表' },
      {
        key: 'permissions',
        label: '权限管理',
        icon: Shield,
        children: [
          { key: 'roles', label: '角色管理' },
          { key: 'policies', label: '策略配置' },
        ],
      },
    ],
  },
  {
    key: 'data',
    label: '数据统计',
    icon: BarChart3,
    children: [
      { key: 'overview', label: '数据概览' },
      { key: 'reports', label: '报表导出' },
    ],
  },
  { key: 'settings', label: '系统设置', icon: Settings },
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
