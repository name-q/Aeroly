/**
 * title: " "
 * description: 传入 `value` 即可生成二维码，底部自带下载和复制按钮。
 */
import React from 'react';
import { QRCode } from 'aero-ui';

export default () => (
  <QRCode value="https://github.com" />
);
