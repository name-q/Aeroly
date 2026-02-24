/**
 * title: " "
 * description: Show a small dot instead of a number.
 */
import React from 'react';
import { Badge, Button } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
    <Badge dot>
      <Button>Messages</Button>
    </Badge>
    <Badge dot>
      <span style={{ fontSize: 14 }}>New Feature</span>
    </Badge>
  </div>
);
