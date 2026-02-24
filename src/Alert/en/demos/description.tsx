/**
 * title: " "
 * description: Add supplementary text via `description` for scenarios that need more context.
 */
import React from 'react';
import { Alert } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Alert type="info" description="Here is supplementary description text providing more context to help users understand.">
      Information Title
    </Alert>
    <Alert type="success" description="All data has been synced to the cloud and can be viewed on other devices.">
      Sync Complete
    </Alert>
    <Alert type="warning" description="The current version will stop being maintained in 30 days. Please upgrade soon.">
      Version Expiring Soon
    </Alert>
    <Alert type="error" description="Error code: 500. Please contact the administrator or try again later.">
      Server Error
    </Alert>
  </div>
);
