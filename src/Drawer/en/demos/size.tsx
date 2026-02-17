/**
 * title: " "
 * description: Customize the drawer width or height.
 */
import React, { useState } from 'react';
import { Button, Drawer } from 'aero-ui';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Large Drawer</Button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        title="Large Size"
        width={600}
      >
        <p>This drawer is 600px wide.</p>
      </Drawer>
    </>
  );
};
