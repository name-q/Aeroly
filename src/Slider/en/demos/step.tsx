/**
 * title: " "
 * description: Set the step size via `step`. The slider snaps to step increments when dragging.
 */
import React from 'react';
import { Slider } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
    <Slider defaultValue={30} step={10} />
    <Slider defaultValue={0.4} min={0} max={1} step={0.1} tipFormatter={(v) => `${Math.round(v * 100)}%`} />
  </div>
);
