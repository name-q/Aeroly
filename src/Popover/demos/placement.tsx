/**
 * title: " "
 * description: 支持 4 个方向，溢出视口时自动翻转。
 */
import React from 'react';
import { Popover, Button } from 'aeroly';
import type { PopoverPlacement } from 'aeroly';

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
