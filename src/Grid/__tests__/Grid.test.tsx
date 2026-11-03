import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { Row, Col } from '..';

describe('Grid', () => {
  it('Row maps justify, align and wrap to classes', () => {
    const { container } = render(<Row justify="space-between" align="middle" wrap={false} />);
    const row = container.firstElementChild!;
    expect(row).toHaveClass('aero-row', 'aero-row-space-between', 'aero-row-middle', 'aero-row-no-wrap');
  });

  it('gutter sets negative row margin and col padding', () => {
    const { container } = render(
      <Row gutter={[16, 24]}>
        <Col span={12}>a</Col>
      </Row>,
    );
    const row = container.firstElementChild as HTMLElement;
    const col = row.firstElementChild as HTMLElement;
    expect(row.style.marginInline).toBe('-8px');
    expect(row.style.rowGap).toBe('24px');
    expect(col.style.paddingInline).toBe('8px');
  });

  it('Col maps span, offset, order, push, pull and breakpoints to classes', () => {
    const { container } = render(
      <Col span={6} offset={2} order={1} push={3} pull={4} xs={24} md={{ span: 8, offset: 1 }} />,
    );
    expect(container.firstElementChild).toHaveClass(
      'aero-col-6', 'aero-col-offset-2', 'aero-col-order-1', 'aero-col-push-3', 'aero-col-pull-4',
      'aero-col-xs-24', 'aero-col-md-8', 'aero-col-md-offset-1',
    );
  });

  it('Col flex follows antd parsing', () => {
    const flex = (v: number | string) =>
      (render(<Col flex={v} />).container.firstElementChild as HTMLElement).style.flex;
    expect(flex(2)).toBe('2 2 auto');
    expect(flex('100px')).toBe('0 0 100px');
    expect(flex('auto')).toBe('1 1 auto');
  });
});
