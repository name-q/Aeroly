/**
 * title: " "
 * description: Set validation status via `status`.
 */
import React from 'react';
import { TextArea } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 420 }}>
    <TextArea status="error" defaultValue="Error status" />
    <TextArea status="warning" defaultValue="Warning status" />
  </div>
);
