/**
 * title: " "
 * description: 通过 `footer` 添加底部操作区，适合表单提交等场景。
 */
import React, { useState } from 'react';
import { Button, Drawer } from 'aero-ui';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        带底部操作
      </Button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        title="编辑信息"
        footer={
          <>
            <Button onClick={() => setOpen(false)}>取消</Button>
            <Button type="primary" onClick={() => setOpen(false)}>
              确定
            </Button>
          </>
        }
      >
        <p>这里可以放置表单或其他内容。</p>
        <p>底部的操作按钮始终固定在抽屉底部。</p>
      </Drawer>
    </>
  );
};
