/**
 * title: " "
 * description: Four types: `info`, `success`, `warning`, `error`.
 */
import React from 'react';
import { notification, Button } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
    <Button onClick={() => notification.info('Info', 'This is an info notification')}>Info</Button>
    <Button onClick={() => notification.success('Success', 'Operation completed successfully')}>Success</Button>
    <Button onClick={() => notification.warning('Warning', 'Please check your input')}>Warning</Button>
    <Button onClick={() => notification.error('Error', 'Network request failed, please retry')}>Error</Button>
  </div>
);
