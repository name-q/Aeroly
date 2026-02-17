/**
 * title: " "
 * description: Three button types: default, primary, and text.
 */
import React from 'react';
import { Button } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <Button>Default</Button>
    <Button type="primary">Primary</Button>
    <Button type="text">Text</Button>
  </div>
);
