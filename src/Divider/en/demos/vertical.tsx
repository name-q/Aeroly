/**
 * title: " "
 * description: Used to separate inline elements.
 */
import React from 'react';
import { Divider } from 'aeroui';

export default () => (
  <div>
    <span>Home</span>
    <Divider direction="vertical" />
    <span>Docs</span>
    <Divider direction="vertical" />
    <span>About</span>
  </div>
);
