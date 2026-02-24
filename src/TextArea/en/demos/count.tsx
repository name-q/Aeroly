/**
 * title: " "
 * description: Use `maxLength` with `showCount` to display character count.
 */
import React from 'react';
import { TextArea } from 'aeroly';

export default () => (
  <div style={{ maxWidth: 420 }}>
    <TextArea maxLength={200} showCount placeholder="Max 200 characters" autoSize={{ minRows: 2, maxRows: 8 }} />
  </div>
);
