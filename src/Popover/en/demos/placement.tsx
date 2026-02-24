/**
 * title: " "
 * description: Supports 4 directions, auto-flips when overflowing the viewport.
 */
import React from 'react';
import { Popover, Button } from 'aeroui';
import type { PopoverPlacement } from 'aeroui';

const placements: PopoverPlacement[] = ['top', 'bottom', 'left', 'right'];

export default () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
    {placements.map((p) => (
      <Popover key={p} content={`placement: ${p}`} placement={p}>
        <Button size="small">{p}</Button>
      </Popover>
    ))}
  </div>
);
