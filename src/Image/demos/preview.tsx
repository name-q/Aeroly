/**
 * title: " "
 * description: 点击图片打开预览浮层，支持缩放、旋转，按 Esc 关闭。
 */
import React from 'react';
import { Image } from 'aero-ui';

export default () => (
  <Image
    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600"
    previewSrc="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920"
    alt="点击预览"
    width={280}
    height={180}
  />
);
