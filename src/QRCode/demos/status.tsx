/**
 * title: " "
 * description: 通过 `status` 控制二维码状态，`expired` 时显示刷新按钮，`loading` 时显示加载动画，`scanned` 时显示已扫描。最后一个演示通过 `statusRender` 完全自定义覆盖层。
 */
import React, { useState } from 'react';
import { QRCode } from 'aeroly';

export default () => {
  const [status, setStatus] = useState<'active' | 'expired' | 'loading' | 'scanned'>('expired');

  return (
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
            <div style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>链接已失效</div>
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
              重新生成
            </button>
          </div>
        )}
        onRefresh={() => {}}
      />
    </div>
  );
};
