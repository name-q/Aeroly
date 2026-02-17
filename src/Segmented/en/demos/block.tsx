/**
 * title: " "
 * description: Set `block` to make the segmented control fill the parent container width, with options equally distributed.
 */
import React from 'react';
import { Segmented } from 'aero-ui';

export default () => (
  <Segmented
    options={['All', 'Unread', 'Read', 'Archived']}
    defaultValue="All"
    block
  />
);
