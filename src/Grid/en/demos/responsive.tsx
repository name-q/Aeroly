/**
 * title: " "
 * description: Use `xs` `sm` `md` `lg` `xl` breakpoint props for responsive layouts. Resize the browser window to see the effect.
 */
import React from 'react';
import { DemoBox } from 'aero-ui';
import { Row, Col } from 'aero-ui';

export default () => (
  <Row gutter={[12, 12]}>
    <Col xs={24} sm={12} md={8} lg={6}>
      <DemoBox w="100%" h={48}>A</DemoBox>
    </Col>
    <Col xs={24} sm={12} md={8} lg={6}>
      <DemoBox w="100%" h={48} color="#36a3d4">B</DemoBox>
    </Col>
    <Col xs={24} sm={12} md={8} lg={6}>
      <DemoBox w="100%" h={48} color="#2b8ab5">C</DemoBox>
    </Col>
    <Col xs={24} sm={12} md={8} lg={6}>
      <DemoBox w="100%" h={48} color="#1e7a9e">D</DemoBox>
    </Col>
  </Row>
);
