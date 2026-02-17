import React from 'react';
import { Carousel } from 'aero-ui';

const items = [
  { key: '1', children: <div style={{ height: 200, background: 'linear-gradient(135deg, #a18cd1, #fbc2eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24 }}>Auto 1</div> },
  { key: '2', children: <div style={{ height: 200, background: 'linear-gradient(135deg, #fad0c4, #ffd1ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24 }}>Auto 2</div> },
  { key: '3', children: <div style={{ height: 200, background: 'linear-gradient(135deg, #ffecd2, #fcb69f)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24 }}>Auto 3</div> },
];

export default () => (
  <Carousel items={items} autoplay autoplayInterval={2500} />
);
