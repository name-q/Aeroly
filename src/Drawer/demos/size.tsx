/**
 * title: " "
 * description: 自定义抽屉宽度或高度。
 */
import React, { useState } from 'react';
import { Button, Drawer } from 'aeroly';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>大尺寸抽屉</Button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        title="大尺寸"
        width={600}
      >
        <p>这个抽屉宽度为 600px。</p>
      </Drawer>
    </>
  );
};
