/**
 * title: " "
 * description: 通过 `icon` 替换默认图标，`showIcon={false}` 隐藏图标，`shimmer={false}` 关闭光影效果。
 */
import React from 'react';
import { Alert } from 'aeroui';
import { Sparkles } from 'lucide-react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Alert type="success" icon={Sparkles}>
      自定义图标
    </Alert>
    <Alert type="info" showIcon={false}>
      不显示图标
    </Alert>
    <Alert type="warning" shimmer={false}>
      关闭光影效果的纯文字提示
    </Alert>
  </div>
);
