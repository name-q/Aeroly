/**
 * title: " "
 * description: Set `labelPlacement="vertical"` to place labels below the icons.
 */
import React from 'react';
import { Steps } from 'aeroly';

export default () => (
  <Steps
    current={2}
    labelPlacement="vertical"
    items={[
      { title: 'Select Items' },
      { title: 'Confirm Order' },
      { title: 'Payment' },
      { title: 'Done' },
    ]}
  />
);
