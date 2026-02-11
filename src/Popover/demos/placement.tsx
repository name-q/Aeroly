/**
 * title: " "
 * description: 支持 12 个方向，自动翻转避免溢出视口。
 */
import React from 'react';
import { Popover, Button } from 'aero-ui';
import type { PopoverPlacement } from 'aero-ui';

const placements: PopoverPlacement[] = [
  'topLeft', 'top', 'topRight',
  'leftTop', 'rightTop',
  'left', 'right',
  'leftBottom', 'rightBottom',
  'bottomLeft', 'bottom', 'bottomRight',
];

export default () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, maxWidth: 480, justifyContent: 'center' }}>
    {placements.map((p) => (
      <Popover key={p} content={`placement: ${p}`} placement={p}>
        <Button size="small">{p}</Button>
      </Popover>
    ))}
  </div>
);
