import React from 'react';
import { ColorPicker } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
    <ColorPicker defaultValue="#f5222d" size="small" />
    <ColorPicker defaultValue="#52c41a" size="medium" />
    <ColorPicker defaultValue="#1677ff" size="large" />
  </div>
);
