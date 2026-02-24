/**
 * title: " "
 * description: Set `size="small"` to use the mini version.
 */
import React from 'react';
import { Steps } from 'aeroui';

export default () => (
  <Steps
    current={2}
    size="small"
    items={[
      { title: 'Login' },
      { title: 'Shop' },
      { title: 'Pay' },
      { title: 'Done' },
    ]}
  />
);
