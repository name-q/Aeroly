/**
 * title: " "
 * description: Use `tooltipVisible` to control tooltip visibility, and `tipFormatter` to customize the format.
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
