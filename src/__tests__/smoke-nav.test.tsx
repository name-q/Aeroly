import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import {
  Pagination,
  Breadcrumb,
  Menu,
  Steps,
  Tabs,
  Tree,
  Tooltip,
  Popover,
  Dropdown,
  Masonry,
  Descriptions,
  Carousel,
  FloatButton,
  Affix,
  Form,
} from '../index';

describe('Smoke Tests — Navigation & Data Display', () => {
  it('Pagination', () => {
    const { container } = render(<Pagination total={100} />);
    expect(container.querySelector('.aero-pagination')).toBeTruthy();
  });

  it('Breadcrumb', () => {
    const { container } = render(
      <Breadcrumb items={[{ title: 'Home' }, { title: 'Page' }]} />,
    );
    expect(container.querySelector('.aero-breadcrumb')).toBeTruthy();
  });

  it('Menu', () => {
    const { container } = render(
      <Menu items={[{ key: '1', label: 'Item 1' }]} />,
    );
    expect(container.querySelector('.aero-menu')).toBeTruthy();
  });

  it('Steps', () => {
    const { container } = render(
      <Steps items={[{ title: 'Step 1' }, { title: 'Step 2' }]} />,
    );
    expect(container.querySelector('.aero-steps')).toBeTruthy();
  });

  it('Tabs', () => {
    const { container } = render(
      <Tabs items={[{ key: '1', label: 'Tab 1', children: <div>Content</div> }]} />,
    );
    expect(container.querySelector('.aero-tabs')).toBeTruthy();
  });

  it('Tree', () => {
    const { container } = render(
      <Tree treeData={[{ key: '1', title: 'Node 1' }]} />,
    );
    expect(container.querySelector('.aero-tree')).toBeTruthy();
  });

  it('Tooltip', () => {
    const { container } = render(
      <Tooltip title="tip"><span>hover me</span></Tooltip>,
    );
    expect(container).toBeTruthy();
  });

  it('Popover', () => {
    const { container } = render(
      <Popover content="content"><span>click me</span></Popover>,
    );
    expect(container).toBeTruthy();
  });

  it('Dropdown', () => {
    const { container } = render(
      <Dropdown items={[{ key: '1', label: 'Action' }]}><span>menu</span></Dropdown>,
    );
    expect(container).toBeTruthy();
  });

  it('Masonry', () => {
    const { container } = render(
      <Masonry><div>1</div><div>2</div></Masonry>,
    );
    expect(container.querySelector('.aero-masonry')).toBeTruthy();
  });

  it('Descriptions', () => {
    const { container } = render(
      <Descriptions items={[{ label: 'Name', children: 'Alice' }]} />,
    );
    expect(container.querySelector('.aero-descriptions')).toBeTruthy();
  });

  it('Carousel', () => {
    const { container } = render(
      <Carousel items={[{ key: '1', content: <div>Slide</div> }]} />,
    );
    expect(container.querySelector('.aero-carousel')).toBeTruthy();
  });

  it('FloatButton', () => {
    const { container } = render(<FloatButton />);
    expect(container.querySelector('.aero-float-btn')).toBeTruthy();
  });

  it('Affix', () => {
    const { container } = render(<Affix><div>Sticky</div></Affix>);
    expect(container.querySelector('.aero-affix-sentinel')).toBeTruthy();
  });

  it('Form', () => {
    const { container } = render(
      <Form>
        <Form.Item label="Name" name="name">
          <input />
        </Form.Item>
      </Form>,
    );
    expect(container.querySelector('.aero-form')).toBeTruthy();
  });
});
