/**
 * title: " "
 * description: 通过 `icon` 传入图片 URL 在二维码中心显示 Logo，组件会自动使用高纠错等级。
 */
import React from 'react';
import { QRCode } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', gap: 24 }}>
    <QRCode
      value="https://github.com"
      icon="https://picsum.photos/64"
    />
    <QRCode
      value="https://github.com"
      icon="https://picsum.photos/80"
      iconSize={40}
    />
  </div>
);
