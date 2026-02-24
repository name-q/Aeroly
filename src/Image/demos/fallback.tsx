/**
 * title: " "
 * description: 图片加载失败时展示兜底内容，支持自定义 `fallback`。
 */
import React from 'react';
import { Image } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
    <div style={{ textAlign: 'center' }}>
      <Image
        src="https://broken-url.example/not-found.jpg"
        alt="默认兜底"
        width={160}
        height={120}
      />
      <div style={{ marginTop: 8, fontSize: 12, color: '#999' }}>默认兜底</div>
    </div>
    <div style={{ textAlign: 'center' }}>
      <Image
        src="https://broken-url.example/not-found.jpg"
        alt="自定义兜底"
        width={160}
        height={120}
        fallback={
          <span style={{ fontSize: 13, color: '#999' }}>暂无图片</span>
        }
      />
      <div style={{ marginTop: 8, fontSize: 12, color: '#999' }}>自定义 fallback</div>
    </div>
  </div>
);
