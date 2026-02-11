/**
 * title: " "
 * description: 通过 `open` 和 `onOpenChange` 完全控制显隐。
 */
import { Button, Popover } from 'aero-ui';
import React, { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Popover
        content="受控模式的气泡"
        open={open}
        onOpenChange={(val: boolean) =>
          console.log('受控 Popover 当前状态：', val)
        }
        trigger="click"
      >
        受控 Popover
      </Popover>
      <Button size="small" type="primary" onClick={() => setOpen(!open)}>
        {open ? '关闭' : '打开'}
      </Button>
    </div>
  );
};
