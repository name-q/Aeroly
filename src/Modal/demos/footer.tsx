/**
 * title: " "
 * description: 通过 `footer` 自定义底部操作区，传 `null` 可完全隐藏底部。
 */
import React, { useState } from 'react';
import { Button, Modal } from 'aeroly';

export default () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button onClick={() => setOpen1(true)}>自定义底部</Button>
      <Modal
        open={open1}
        onOpenChange={setOpen1}
        title="自定义 Footer"
        footer={
          <div style={{ display: 'flex', gap: 8, width: '100%', justifyContent: 'space-between' }}>
            <Button type="text" onClick={() => setOpen1(false)}>跳过</Button>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button onClick={() => setOpen1(false)}>上一步</Button>
              <Button type="primary" onClick={() => setOpen1(false)}>下一步</Button>
            </div>
          </div>
        }
      >
        <p>底部操作区完全由你控制。</p>
      </Modal>

      <Button onClick={() => setOpen2(true)}>无底部</Button>
      <Modal open={open2} onOpenChange={setOpen2} title="纯内容" footer={null}>
        <p>这个对话框没有底部操作区，适合纯展示场景。</p>
      </Modal>
    </div>
  );
};
