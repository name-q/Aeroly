/**
 * title: " "
 * description: Pass an image URL via `icon` to display a Logo in the center of the QR code. The component automatically uses high error correction level.
 */
import React from 'react';
import { QRCode, ConfigProvider, enUS } from 'aeroui';

export default () => (
  <ConfigProvider locale={enUS}>
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
  </ConfigProvider>
);
