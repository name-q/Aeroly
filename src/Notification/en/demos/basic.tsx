/**
 * title: " "
 * description: Simplest usage, auto-closes after 4.5 seconds.
 */
import React from 'react';
import { notification, Button } from 'aeroui';

export default () => (
  <Button onClick={() => notification.info('Notice', 'This is a notification message')}>
    Open Notification
  </Button>
);
