import React from 'react';
import { Carousel } from 'aero-ui';

const items = [
  { key: '1', children: <div style={{ height: 200, background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24 }}>Slide 1</div> },
  { key: '2', children: <div style={{ height: 200, background: 'linear-gradient(135deg, #f093fb, #f5576c)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24 }}>Slide 2</div> },
  { key: '3', children: <div style={{ height: 200, background: 'linear-gradient(135deg, #4facfe, #00f2fe)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24 }}>Slide 3</div> },
  { key: '4', children: <div style={{ height: 200, background: 'linear-gradient(135deg, #43e97b, #38f9d7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24 }}>Slide 4</div> },
];

export default () => <Carousel items={items} />;
