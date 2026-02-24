/**
 * title: " "
 * description: Set `vertical` to display the slider vertically.
 */
import React from 'react';
import { Slider } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', gap: 40, height: 200 }}>
    <Slider vertical defaultValue={30} />
    <Slider vertical range defaultValue={[20, 60]} />
    <Slider vertical defaultValue={50} marks={{ 0: '0', 25: '25', 50: '50', 75: '75', 100: '100' }} />
  </div>
);
