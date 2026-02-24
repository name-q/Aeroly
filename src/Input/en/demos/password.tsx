/**
 * title: " "
 * description: Set `type="password"` to automatically show a visibility toggle button.
 */
import React from 'react';
import { Input } from 'aeroly';

export default () => (
  <div style={{ maxWidth: 360 }}>
    <Input type="password" placeholder="Enter password" />
  </div>
);
