/**
 * title: " "
 * description: Replace the default icon via `icon`, hide the icon with `showIcon={false}`, or disable the shimmer effect with `shimmer={false}`.
 */
import React from 'react';
import { Alert } from 'aero-ui';
import { Sparkles } from 'lucide-react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Alert type="success" icon={Sparkles}>
      Custom icon
    </Alert>
    <Alert type="info" showIcon={false}>
      No icon displayed
    </Alert>
    <Alert type="warning" shimmer={false}>
      Plain text alert without shimmer effect
    </Alert>
  </div>
);
