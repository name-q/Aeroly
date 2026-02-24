/**
 * title: " "
 * description: When containing a `Sider`, the layout automatically switches to a horizontal structure. Combined with `Menu` and `Breadcrumb` for navigation. The header button controls sidebar collapse.
 */
import React, { useState } from 'react';
import Layout from 'aeroui/Layout';
import { Menu, Breadcrumb, Button } from 'aeroui';
import { Home, FileText, Settings, Users, BarChart3, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

const { Header, Content, Sider } = Layout;

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
  { key: 'stats', label: 'Statistics', icon: BarChart3 },
  { key: 'settings', label: 'Settings', icon: Settings },
];

const breadcrumbMap: Record<string, { label: string; onClick?: () => void }[]> = {
  home: [{ label: 'Home' }],
  articles: [{ label: 'Home' }, { label: 'Content' }, { label: 'Articles' }],
  categories: [{ label: 'Home' }, { label: 'Content' }, { label: 'Categories' }],
  users: [{ label: 'Home' }, { label: 'Users' }],
  stats: [{ label: 'Home' }, { label: 'Statistics' }],
  settings: [{ label: 'Home' }, { label: 'Settings' }],
};

export default () => {
  const [selected, setSelected] = useState('articles');
  const [collapsed, setCollapsed] = useState(false);

  const crumbs = (breadcrumbMap[selected] || breadcrumbMap.home).map((item, i, arr) => ({
    ...item,
    onClick: i < arr.length - 1
      ? () => {
          if (item.label === 'Home') setSelected('home');
          if (item.label === 'Content') setSelected('articles');
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
          <p>Currently selected: {selected}</p>
        </Content>
      </Layout>
    </Layout>
  );
};
