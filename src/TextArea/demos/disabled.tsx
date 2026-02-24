/**
 * title: " "
 * description: 禁用和只读状态。
 */
import React from 'react';
import { TextArea } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 420 }}>
    <TextArea disabled defaultValue="禁用状态" />
    <TextArea readOnly defaultValue="只读状态，可选中复制但不可编辑" />
  </div>
);
