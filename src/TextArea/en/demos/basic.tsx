/**
 * title: " "
 * description: Auto-resizes to fit content by default, growing naturally as you type.
 */
import React from 'react';
import { TextArea } from 'aeroly';

export default () => (
  <div style={{ maxWidth: 420 }}>
    <TextArea placeholder="Type something, height adjusts automatically..." />
  </div>
);
