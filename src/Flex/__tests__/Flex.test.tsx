import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import Flex from '..';

const root = (ui: React.ReactElement) => render(ui).container.firstElementChild as HTMLElement;

describe('Flex', () => {
  it('vertical adds class and stretches by default', () => {
    const el = root(<Flex vertical>a</Flex>);
    expect(el).toHaveClass('aero-flex-vertical');
    expect(el.style.alignItems).toBe('stretch');
  });

  it('orientation takes precedence over vertical', () => {
    const el = root(<Flex vertical orientation="horizontal">a</Flex>);
    expect(el).not.toHaveClass('aero-flex-vertical');
  });

  it('preset gap uses class, custom gap uses style', () => {
    expect(root(<Flex gap="small">a</Flex>)).toHaveClass('aero-flex-gap-small');
    expect(root(<Flex gap={20}>a</Flex>).style.gap).toBe('20px');
    expect(root(<Flex gap="1rem">a</Flex>).style.gap).toBe('1rem');
  });

  it('maps wrap, justify, align and flex to CSS', () => {
    const el = root(<Flex wrap justify="space-between" align="center" flex={1}>a</Flex>);
    expect(el.style.flexWrap).toBe('wrap');
    expect(el.style.justifyContent).toBe('space-between');
    expect(el.style.alignItems).toBe('center');
    expect(el.style.flexGrow).toBe('1');
  });

  it('passes through html attributes and component', () => {
    const el = root(<Flex component="section" data-id="x" id="f">a</Flex>);
    expect(el.tagName).toBe('SECTION');
    expect(el.dataset.id).toBe('x');
  });
});
