/**
 * title: " "
 * description: `offset` controls the left offset of a column by grid units.
 */
import React from 'react';
import { DemoBox } from 'aero-ui';
import { Row, Col } from 'aero-ui';

export default () => (
  <Row gutter={[12, 12]}>
    <Col span={8}><DemoBox w="100%" h={36}>span=8</DemoBox></Col>
    <Col span={8} offset={8}><DemoBox w="100%" h={36} color="#36a3d4">offset=8</DemoBox></Col>
    <Col span={6} offset={6}><DemoBox w="100%" h={36}>offset=6</DemoBox></Col>
    <Col span={6} offset={6}><DemoBox w="100%" h={36} color="#36a3d4">offset=6</DemoBox></Col>
  </Row>
);
