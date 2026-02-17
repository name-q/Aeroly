/**
 * title: " "
 * description: Pass action buttons via `footer`.
 */
import React from 'react';
import { notification, Button } from 'aero-ui';

export default () => (
  <Button
    onClick={() =>
      notification.open({
        title: 'New Version Available',
        description: 'A new version v2.0.0 has been found. Please update soon to get the latest features.',
        type: 'info',
        duration: 0,
        footer: (
          <div style={{ display: 'flex', gap: 8 }}>
            <Button size="small">Update Now</Button>
          </div>
        ),
      })
    }
  >
    With Action Button
  </Button>
);
