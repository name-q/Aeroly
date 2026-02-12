/**
 * title: " "
 * description: 侧栏在右侧的布局，只需调换 `Sider` 和 `Content` 的顺序。
 */
import React from 'react';
import Layout from 'aero-ui/Layout';

const { Header, Content, Sider } = Layout;

const bar: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 20px',
  color: '#fff',
  fontSize: 13,
};

export default () => (
  <Layout style={{ height: 300, borderRadius: 8, overflow: 'hidden' }}>
    <Header style={{ ...bar, background: '#50b8e7' }}>Header</Header>
    <Layout>
      <Content style={{ padding: 20, background: 'rgba(80,184,231,0.06)', fontSize: 13 }}>
        Content
      </Content>
      <Sider width={180} style={{ background: '#2b8ab5', color: '#fff', padding: 16, fontSize: 13 }}>
        右侧 Sider
      </Sider>
    </Layout>
  </Layout>
);
