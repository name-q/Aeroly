/**
 * title: " "
 * description: 设置 `tooltipVisible` 控制提示气泡的显示，`tipFormatter` 自定义格式。
 */
import React from 'react';
import { Slider } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
    <Slider defaultValue={30} tooltipVisible />
    <Slider defaultValue={50} tipFormatter={(v) => `${v}%`} />
    <Slider defaultValue={70} tipFormatter={null} />
  </div>
);
