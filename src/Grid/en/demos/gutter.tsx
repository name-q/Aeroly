/**
 * title: " "
 * description: `gutter` supports semantic tokens and `[horizontal, vertical]` arrays to control row and column spacing separately.
 */
import React from 'react';
import { DemoBox } from 'aeroui';
import { Row, Col } from 'aeroui';

export default () => (
  <Row gutter={['lg', 'sm']}>
    {Array.from({ length: 8 }, (_, i) => (
      <Col key={i} span={6}>
        <DemoBox w="100%" h={36} color={i % 2 === 0 ? '#50b8e7' : '#36a3d4'}>
          Col
        </DemoBox>
      </Col>
    ))}
  </Row>
);
