/**
 * title: " "
 * description: Shows `99+` when exceeding `overflowCount`. `showZero` controls whether to display when count is 0.
 */
import React from 'react';
import { Badge, Button } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
    <Badge count={999} overflowCount={99}>
      <Button>99+</Button>
    </Badge>
    <Badge count={0} showZero>
      <Button>showZero</Button>
    </Badge>
    <Badge count={0}>
      <Button>Hidden by default</Button>
    </Badge>
  </div>
);
