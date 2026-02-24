/**
 * title: " "
 * description: Control placement via `placement`, supporting four corners.
 */
import React from 'react';
import { notification, Button } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
    <Button onClick={() => notification.open({ title: 'Top Right', description: 'topRight (default)', placement: 'topRight' })}>
      Top Right
    </Button>
    <Button onClick={() => notification.open({ title: 'Top Left', description: 'topLeft', placement: 'topLeft' })}>
      Top Left
    </Button>
    <Button onClick={() => notification.open({ title: 'Bottom Right', description: 'bottomRight', placement: 'bottomRight' })}>
      Bottom Right
    </Button>
    <Button onClick={() => notification.open({ title: 'Bottom Left', description: 'bottomLeft', placement: 'bottomLeft' })}>
      Bottom Left
    </Button>
  </div>
);
