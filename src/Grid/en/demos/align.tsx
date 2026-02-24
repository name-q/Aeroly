/**
 * title: " "
 * description: Use `justify` and `align` to control horizontal and vertical alignment of columns.
 */
import React from 'react';
import { DemoBox } from 'aeroly';
import { Row, Col } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Row gutter={12} justify="center">
      <Col span={4}><DemoBox w="100%" h={36}>Center</DemoBox></Col>
      <Col span={4}><DemoBox w="100%" h={36} color="#36a3d4">Center</DemoBox></Col>
      <Col span={4}><DemoBox w="100%" h={36} color="#2b8ab5">Center</DemoBox></Col>
    </Row>
    <Row gutter={12} justify="between">
      <Col span={4}><DemoBox w="100%" h={36}>Between</DemoBox></Col>
      <Col span={4}><DemoBox w="100%" h={36} color="#36a3d4">Between</DemoBox></Col>
      <Col span={4}><DemoBox w="100%" h={36} color="#2b8ab5">Between</DemoBox></Col>
    </Row>
    <Row gutter={12} justify="end">
      <Col span={4}><DemoBox w="100%" h={36}>End</DemoBox></Col>
      <Col span={4}><DemoBox w="100%" h={36} color="#36a3d4">End</DemoBox></Col>
      <Col span={4}><DemoBox w="100%" h={36} color="#2b8ab5">End</DemoBox></Col>
    </Row>
  </div>
);
