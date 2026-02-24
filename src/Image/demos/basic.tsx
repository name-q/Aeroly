/**
 * title: " "
 * description: 基础图片展示，支持设置宽高和圆角。
 */
import React from 'react';
import { Image } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
    <Image
      src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600"
      alt="风景"
      width={240}
      height={160}
    />
    <Image
      src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600"
      alt="自然"
      width={160}
      height={160}
      borderRadius={999}
    />
  </div>
);
