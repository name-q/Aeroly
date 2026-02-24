/**
 * title: " "
 * description: Use the `indeterminate` prop to implement check all / partial check behavior.
 */
import React, { useState } from 'react';
import { Checkbox } from 'aeroly';

const allOptions = ['Apple', 'Banana', 'Cherry', 'Durian'];

export default () => {
  const [selected, setSelected] = useState<(string | number)[]>(['Apple', 'Cherry']);

  const allChecked = selected.length === allOptions.length;
  const indeterminate = selected.length > 0 && !allChecked;

  const handleCheckAll = (checked: boolean) => {
    setSelected(checked ? [...allOptions] : []);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Checkbox
        checked={allChecked}
        indeterminate={indeterminate}
        onChange={handleCheckAll}
      >
        Check All
      </Checkbox>
      <Checkbox.Group
        options={allOptions}
        value={selected}
        onChange={setSelected}
        style={{ paddingLeft: 24 }}
      />
    </div>
  );
};
