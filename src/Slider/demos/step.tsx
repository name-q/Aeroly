/**
 * title: " "
 * description: 通过 `step` 设置步长，拖动时按步长吸附。
 */
import React from 'react';
import { Slider } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
    <Slider defaultValue={30} step={10} />
    <Slider defaultValue={0.4} min={0} max={1} step={0.1} tipFormatter={(v) => `${Math.round(v * 100)}%`} />
  </div>
);
