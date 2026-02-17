/**
 * title: " "
 * description: Pass `value` to generate a QR code. Download and copy buttons are built into the bottom bar.
 */
import React from 'react';
import { QRCode, ConfigProvider, enUS } from 'aero-ui';

export default () => (
  <ConfigProvider locale={enUS}>
    <QRCode value="https://github.com" />
  </ConfigProvider>
);
