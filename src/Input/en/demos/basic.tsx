/**
 * title: " "
 * description: Basic input with placeholder text support.
 */
import React from 'react';
import { Input } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
    <Input placeholder="Enter something" />
    <Input defaultValue="With default value" />
  </div>
);
