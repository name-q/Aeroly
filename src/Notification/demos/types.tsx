/**
 * title: " "
 * description: 四种类型：`info`、`success`、`warning`、`error`。
 */
import React from 'react';
import { notification, Button } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
    <Button onClick={() => notification.info('信息', '这是一条信息通知')}>Info</Button>
    <Button onClick={() => notification.success('成功', '操作已成功完成')}>Success</Button>
    <Button onClick={() => notification.warning('警告', '请注意检查输入内容')}>Warning</Button>
    <Button onClick={() => notification.error('错误', '网络请求失败，请重试')}>Error</Button>
  </div>
);
