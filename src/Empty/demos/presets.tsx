import React from 'react';
import { Empty, Row, Col } from 'aeroly';

export default () => (
  <Row gutter={[16, 16]}>
    <Col span={8}><Empty preset="search" /></Col>
    <Col span={8}><Empty preset="noData" /></Col>
    <Col span={8}><Empty preset="noContent" /></Col>
    <Col span={8}><Empty preset="noPermission" /></Col>
    <Col span={8}><Empty preset="networkError" /></Col>
    <Col span={8}><Empty preset="default" /></Col>
  </Row>
);
