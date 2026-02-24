/**
 * title: " "
 * description: Set `duration` to `0` to disable auto-close. Must be closed manually via the close button.
 */
import React from 'react';
import { notification, Button } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', gap: 8 }}>
    <Button onClick={() => notification.info('Custom Duration', 'Closes after 2 seconds', { duration: 2000 })}>
      2s Close
    </Button>
    <Button onClick={() => notification.info('No Auto Close', 'Must click the close button manually', { duration: 0 })}>
      No Auto Close
    </Button>
  </div>
);
