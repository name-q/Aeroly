/**
 * title: " "
 * description: 通过 `message.open` 传入完整配置，可自定义图标和关闭回调。
 */
import React from 'react';
import { Button, message } from 'aeroui';
import { Rocket } from 'lucide-react';

export default () => (
  <Button
    onClick={() =>
      message.open({
        content: '自定义图标提示',
        icon: Rocket,
        duration: 3000,
      })
    }
  >
    自定义图标
  </Button>
);
