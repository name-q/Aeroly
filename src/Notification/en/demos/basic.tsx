/**
 * title: " "
 * description: Simplest usage, auto-closes after 4.5 seconds.
 */
import React from 'react';
import { notification, Button } from 'aero-ui';

export default () => (
  <Button onClick={() => notification.info('Notice', 'This is a notification message')}>
    Open Notification
  </Button>
);
