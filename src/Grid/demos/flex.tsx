/**
 * title: " "
 * description: Col 的 `flex` 属性可以替代 `span`，实现更灵活的弹性布局。
 */
import React from 'react';
import { DemoBox } from 'aeroui';
import { Row, Col } from 'aeroui';

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
