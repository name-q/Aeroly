/**
 * title: " "
 * description: Disabled and read-only states.
 */
import React from 'react';
import { TextArea } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 420 }}>
    <TextArea disabled defaultValue="Disabled" />
    <TextArea readOnly defaultValue="Read-only, can select and copy but not edit" />
  </div>
);
