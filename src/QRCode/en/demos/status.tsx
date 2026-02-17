/**
 * title: " "
 * description: Control QR code status via `status`. Shows a refresh button when `expired`, a loading animation when `loading`, and a scanned state for `scanned`. The last example uses `statusRender` for a fully custom overlay.
 */
import React, { useState } from 'react';
import { QRCode, ConfigProvider, enUS } from 'aero-ui';

export default () => {
  const [status, setStatus] = useState<'active' | 'expired' | 'loading' | 'scanned'>('expired');

  return (
    <ConfigProvider locale={enUS}>
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <QRCode
        value="https://github.com"
        status="loading"
      />
      <QRCode
        value="https://github.com"
        status={status}
        onRefresh={() => {
          setStatus('loading');
          setTimeout(() => setStatus('active'), 1500);
        }}
      />
      <QRCode
        value="https://github.com"
        status="scanned"
      />
      <QRCode
        value="https://github.com"
        status="expired"
        statusRender={({ onRefresh }) => (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, marginBottom: 4 }}>⏰</div>
            <div style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>Link expired</div>
            <button
              onClick={onRefresh}
              style={{
                padding: '4px 14px',
                border: 'none',
                borderRadius: 999,
                background: '#722ed1',
                color: '#fff',
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              Regenerate
            </button>
          </div>
        )}
        onRefresh={() => {}}
      />
    </div>
    </ConfigProvider>
  );
};
