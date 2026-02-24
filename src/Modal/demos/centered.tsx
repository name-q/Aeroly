/**
 * title: " "
 * description: 设置 `centered` 使对话框垂直居中显示。
 */
import React, { useState } from 'react';
import { Button, Modal } from 'aeroui';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>居中对话框</Button>
      <Modal open={open} onOpenChange={setOpen} title="居中显示" centered>
        <p>对话框垂直居中于视口。</p>
      </Modal>
    </>
  );
};
