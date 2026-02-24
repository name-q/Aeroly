/**
 * title: " "
 * description: 支持 4 个方向，溢出视口时自动翻转。
 */
import React from 'react';
import { Tooltip, Button } from 'aeroly';
import type { TooltipPlacement } from 'aeroly';

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
