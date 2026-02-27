import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import {
  ConfigProvider,
  Icon,
  Button,
  Divider,
  Flex,
  Row,
  Col,
  Layout,
  Alert,
  Tag,
  Badge,
  Empty,
  Spin,
  Skeleton,
  Statistic,
  Image,
  QRCode,
} from '../index';
import { Home } from 'lucide-react';

describe('Smoke Tests — Basic', () => {
  it('ConfigProvider', () => {
    const { container } = render(<ConfigProvider>hi</ConfigProvider>);
    expect(container).toBeTruthy();
  });

  it('Icon', () => {
    const { container } = render(<Icon icon={Home} />);
    expect(container.querySelector('.aero-icon')).toBeTruthy();
  });

  it('Button', () => {
    const { container } = render(<Button>Click</Button>);
    expect(container.querySelector('.aero-button')).toBeTruthy();
  });

  it('Divider', () => {
    const { container } = render(<Divider />);
    expect(container.querySelector('.aero-divider')).toBeTruthy();
  });

  it('Flex', () => {
    const { container } = render(<Flex><span>a</span></Flex>);
    expect(container.querySelector('.aero-flex')).toBeTruthy();
  });

  it('Row / Col', () => {
    const { container } = render(<Row><Col span={12}>a</Col></Row>);
    expect(container.querySelector('.aero-row')).toBeTruthy();
  });

  it('Layout', () => {
    const { container } = render(
      <Layout>
        <Layout.Header>H</Layout.Header>
        <Layout.Content>C</Layout.Content>
        <Layout.Footer>F</Layout.Footer>
      </Layout>,
    );
    expect(container.querySelector('.aero-layout')).toBeTruthy();
  });

  it('Alert', () => {
    const { container } = render(<Alert>Info</Alert>);
    expect(container.querySelector('.aero-alert')).toBeTruthy();
  });

  it('Tag', () => {
    const { container } = render(<Tag>Label</Tag>);
    expect(container.querySelector('.aero-tag')).toBeTruthy();
  });

  it('Badge', () => {
    const { container } = render(<Badge count={5}><span>item</span></Badge>);
    expect(container.querySelector('.aero-badge')).toBeTruthy();
  });

  it('Empty', () => {
    const { container } = render(<Empty />);
    expect(container.querySelector('.aero-empty')).toBeTruthy();
  });

  it('Spin', () => {
    const { container } = render(<Spin />);
    expect(container.querySelector('.aero-spin')).toBeTruthy();
  });

  it('Skeleton', () => {
    const { container } = render(<Skeleton />);
    expect(container.querySelector('.aero-skeleton')).toBeTruthy();
  });

  it('Statistic', () => {
    const { container } = render(<Statistic title="Total" value={100} />);
    expect(container.querySelector('.aero-statistic')).toBeTruthy();
  });

  it('Image', () => {
    const { container } = render(<Image src="test.png" alt="test" />);
    expect(container.querySelector('.aero-image')).toBeTruthy();
  });

  it('QRCode', () => {
    const { container } = render(<QRCode value="https://example.com" />);
    expect(container.querySelector('.aero-qrcode')).toBeTruthy();
  });
});
