/**
 * title: " "
 * description: Four types of alert messages with a shimmer sweep effect on the text.
 */
import React from 'react';
import { Alert } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Alert type="info">This is an informational message</Alert>
    <Alert type="success">Operation completed successfully</Alert>
    <Alert type="warning">Please note, this action is irreversible</Alert>
    <Alert type="error">Submission failed, please try again later</Alert>
  </div>
);
