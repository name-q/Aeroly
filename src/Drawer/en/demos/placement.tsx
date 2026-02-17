/**
 * title: " "
 * description: Use `placement` to set the drawer to slide in from top, bottom, left, or right.
 */
import React, { useState } from 'react';
import { Button, Drawer } from 'aero-ui';
import type { DrawerPlacement } from 'aero-ui';

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
        <Button onClick={() => show('top')}>Top</Button>
        <Button onClick={() => show('right')}>Right</Button>
        <Button onClick={() => show('bottom')}>Bottom</Button>
        <Button onClick={() => show('left')}>Left</Button>
      </div>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        placement={placement}
        title={`${placement} direction`}
      >
        <p>Drawer sliding in from the {placement}.</p>
      </Drawer>
    </>
  );
};
