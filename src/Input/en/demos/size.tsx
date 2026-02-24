/**
 * title: " "
 * description: Three sizes of input.
 */
import React from 'react';
import { Input } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
    <Input size="small" placeholder="Small" />
    <Input size="medium" placeholder="Medium (default)" />
    <Input size="large" placeholder="Large" />
  </div>
);
