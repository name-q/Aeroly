/**
 * title: " "
 * description: Disabled and read-only states.
 */
import React from 'react';
import { Input } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
    <Input disabled defaultValue="Disabled" />
    <Input readOnly defaultValue="Read-only" />
  </div>
);
