/**
 * title: " "
 * description: 通过对象数组的 `label` 字段传入自定义 ReactNode，可组合图标与文字。
 */
import React from 'react';
import { Segmented, Icon } from 'aeroly';
import { List, LayoutGrid, Columns3 } from 'lucide-react';

export default () => (
  <Segmented
    options={[
      {
        value: 'list',
        label: (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Icon icon={List} size={14} /> 列表
          </span>
        ),
      },
      {
        value: 'grid',
        label: (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Icon icon={LayoutGrid} size={14} /> 网格
          </span>
        ),
      },
      {
        value: 'column',
        label: (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Icon icon={Columns3} size={14} /> 分栏
          </span>
        ),
      },
    ]}
    defaultValue="list"
  />
);
