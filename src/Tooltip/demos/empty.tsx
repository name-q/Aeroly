/**
 * title: " "
 * description: `title` 为空时不显示 Tooltip。
 */
import React, { useState } from 'react';
import { Tooltip, Button } from 'aeroui';

export default () => {
  const [show, setShow] = useState(true);

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Tooltip title={show ? '现在有提示' : ''}>
        <Button>条件提示</Button>
      </Tooltip>
      <Button size="small" onClick={() => setShow((s) => !s)}>
        {show ? '清空 title' : '设置 title'}
      </Button>
    </div>
  );
};
