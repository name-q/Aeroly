/**
 * title: " "
 * description: `content` 支持任意 ReactNode，可放置复杂内容。
 */
import React from 'react';
import { Popover, Button } from 'aeroui';

const content = (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 200 }}>
    <div style={{ fontWeight: 500 }}>用户信息</div>
    <div style={{ fontSize: 13, color: '#666' }}>这里可以放置任意内容，如表单、列表、图片等。</div>
    <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
      <Button size="small" type="primary">确认</Button>
      <Button size="small">取消</Button>
    </div>
  </div>
);

export default () => (
  <Popover content={content} trigger="click" placement="bottom">
    <Button>复杂内容</Button>
  </Popover>
);
