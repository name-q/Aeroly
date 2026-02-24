/**
 * title: " "
 * description: 点击按钮从右侧滑出抽屉。
 */
import React, { useState } from 'react';
import { Button, Drawer } from 'aeroui';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开抽屉
      </Button>
      <Drawer open={open} onOpenChange={setOpen} title="基础抽屉">
        <p>这是抽屉的内容区域。</p>
        <p>点击遮罩或按 Esc 可关闭。</p>
      </Drawer>
    </>
  );
};
