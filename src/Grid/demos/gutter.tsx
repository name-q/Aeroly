/**
 * title: " "
 * description: `gutter` 用 `[水平, 垂直]` 数组分别控制列间距和行间距。
 */
import React from 'react';
import { DemoBox } from 'aeroly';
import { Row, Col } from 'aeroly';

export default () => (
  <Row gutter={[16, 8]}>
    {Array.from({ length: 8 }, (_, i) => (
      <Col key={i} span={6}>
        <DemoBox w="100%" h={36} color={i % 2 === 0 ? '#50b8e7' : '#36a3d4'}>
          Col
        </DemoBox>
      </Col>
    ))}
  </Row>
);
