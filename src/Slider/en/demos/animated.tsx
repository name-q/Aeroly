/**
 * title: " "
 * description: Track shine flow effect is enabled by default. Set `animated={false}` to disable it.
 */
import React from 'react';
import { Slider } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
    <div>
      <div style={{ marginBottom: 8, fontSize: 13, color: 'var(--aero-text-secondary, #666)' }}>animated (default)</div>
      <Slider defaultValue={60} />
    </div>
    <div>
      <div style={{ marginBottom: 8, fontSize: 13, color: 'var(--aero-text-secondary, #666)' }}>animated={'{false}'}</div>
      <Slider defaultValue={60} animated={false} />
    </div>
  </div>
);
