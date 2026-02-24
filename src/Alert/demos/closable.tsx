/**
 * title: " "
 * description: 设置 `closable` 允许用户手动关闭提示。
 */
import React from 'react';
import { Alert } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Alert type="info" closable>
      点击右侧关闭按钮可以关闭此提示
    </Alert>
    <Alert
      type="warning"
      closable
      description="关闭后将不再显示，刷新页面可恢复。"
      onClose={() => console.log('已关闭')}
    >
      可关闭的警告提示
    </Alert>
  </div>
);
