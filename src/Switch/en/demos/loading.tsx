/**
 * title: " "
 * description: In `loading` state the switch is not operable, and the thumb shows a loading animation.
 */
import React, { useState } from 'react';
import { Switch } from 'aeroly';

export default () => {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (val: boolean) => {
    setLoading(true);
    setTimeout(() => {
      setChecked(val);
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Switch checked={checked} loading={loading} onChange={handleChange} />
      <Switch loading defaultChecked />
    </div>
  );
};
