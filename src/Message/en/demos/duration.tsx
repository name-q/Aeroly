/**
 * title: " "
 * description: The second argument customizes the display duration (ms). Default is 3000ms.
 */
import React from 'react';
import { Button, message } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', gap: 12 }}>
    <Button onClick={() => message.success('Closes after 1 second', 1000)}>1 Second</Button>
    <Button onClick={() => message.success('Closes after 10 seconds', 10000)}>10 Seconds</Button>
  </div>
);
