/**
 * title: " "
 * description: 通过 `open` 和 `onOpenChange` 完全控制显隐。
 */
import React, { useState } from 'react';
import { Tooltip, Button } from 'aeroly';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Tooltip title="受控的 Tooltip" open={open} onOpenChange={setOpen}>
        <Button>受控模式</Button>
      </Tooltip>
      <Button size="small" onClick={() => setOpen((o) => !o)}>
        {open ? '关闭' : '打开'}
      </Button>
    </div>
  );
};
