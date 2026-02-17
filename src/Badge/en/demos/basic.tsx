/**
 * title: " "
 * description: Basic usage, displays a number badge at the top-right corner.
 */
import React from 'react';
import { Badge, Button } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
    <Badge count={5}>
      <Button>Messages</Button>
    </Badge>
    <Badge count={25}>
      <Button>Notifications</Button>
    </Badge>
    <Badge count={100}>
      <Button>To-do</Button>
    </Badge>
  </div>
);
