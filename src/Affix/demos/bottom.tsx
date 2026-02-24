/**
 * title: " "
 * description: 设置 `offsetBottom` 将元素固定在容器底部，适合表单提交栏、汇总行等场景。
 */
import React from 'react';
import { Affix, Button, Flex } from 'aeroui';

export default () => {
  return (
    <div style={{ height: 300, overflow: 'auto', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 8, padding: 16 }}>
      <div style={{ height: 800 }}>
        <p style={{ color: '#999' }}>向下滚动，底部操作栏始终吸底 ↓</p>
        <p style={{ paddingTop: 40, color: '#bbb' }}>长内容区域...</p>
      </div>
      <Affix offsetBottom={0}>
        <Flex gap={12} style={{ padding: '8px 12px' }}>
          <Button type="primary" size="small">提交</Button>
          <Button size="small">取消</Button>
        </Flex>
      </Affix>
      <div style={{ height: 200 }}>
        <p style={{ paddingTop: 20, color: '#bbb' }}>底部还有更多内容...</p>
      </div>
    </div>
  );
};
