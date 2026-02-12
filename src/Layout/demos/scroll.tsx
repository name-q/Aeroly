/**
 * title: " "
 * description: `full` 属性让 Layout 撑满视口高度（`100vh`），适合全屏应用。Content 内容超出时自动滚动。
 */
import React from 'react';
import Layout from 'aero-ui/Layout';

const { Header, Content, Sider, Footer } = Layout;

const bar: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 20px',
  color: '#fff',
  fontSize: 13,
};

export default () => (
  <Layout style={{ height: 400, borderRadius: 8, overflow: 'hidden' }}>
    <Header style={{ ...bar, background: '#50b8e7' }}>Header</Header>
    <Layout>
      <Sider collapsible width={180} style={{ background: '#2b8ab5', color: '#fff', padding: 16, fontSize: 13 }}>
        Sider
      </Sider>
      <Layout>
        <Content style={{ padding: 20, background: 'rgba(80,184,231,0.06)', fontSize: 13 }}>
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i} style={{ margin: '8px 0' }}>内容行 {i + 1} — Content 区域超出时自动滚动</p>
          ))}
        </Content>
        <Footer style={{ ...bar, background: '#36a3d4', height: 40 }}>Footer</Footer>
      </Layout>
    </Layout>
  </Layout>
);
