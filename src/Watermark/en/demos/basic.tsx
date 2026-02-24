/**
 * title: " "
 * description: Simplest usage — pass `content` to generate a text watermark.
 */
import React from 'react';
import { Watermark } from 'aeroly';

export default () => (
  <Watermark content="AeroUI">
    <div style={{ height: 300 }} />
  </Watermark>
);
