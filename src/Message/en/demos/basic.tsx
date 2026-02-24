/**
 * title: " "
 * description: The simplest usage — one line of code to show a message.
 */
import React from 'react';
import { Button, message } from 'aeroui';

export default () => (
  <Button type="primary" onClick={() => message.info('This is a global message')}>
    Show Message
  </Button>
);
