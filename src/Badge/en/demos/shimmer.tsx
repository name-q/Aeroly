/**
 * title: " "
 * description: Enable `shimmer` to add a sweep animation to the badge, suitable for strong attention scenarios.
 */
import React from 'react';
import { Badge, Button } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
    <Badge count={5} shimmer>
      <Button>New Messages</Button>
    </Badge>
    <Badge dot shimmer>
      <Button>Updates</Button>
    </Badge>
    <Badge text="NEW" shimmer>
      <Button>New Feature</Button>
    </Badge>
  </div>
);
