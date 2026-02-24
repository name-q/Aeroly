/**
 * title: " "
 * description: Breadcrumb is fixed at the top of the content area and does not scroll with content. Content scrolls independently. Achieved through nested Layout.
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

const breadcrumbMap: Record<string, { label: string; onClick?: () => void }[]> =
  {
    home: [{ label: 'Home' }],
    articles: [{ label: 'Home' }, { label: 'Content' }, { label: 'Articles' }],
    categories: [
      { label: 'Home' },
      { label: 'Content' },
      { label: 'Categories' },
    ],
    users: [{ label: 'Home' }, { label: 'Users' }],
    settings: [{ label: 'Home' }, { label: 'Settings' }],
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
              if (item.label === 'Home') setSelected('home');
              if (item.label === 'Content') setSelected('articles');
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
        <span>AeroUI Admin</span>
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
          {/* Breadcrumb fixed at top, does not scroll with content */}
          <div style={{ padding: '12px 20px' }}>
            <Breadcrumb items={crumbs} />
          </div>
          <Content style={{ padding: 20, fontSize: 13 }}>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i} style={{ margin: '8px 0' }}>
                Row {i + 1} — Content scrolls automatically when overflowing
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
            AeroUI ©2025
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
