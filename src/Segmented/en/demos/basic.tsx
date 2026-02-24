/**
 * title: " "
 * description: Pass a string array to quickly create a segmented control.
 */
import React from 'react';
import { Segmented } from 'aeroui';

export default () => (
  <Segmented
    options={['Day', 'Week', 'Month', 'Year']}
    onChange={(val) => console.log('Selected:', val)}
  />
);
