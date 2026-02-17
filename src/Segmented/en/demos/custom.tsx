/**
 * title: " "
 * description: Pass custom ReactNode via the `label` field in object arrays. Combine icons with text.
 */
import React from 'react';
import { Segmented, Icon } from 'aero-ui';
import { List, LayoutGrid, Columns3 } from 'lucide-react';

export default () => (
  <Segmented
    options={[
      {
        value: 'list',
        label: (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Icon icon={List} size={14} /> List
          </span>
        ),
      },
      {
        value: 'grid',
        label: (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Icon icon={LayoutGrid} size={14} /> Grid
          </span>
        ),
      },
      {
        value: 'column',
        label: (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Icon icon={Columns3} size={14} /> Column
          </span>
        ),
      },
    ]}
    defaultValue="list"
  />
);
