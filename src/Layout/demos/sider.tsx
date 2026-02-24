/**
 * title: " "
 * description: 包含 `Sider` 时自动切换为左右结构，配合 `Menu` 和 `Breadcrumb` 联动。Header 中的按钮控制侧栏收起。
 */
import React, { useState } from 'react';
import Layout from 'aeroly/Layout';
import { Menu, Breadcrumb, Button } from 'aeroly';
import { Home, FileText, Settings, Users, BarChart3, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

const { Header, Content, Sider } = Layout;

const menuItems = [
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
  { key: 'users', label: '用户', icon: Users },
  { key: 'stats', label: '统计', icon: BarChart3 },
  { key: 'settings', label: '设置', icon: Settings },
];

const breadcrumbMap: Record<string, { label: string; onClick?: () => void }[]> = {
  home: [{ label: '首页' }],
  articles: [{ label: '首页' }, { label: '内容管理' }, { label: '文章列表' }],
  categories: [{ label: '首页' }, { label: '内容管理' }, { label: '分类管理' }],
  users: [{ label: '首页' }, { label: '用户' }],
  stats: [{ label: '首页' }, { label: '统计' }],
  settings: [{ label: '首页' }, { label: '设置' }],
};

export default () => {
  const [selected, setSelected] = useState('articles');
  const [collapsed, setCollapsed] = useState(false);

  const crumbs = (breadcrumbMap[selected] || breadcrumbMap.home).map((item, i, arr) => ({
    ...item,
    onClick: i < arr.length - 1
      ? () => {
          if (item.label === '首页') setSelected('home');
          if (item.label === '内容管理') setSelected('articles');
        }
      : undefined,
  }));

  return (
    <Layout style={{ height: 420, borderRadius: 8, overflow: 'hidden' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          background: '#50b8e7',
          color: '#fff',
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        <span>AeroUI Admin</span>
        <Button
          size="small"
          onClick={() => setCollapsed((v) => !v)}
          style={{ color: '#fff' }}
        >
          {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </Button>
      </Header>
      <Layout full>
        <Sider
          width={collapsed ? 56 : 200}
          style={{ background: 'rgba(80,184,231,0.04)', borderRight: '1px solid var(--aero-border-color)' }}
        >
          <Menu
            items={menuItems}
            selectedKey={selected}
            onSelect={setSelected}
            collapsed={collapsed}
            defaultOpenKeys={['content']}
            style={{ padding: '8px 0' }}
          />
        </Sider>
        <Content style={{ padding: 20, fontSize: 13 }}>
          <Breadcrumb items={crumbs} style={{ marginBottom: 16 }} />
          <p>当前选中：{selected}</p>
        </Content>
      </Layout>
    </Layout>
  );
};
