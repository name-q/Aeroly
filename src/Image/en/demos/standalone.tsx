/**
 * title: " "
 * description: Use `Image.Preview` to open a standalone preview overlay without rendering an Image component. Suitable for button-triggered or thumbnail-to-full-image scenarios.
 */
import React, { useState } from 'react';
import { Image, Button } from 'aeroly';

const images = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200',
];

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>View Album</Button>
      <Image.Preview
        open={open}
        onOpenChange={setOpen}
        images={images}
      />
    </>
  );
};
