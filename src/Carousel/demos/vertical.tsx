import React from 'react';
import { Carousel } from 'aero-ui';

const items = [
  { key: '1', children: <div style={{ height: 240, background: 'linear-gradient(180deg, #e0c3fc, #8ec5fc)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24 }}>Up 1</div> },
  { key: '2', children: <div style={{ height: 240, background: 'linear-gradient(180deg, #f5576c, #f093fb)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24 }}>Up 2</div> },
  { key: '3', children: <div style={{ height: 240, background: 'linear-gradient(180deg, #43e97b, #38f9d7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24 }}>Up 3</div> },
];

export default () => (
  <Carousel items={items} direction="vertical" dotsPosition="right" height={240} />
);
