/**
 * title: " "
 * description: 支持 4 个方向，溢出视口时自动翻转。
 */
import React from 'react';
import { Popover, Button } from 'aero-ui';
import type { PopoverPlacement } from 'aero-ui';

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
