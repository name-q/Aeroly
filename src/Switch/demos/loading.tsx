/**
 * title: " "
 * description: `loading` 状态下开关不可操作，滑块内显示加载动画。
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
