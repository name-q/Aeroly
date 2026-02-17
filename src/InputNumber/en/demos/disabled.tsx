/**
 * title: " "
 * description: Disabled and read-only states. `controls={false}` hides the step buttons.
 */
import React from 'react';
import { InputNumber } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <InputNumber defaultValue={10} disabled placeholder="Disabled" />
    <InputNumber defaultValue={10} readOnly placeholder="Read-only" />
    <InputNumber defaultValue={10} controls={false} placeholder="No step buttons" />
  </div>
);
