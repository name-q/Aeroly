/**
 * title: " "
 * description: Supports 4 directions, auto-flips when overflowing the viewport.
 */
import React from 'react';
import { Tooltip, Button } from 'aero-ui';
import type { TooltipPlacement } from 'aero-ui';

const placements: TooltipPlacement[] = ['top', 'bottom', 'left', 'right'];

export default () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
    {placements.map((p) => (
      <Tooltip key={p} title={p} placement={p}>
        <Button size="small">{p}</Button>
      </Tooltip>
    ))}
  </div>
);
