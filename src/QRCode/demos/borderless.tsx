/**
 * title: " "
 * description: 设置 `bordered={false}` 去掉卡片边框和操作栏，适合嵌入其他容器。
 */
import React from 'react';
import { QRCode } from 'aero-ui';

export default () => (
  <QRCode value="https://github.com" bordered={false} size={140} />
);
