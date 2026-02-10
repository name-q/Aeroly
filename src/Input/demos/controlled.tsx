/**
 * title: " "
 * description: 受控模式下，值完全由外部状态驱动。
 */
import React, { useState } from 'react';
import { Input } from 'aero-ui';

export default () => {
  const [value, setValue] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 }}>
      <Input
        value={value}
        onChange={setValue}
        placeholder="受控输入"
        allowClear
      />
      <div style={{ fontSize: 13, color: '#888' }}>
        当前值：{value || '（空）'}
      </div>
    </div>
  );
};
