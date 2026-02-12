/**
 * title: " "
 * description: 设置 `collapsible` 启用收起功能，点击触发器切换侧栏宽度。支持 `collapsed` 受控。
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
      <Sider
        collapsible
        width={200}
        collapsedWidth={48}
        style={{ background: '#2b8ab5', color: '#fff', padding: '16px 0', fontSize: 13 }}
      >
        <div style={{ padding: '0 16px' }}>菜单区域</div>
      </Sider>
      <Content style={{ padding: 20, background: 'rgba(80,184,231,0.06)', fontSize: 13 }}>
        点击侧栏右侧的圆形按钮收起/展开。
      </Content>
    </Layout>
  </Layout>
);
