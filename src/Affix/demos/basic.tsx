/**
 * title: " "
 * description: 滚动页面，按钮固定在距顶部 0px 处。
 */
import React, { useState } from 'react';
import { Affix, Button, Flex } from 'aeroui';

export default () => {
  const [affixed, setAffixed] = useState(false);

  return (
    <div style={{ height: 300, overflow: 'auto', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 8, padding: 16 }}>
      <p style={{ color: '#999' }}>向下滚动查看效果 ↓</p>
      <div style={{ height: 80 }} />
      <Affix offsetTop={0} onChange={setAffixed}>
        <Flex gap={12} align="center" style={{ padding: '8px 12px' }}>
          <Button type="primary" size="small">保存</Button>
          <span style={{ fontSize: 13, color: '#888' }}>
            {affixed ? '已固定' : '未固定'}
          </span>
        </Flex>
      </Affix>
      <div style={{ height: 800 }}>
        <p style={{ paddingTop: 40, color: '#bbb' }}>长内容区域...</p>
      </div>
    </div>
  );
};
