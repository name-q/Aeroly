/**
 * title: " "
 * description: Use `message.open` with full configuration to customize the icon and close callback.
 */
import React from 'react';
import { Button, message } from 'aeroui';
import { Rocket } from 'lucide-react';

export default () => (
  <Button
    onClick={() =>
      message.open({
        content: 'Custom icon message',
        icon: Rocket,
        duration: 3000,
      })
    }
  >
    Custom Icon
  </Button>
);
