/**
 * title: " "
 * description: 自定义前景色、背景色和尺寸。
 */
import React from 'react';
import { QRCode } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
    <QRCode value="https://github.com" size={120} color="#1677ff" />
    <QRCode value="https://github.com" size={160} color="#722ed1" />
    <QRCode value="https://github.com" size={200} color="#13c2c2" bgColor="#f0f5ff" />
  </div>
);
