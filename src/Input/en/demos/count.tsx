/**
 * title: " "
 * description: Use `maxLength` with `showCount` to display character count.
 */
import React from 'react';
import { Input } from 'aero-ui';

export default () => (
  <div style={{ maxWidth: 360 }}>
    <Input maxLength={20} showCount placeholder="Max 20 characters" />
  </div>
);
