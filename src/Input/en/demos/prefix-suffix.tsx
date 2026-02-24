/**
 * title: " "
 * description: Add icons via `prefixIcon` / `suffixIcon`, or text/nodes via `prefix` / `suffix`.
 */
import React from 'react';
import { Input } from 'aeroly';
import { Search, Mail, DollarSign } from 'lucide-react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
    <Input prefixIcon={Search} placeholder="Search..." />
    <Input suffixIcon={Mail} placeholder="Email address" />
    <Input prefixIcon={DollarSign} suffix=".00" placeholder="Amount" />
  </div>
);
