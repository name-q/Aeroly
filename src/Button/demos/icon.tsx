/**
 * title: " "
 * description: 通过 icon 属性传入 Lucide 图标，支持图标+文字和纯图标两种形态。
 */
import React from 'react';
import { Button } from 'aero-ui';
import { Search, Plus, Download } from 'lucide-react';

export default () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap:'wrap' }}>
    <Button icon={Search} type="primary" pill>搜索</Button>
    <Button icon={Plus}>新增</Button>
    <Button icon={Download} type="text">下载</Button>
    <Button icon={Search} type="primary" />
    <Button icon={Plus} pill/>
  </div>
);
