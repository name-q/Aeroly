/**
 * title: " "
 * description: Set `bordered={false}` to remove the card border and action bar, suitable for embedding in other containers.
 */
import React from 'react';
import { QRCode, ConfigProvider, enUS } from 'aeroui';

export default () => (
  <ConfigProvider locale={enUS}>
    <QRCode value="https://github.com" bordered={false} size={140} />
  </ConfigProvider>
);
