/**
 * title: " "
 * description: 四种类型的警告提示，文字带有光影掠过效果。
 */
import React from 'react';
import { Alert } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Alert type="info">这是一条信息提示</Alert>
    <Alert type="success">操作已成功完成</Alert>
    <Alert type="warning">请注意，此操作不可逆</Alert>
    <Alert type="error">提交失败，请稍后重试</Alert>
  </div>
);
