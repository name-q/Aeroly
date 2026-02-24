/**
 * title: " "
 * description: Add addon content outside the input via `addonBefore` and `addonAfter`.
 */
import React from 'react';
import { Input } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 420 }}>
    <Input addonBefore="https://" placeholder="Domain" />
    <Input addonBefore="https://" addonAfter=".com" placeholder="Website name" />
  </div>
);
