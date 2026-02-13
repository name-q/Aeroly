/**
 * title: " "
 * description: 通过 `marks` 在轨道上标注刻度，设置 `step={null}` 只能选择刻度值。
 */
import React from 'react';
import { Slider } from 'aero-ui';

const marks = { 0: '0°C', 25: '25°C', 50: '50°C', 75: '75°C', 100: '100°C' };

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
    <Slider defaultValue={25} marks={marks} />
    <Slider defaultValue={50} marks={marks} step={null} />
  </div>
);
