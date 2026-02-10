/**
 * title: " "
 * description: 四种类型：信息、成功、警告、错误。
 */
import React from 'react';
import { Button, message } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
    <Button onClick={() => message.info('普通信息提示')}>Info</Button>
    <Button onClick={() => message.success('操作成功')}>Success</Button>
    <Button onClick={() => message.warning('请注意')}>Warning</Button>
    <Button onClick={() => message.error('操作失败')}>Error</Button>
  </div>
);
