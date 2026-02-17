/**
 * title: " "
 * description: Set `trigger="click"` to trigger on click. Clicking outside closes the popover.
 */
import React from 'react';
import { Popover, Button } from 'aero-ui';

export default () => (
  <Popover
    content="Click outside to close"
    title="Click Trigger"
    trigger="click"
  >
    <Button>Click to open</Button>
  </Popover>
);
