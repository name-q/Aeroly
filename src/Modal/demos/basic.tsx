/**
 * title: " "
 * description: 点击按钮打开对话框，自带确定/取消按钮。
 */
import React, { useState } from 'react';
import { Button, Modal } from 'aeroly';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开对话框
      </Button>
      <Modal open={open} onOpenChange={setOpen} title="基础对话框">
        <p>这是对话框的内容区域。</p>
        <p>点击遮罩、按 Esc 或点击取消均可关闭。</p>
      </Modal>
    </>
  );
};
