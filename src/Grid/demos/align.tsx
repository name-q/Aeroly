/**
 * title: " "
 * description: 用 `justify` 和 `align` 控制列的水平与垂直对齐。
 */
import React from 'react';
import { DemoBox } from 'aeroui';
import { Row, Col } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Row gutter={12} justify="center">
      <Col span={4}><DemoBox w="100%" h={36}>居中</DemoBox></Col>
      <Col span={4}><DemoBox w="100%" h={36} color="#36a3d4">居中</DemoBox></Col>
      <Col span={4}><DemoBox w="100%" h={36} color="#2b8ab5">居中</DemoBox></Col>
    </Row>
    <Row gutter={12} justify="between">
      <Col span={4}><DemoBox w="100%" h={36}>两端</DemoBox></Col>
      <Col span={4}><DemoBox w="100%" h={36} color="#36a3d4">两端</DemoBox></Col>
      <Col span={4}><DemoBox w="100%" h={36} color="#2b8ab5">两端</DemoBox></Col>
    </Row>
    <Row gutter={12} justify="end">
      <Col span={4}><DemoBox w="100%" h={36}>靠右</DemoBox></Col>
      <Col span={4}><DemoBox w="100%" h={36} color="#36a3d4">靠右</DemoBox></Col>
      <Col span={4}><DemoBox w="100%" h={36} color="#2b8ab5">靠右</DemoBox></Col>
    </Row>
  </div>
);
