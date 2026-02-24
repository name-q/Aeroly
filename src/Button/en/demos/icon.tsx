/**
 * title: " "
 * description: Pass a Lucide icon via the icon prop. Supports icon + text and icon-only forms.
 */
import React from 'react';
import { Button } from 'aeroly';
import { Search, Plus, Download } from 'lucide-react';

export default () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap:'wrap' }}>
    <Button icon={Search} type="primary" pill>Search</Button>
    <Button icon={Plus}>Add</Button>
    <Button icon={Download} type="text">Download</Button>
    <Button icon={Search} type="primary" />
    <Button icon={Plus} pill/>
  </div>
);
