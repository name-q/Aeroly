/**
 * title: " "
 * description: Set validation status via `status` for visual feedback.
 */
import React from 'react';
import { Input } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
    <Input status="error" defaultValue="Error status" />
    <Input status="warning" defaultValue="Warning status" />
  </div>
);
