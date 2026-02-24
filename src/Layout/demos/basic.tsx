/**
 * title: " "
 * description: 最常见的上-中-下结构。`Content` 自动撑满剩余空间。
 */
import React from 'react';
import Layout from 'aeroui/Layout';

const { Header, Content, Footer } = Layout;

const bar: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 20px',
  color: '#fff',
  fontSize: 13,
};

export default () => (
  <Layout style={{ height: 280, borderRadius: 8, overflow: 'hidden' }}>
    <Header style={{ ...bar, background: '#50b8e7' }}>Header</Header>
    <Content style={{ padding: 20, background: 'rgba(80,184,231,0.06)', fontSize: 13 }}>
      Content 自动撑满剩余高度
    </Content>
    <Footer style={{ ...bar, background: '#36a3d4', height: 40 }}>Footer</Footer>
  </Layout>
);
