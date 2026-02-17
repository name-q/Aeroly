/**
 * title: " "
 * description: Set `closable` to allow users to manually close the alert.
 */
import React from 'react';
import { Alert } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Alert type="info" closable>
      Click the close button on the right to dismiss this alert
    </Alert>
    <Alert
      type="warning"
      closable
      description="Once closed it will not show again. Refresh the page to restore."
      onClose={() => console.log('Closed')}
    >
      Closable Warning Alert
    </Alert>
  </div>
);
