/**
 * title: " "
 * description: Col's `flex` prop can replace `span` for more flexible elastic layouts.
 */
import React from 'react';
import { DemoBox } from 'aero-ui';
import { Row, Col } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Row gutter={12}>
      <Col flex="100px"><DemoBox w="100%" h={36}>100px</DemoBox></Col>
      <Col flex={1}><DemoBox w="100%" h={36} color="#36a3d4">flex=1</DemoBox></Col>
    </Row>
    <Row gutter={12}>
      <Col flex="100px"><DemoBox w="100%" h={36}>100px</DemoBox></Col>
      <Col flex={1}><DemoBox w="100%" h={36} color="#36a3d4">flex=1</DemoBox></Col>
      <Col flex={1}><DemoBox w="100%" h={36} color="#2b8ab5">flex=1</DemoBox></Col>
    </Row>
    <Row gutter={12}>
      <Col flex={2}><DemoBox w="100%" h={36}>flex=2</DemoBox></Col>
      <Col flex={1}><DemoBox w="100%" h={36} color="#36a3d4">flex=1</DemoBox></Col>
    </Row>
  </div>
);
