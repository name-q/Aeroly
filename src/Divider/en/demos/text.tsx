/**
 * title: " "
 * description: Embed text via children. Use orientation to control text position.
 */
import React from 'react';
import { Divider } from 'aero-ui';

export default () => (
  <div>
    <Divider>Center Text</Divider>
    <Divider orientation="left">Left Text</Divider>
    <Divider orientation="right">Right Text</Divider>
  </div>
);
