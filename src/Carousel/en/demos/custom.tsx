import React, { useRef } from 'react';
import { Carousel, Button } from 'aeroly';
import type { CarouselRef } from 'aeroly';

const items = [
  { key: '1', children: <div style={{ height: 200, background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24 }}>Panel 1</div> },
  { key: '2', children: <div style={{ height: 200, background: 'linear-gradient(135deg, #f093fb, #f5576c)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24 }}>Panel 2</div> },
  { key: '3', children: <div style={{ height: 200, background: 'linear-gradient(135deg, #4facfe, #00f2fe)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24 }}>Panel 3</div> },
  { key: '4', children: <div style={{ height: 200, background: 'linear-gradient(135deg, #43e97b, #38f9d7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24 }}>Panel 4</div> },
];

export default () => {
  const carouselRef = useRef<CarouselRef>(null);

  return (
    <div>
      <Carousel ref={carouselRef} items={items} arrows={false} />
      <div style={{ display: 'flex', gap: 8, marginTop: 12, justifyContent: 'center' }}>
        <Button onClick={() => carouselRef.current?.prev()}>Prev</Button>
        <Button onClick={() => carouselRef.current?.goTo(0)}>Go to 1</Button>
        <Button onClick={() => carouselRef.current?.goTo(2)}>Go to 3</Button>
        <Button onClick={() => carouselRef.current?.next()}>Next</Button>
      </div>
    </div>
  );
};
