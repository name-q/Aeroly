/**
 * title: " "
 * description: `onOk` 返回 Promise 时，确定按钮自动进入 loading 状态，完成后自动关闭。
 */
import React, { useState } from 'react';
import { Button, Modal } from 'aeroui';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        异步提交
      </Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="提交数据"
        onOk={() => delay(2000)}
      >
        <p>点击确定后将模拟 2 秒异步操作。</p>
      </Modal>
    </>
  );
};
