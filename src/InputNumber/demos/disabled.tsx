/**
 * title: " "
 * description: 禁用和只读状态。`controls={false}` 可隐藏步进按钮。
 */
import React from 'react';
import { InputNumber } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <InputNumber defaultValue={10} disabled placeholder="禁用" />
    <InputNumber defaultValue={10} readOnly placeholder="只读" />
    <InputNumber defaultValue={10} controls={false} placeholder="无步进按钮" />
  </div>
);
