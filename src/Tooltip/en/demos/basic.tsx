/**
 * title: " "
 * description: Hover to trigger, the most basic usage.
 */
import React from 'react';
import { Tooltip, Button } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', gap: 16 }}>
    <Tooltip title="This is a tooltip text">
      <Button>Hover me</Button>
    </Tooltip>
    <Tooltip title="Supports multi-line content with automatic wrapping. When text is long, the Tooltip adapts its width, up to a max of 280px.">
      <Button>Long text</Button>
    </Tooltip>
  </div>
);
