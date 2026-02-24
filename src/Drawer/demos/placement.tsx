/**
 * title: " "
 * description: 通过 `placement` 设置抽屉从上、下、左、右四个方向滑出。
 */
import React, { useState } from 'react';
import { Button, Drawer } from 'aeroly';
import type { DrawerPlacement } from 'aeroly';

export default () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerPlacement>('right');

  const show = (p: DrawerPlacement) => {
    setPlacement(p);
    setOpen(true);
  };

  return (
    <>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Button onClick={() => show('top')}>上</Button>
        <Button onClick={() => show('right')}>右</Button>
        <Button onClick={() => show('bottom')}>下</Button>
        <Button onClick={() => show('left')}>左</Button>
      </div>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        placement={placement}
        title={`${placement} 方向`}
      >
        <p>从 {placement} 方向滑出的抽屉。</p>
      </Drawer>
    </>
  );
};
