/**
 * title: " "
 * description: 24-column grid system. Use `span` to control each column's proportion.
 */
import React from 'react';
import { DemoBox } from 'aero-ui';
import { Row, Col } from 'aero-ui';

export default () => (
  <Row gutter={[12, 12]}>
    <Col span={24}><DemoBox w="100%" h={36}>24</DemoBox></Col>
    <Col span={12}><DemoBox w="100%" h={36} color="#36a3d4">12</DemoBox></Col>
    <Col span={12}><DemoBox w="100%" h={36} color="#2b8ab5">12</DemoBox></Col>
    <Col span={8}><DemoBox w="100%" h={36}>8</DemoBox></Col>
    <Col span={8}><DemoBox w="100%" h={36} color="#36a3d4">8</DemoBox></Col>
    <Col span={8}><DemoBox w="100%" h={36} color="#2b8ab5">8</DemoBox></Col>
    <Col span={6}><DemoBox w="100%" h={36}>6</DemoBox></Col>
    <Col span={6}><DemoBox w="100%" h={36} color="#36a3d4">6</DemoBox></Col>
    <Col span={6}><DemoBox w="100%" h={36} color="#2b8ab5">6</DemoBox></Col>
    <Col span={6}><DemoBox w="100%" h={36} color="#1e7a9e">6</DemoBox></Col>
  </Row>
);
