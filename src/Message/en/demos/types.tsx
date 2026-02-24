/**
 * title: " "
 * description: Four types: info, success, warning, and error.
 */
import React from 'react';
import { Button, message } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
    <Button onClick={() => message.info('General info message')}>Info</Button>
    <Button onClick={() => message.success('Operation successful')}>Success</Button>
    <Button onClick={() => message.warning('Please be careful')}>Warning</Button>
    <Button onClick={() => message.error('Operation failed')}>Error</Button>
  </div>
);
