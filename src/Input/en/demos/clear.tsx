/**
 * title: " "
 * description: Set `allowClear` to clear input content with one click.
 */
import React from 'react';
import { Input } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
    <Input allowClear placeholder="Type then clear" />
    <Input allowClear defaultValue="Existing content, click to clear" />
  </div>
);
