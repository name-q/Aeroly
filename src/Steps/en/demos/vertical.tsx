/**
 * title: " "
 * description: Set `direction="vertical"` to display steps vertically.
 */
import React from 'react';
import { Steps } from 'aeroui';

export default () => (
  <Steps
    current={2}
    direction="vertical"
    items={[
      { title: 'Order Submitted', description: 'Submitted, awaiting review' },
      { title: 'Under Review', description: 'Estimated 1-2 business days' },
      { title: 'Approved', description: 'Auto-shipped after approval' },
      { title: 'Completed' },
    ]}
  />
);
