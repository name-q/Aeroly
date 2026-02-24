/**
 * title: " "
 * description: Breadcrumb 固定在内容区顶部不随滚动，Content 内部独立滚动。通过 Layout 嵌套实现分层。
 */
import { Breadcrumb, Button, Menu } from 'aeroly';
import Layout from 'aeroly/Layout';
import {
  FileText,
  Home,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Users,
} from 'lucide-react';
import React, { useState } from 'react';

const { Header, Content, Sider, Footer } = Layout;

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
  { key: 'settings', label: '设置', icon: Settings },
];

const breadcrumbMap: Record<string, { label: string; onClick?: () => void }[]> =
  {
    home: [{ label: '首页' }],
    articles: [{ label: '首页' }, { label: '内容管理' }, { label: '文章列表' }],
    categories: [
      { label: '首页' },
      { label: '内容管理' },
      { label: '分类管理' },
    ],
    users: [{ label: '首页' }, { label: '用户' }],
    settings: [{ label: '首页' }, { label: '设置' }],
  };

export default () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState('articles');

  const crumbs = (breadcrumbMap[selected] || breadcrumbMap.home).map(
    (item, i, arr) => ({
      ...item,
      onClick:
        i < arr.length - 1
          ? () => {
              if (item.label === '首页') setSelected('home');
              if (item.label === '内容管理') setSelected('articles');
            }
          : undefined,
    }),
  );

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
        <span>Aeroly Admin</span>
        <Button
          size="small"
          onClick={() => setCollapsed((v) => !v)}
          style={{ color: '#fff' }}
        >
          {collapsed ? (
            <PanelLeftOpen size={16} />
          ) : (
            <PanelLeftClose size={16} />
          )}
        </Button>
      </Header>
      <Layout full>
        <Sider
          width={collapsed ? 56 : 200}
          style={{
            background: 'rgba(80,184,231,0.04)',
            borderRight: '1px solid var(--aero-border-color)',
          }}
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
        <Layout full>
          {/* Breadcrumb 固定在顶部，不随内容滚动 */}
          <div style={{ padding: '12px 20px' }}>
            <Breadcrumb items={crumbs} />
          </div>
          <Content style={{ padding: 20, fontSize: 13 }}>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i} style={{ margin: '8px 0' }}>
                内容行 {i + 1} — Content 超出时自动滚动
              </p>
            ))}
          </Content>
          <Footer
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 20px',
              background: '#36a3d4',
              color: '#fff',
              fontSize: 12,
              height: 36,
            }}
          >
            Aeroly ©2026
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
