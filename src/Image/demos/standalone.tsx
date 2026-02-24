/**
 * title: " "
 * description: 通过 `Image.Preview` 独立拉起预览浮层，不依赖 Image 组件渲染图片。适合按钮触发、缩略图查看大图等场景。
 */
import React, { useState } from 'react';
import { Image, Button } from 'aeroui';

const images = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200',
];

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>查看相册</Button>
      <Image.Preview
        open={open}
        onOpenChange={setOpen}
        images={images}
      />
    </>
  );
};
