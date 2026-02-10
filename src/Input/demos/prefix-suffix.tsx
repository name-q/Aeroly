/**
 * title: " "
 * description: 通过 `prefixIcon`、`suffixIcon` 添加图标，或通过 `prefix`、`suffix` 添加文字/节点。
 */
import React from 'react';
import { Input } from 'aero-ui';
import { Search, Mail, DollarSign } from 'lucide-react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
    <Input prefixIcon={Search} placeholder="搜索..." />
    <Input suffixIcon={Mail} placeholder="邮箱地址" />
    <Input prefixIcon={DollarSign} suffix=".00" placeholder="金额" />
  </div>
);
