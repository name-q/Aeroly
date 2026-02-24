import React, { useState } from 'react';
import { ColorPicker } from 'aeroui';

const presets = [
  '#f5222d', '#fa541c', '#fa8c16', '#faad14', '#fadb14',
  '#a0d911', '#52c41a', '#13c2c2', '#1677ff', '#2f54eb',
  '#722ed1', '#eb2f96',
];

export default () => {
  const [color, setColor] = useState('#1677ff');

  return (
    <ColorPicker value={color} onChange={setColor} presets={presets} />
  );
};
