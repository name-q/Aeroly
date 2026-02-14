/**
 * title: " "
 * description: 通过 `icon` 传入图片 URL 在二维码中心显示 Logo，组件会自动使用高纠错等级。
 */
import React from 'react';
import { QRCode } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', gap: 24 }}>
    <QRCode
      value="https://github.com"
      icon="https://github.githubassets.com/favicons/favicon-dark.svg"
    />
    <QRCode
      value="https://github.com"
      icon="https://github.githubassets.com/favicons/favicon-dark.svg"
      iconSize={40}
      size={200}
    />
  </div>
);
