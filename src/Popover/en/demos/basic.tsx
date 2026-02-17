/**
 * title: " "
 * description: Hover to trigger, disappears on mouse leave.
 */
import React from 'react';
import { Popover, Button } from 'aero-ui';

export default () => (
  <Popover content="This is some hint content" title="Hint">
    <Button>Hover me</Button>
  </Popover>
);
