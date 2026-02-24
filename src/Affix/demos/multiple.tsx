/**
 * title: " "
 * description: 同一页面多个 Affix 实例各自独立工作，互不干扰。左右两个滚动容器各有自己的固定元素。
 */
import React from 'react';
import { Affix, Button, Flex } from 'aeroly';

const containerStyle: React.CSSProperties = {
  height: 300,
  overflow: 'auto',
  border: '1px solid rgba(0,0,0,0.08)',
  borderRadius: 8,
  padding: 16,
  flex: 1,
};

export default () => {
  return (
    <Flex gap={16}>
      <div style={containerStyle}>
        <p style={{ color: '#999', fontSize: 13 }}>容器 A</p>
        <div style={{ height: 60 }} />
        <Affix offsetTop={0}>
          <div style={{ padding: '8px 12px' }}>
            <Button type="primary" size="small">容器 A 固定栏</Button>
          </div>
        </Affix>
        <div style={{ height: 800 }}>
          <p style={{ paddingTop: 40, color: '#bbb' }}>滚动容器 A 的内容...</p>
        </div>
      </div>

      <div style={containerStyle}>
        <p style={{ color: '#999', fontSize: 13 }}>容器 B</p>
        <div style={{ height: 60 }} />
        <Affix offsetTop={0}>
          <div style={{ padding: '8px 12px' }}>
            <Button size="small">容器 B 固定栏</Button>
          </div>
        </Affix>
        <Affix offsetTop={40}>
          <div style={{ padding: '8px 12px' }}>
            <Button size="small" variant="outline">容器 B 第二个固钉（top: 40px）</Button>
          </div>
        </Affix>
        <div style={{ height: 800 }}>
          <p style={{ paddingTop: 40, color: '#bbb' }}>滚动容器 B 的内容...</p>
        </div>
      </div>
    </Flex>
  );
};
