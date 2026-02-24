/**
 * title: " "
 * description: The simplest step bar. Use `current` to specify the current step.
 */
import React from 'react';
import { Steps } from 'aeroui';

export default () => (
  <Steps
    current={2}
    items={[
      { title: 'Create Account', description: 'Register basic info' },
      { title: 'Verify Identity', description: 'Complete verification' },
      { title: 'Done', description: 'Start using' },
    ]}
  />
);
