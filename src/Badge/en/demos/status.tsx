/**
 * title: " "
 * description: Standalone status dots. `shimmer` enables the sweep animation.
 */
import React from 'react';
import { Badge } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Badge status="default" statusText="Default" />
    <Badge status="processing" statusText="Processing" shimmer />
    <Badge status="success" statusText="Success" />
    <Badge status="warning" statusText="Warning" />
    <Badge status="error" statusText="Error" shimmer />
  </div>
);
