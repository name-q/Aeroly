/**
 * title: " "
 * description: Three sizes available: small, medium (default), and large.
 */
import React from 'react';
import { Button } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <Button size="small">Small</Button>
    <Button size="medium">Medium</Button>
    <Button size="large">Large</Button>
  </div>
);
