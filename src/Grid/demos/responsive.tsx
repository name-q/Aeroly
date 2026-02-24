/**
 * title: " "
 * description: 通过 `xs` `sm` `md` `lg` `xl` 断点属性实现响应式布局，缩放浏览器窗口查看效果。
 */
import React from 'react';
import { DemoBox } from 'aeroui';
import { Row, Col } from 'aeroui';

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
