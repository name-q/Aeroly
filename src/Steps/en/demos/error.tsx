/**
 * title: " "
 * description: Set `status="error"` to mark the current step as an error state.
 */
import React from 'react';
import { Steps } from 'aeroui';

export default () => (
  <Steps
    current={2}
    status="error"
    items={[
      { title: 'Submit Info' },
      { title: 'Verification Failed', description: 'Identity info mismatch' },
      { title: 'Done' },
    ]}
  />
);
