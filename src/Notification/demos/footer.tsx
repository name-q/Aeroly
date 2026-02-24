/**
 * title: " "
 * description: 通过 `footer` 传入底部操作按钮。
 */
import React from 'react';
import { notification, Button } from 'aeroly';

export default () => (
  <Button
    onClick={() =>
      notification.open({
        title: '新版本可用',
        description: '发现新版本 v2.0.0，建议尽快更新以获得最新功能。',
        type: 'info',
        duration: 0,
        footer: (
          <div style={{ display: 'flex', gap: 8 }}>
            <Button size="small">立即更新</Button>
          </div>
        ),
      })
    }
  >
    带操作按钮
  </Button>
);
