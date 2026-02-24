/**
 * title: " "
 * description: 禁用和只读状态。
 */
import React from 'react';
import { Input } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
    <Input disabled defaultValue="禁用状态" />
    <Input readOnly defaultValue="只读状态" />
  </div>
);
