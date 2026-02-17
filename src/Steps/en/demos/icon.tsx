/**
 * title: " "
 * description: Specify custom icons for steps via `icon`.
 */
import React from 'react';
import { UserRound, ShieldCheck, Rocket } from 'lucide-react';
import { Steps } from 'aero-ui';

export default () => (
  <Steps
    current={2}
    items={[
      { title: 'Register', icon: UserRound },
      { title: 'Verify', icon: ShieldCheck },
      { title: 'Launch', icon: Rocket },
    ]}
  />
);
