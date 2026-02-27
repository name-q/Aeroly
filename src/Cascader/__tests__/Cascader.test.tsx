import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Cascader from '../index';

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          { value: 'xihu', label: 'West Lake' },
          { value: 'linyin', label: 'Lingyin Temple' },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          { value: 'zhonghua', label: 'Zhonghua Gate' },
        ],
      },
    ],
  },
  { value: 'disabled', label: 'Disabled', disabled: true },
];

function openDropdown(container: HTMLElement) {
  const selector = container.querySelector('.aero-cascader-selector')!;
  fireEvent.click(selector);
}

describe('Cascader — Deep Interaction', () => {
  // ---- Basic rendering ----
  it('renders with placeholder', () => {
    const { container } = render(<Cascader options={options} placeholder="Select area" />);
    expect(container.querySelector('.aero-cascader-placeholder')?.textContent).toBe('Select area');
  });

  // ---- Multi-column navigation ----
  it('expands columns on click', () => {
    const { container } = render(<Cascader options={options} />);
    openDropdown(container);
    // Initially 1 column
    let menus = container.querySelectorAll('.aero-cascader-menu');
    expect(menus.length).toBe(1);
    // Click first option to expand
    const firstOpt = container.querySelector('.aero-cascader-option')!;
    fireEvent.click(firstOpt); // Zhejiang
    menus = container.querySelectorAll('.aero-cascader-menu');
    expect(menus.length).toBe(2);
  });

  // ---- Leaf selection ----
  it('selects leaf node and triggers onChange', () => {
    const onChange = vi.fn();
    const { container } = render(<Cascader options={options} onChange={onChange} />);
    openDropdown(container);
    // Click Zhejiang
    fireEvent.click(container.querySelectorAll('.aero-cascader-option')[0]);
    // Click Hangzhou
    const col2 = container.querySelectorAll('.aero-cascader-menu')[1];
    fireEvent.click(col2.querySelector('.aero-cascader-option')!);
    // Click West Lake (leaf)
    const col3 = container.querySelectorAll('.aero-cascader-menu')[2];
    fireEvent.click(col3.querySelectorAll('.aero-cascader-option')[0]);
    expect(onChange).toHaveBeenCalledWith(
      ['zhejiang', 'hangzhou', 'xihu'],
      expect.any(Array),
    );
  });

  // ---- Display value ----
  it('displays selected path with separator', () => {
    const { container } = render(
      <Cascader options={options} defaultValue={['zhejiang', 'hangzhou', 'xihu']} />,
    );
    const value = container.querySelector('.aero-cascader-value')?.textContent;
    expect(value).toBe('Zhejiang / Hangzhou / West Lake');
  });

  it('uses custom separator', () => {
    const { container } = render(
      <Cascader
        options={options}
        defaultValue={['zhejiang', 'hangzhou', 'xihu']}
        displaySeparator=" > "
      />,
    );
    expect(container.querySelector('.aero-cascader-value')?.textContent).toBe(
      'Zhejiang > Hangzhou > West Lake',
    );
  });

  // ---- Disabled option ----
  it('does not select disabled option', () => {
    const onChange = vi.fn();
    const { container } = render(<Cascader options={options} onChange={onChange} />);
    openDropdown(container);
    const opts = container.querySelectorAll('.aero-cascader-option');
    // Last option is "Disabled"
    fireEvent.click(opts[opts.length - 1]);
    expect(onChange).not.toHaveBeenCalled();
  });

  // ---- changeOnSelect ----
  it('triggers onChange on non-leaf when changeOnSelect', () => {
    const onChange = vi.fn();
    const { container } = render(
      <Cascader options={options} changeOnSelect onChange={onChange} />,
    );
    openDropdown(container);
    fireEvent.click(container.querySelectorAll('.aero-cascader-option')[0]); // Zhejiang
    expect(onChange).toHaveBeenCalledWith(['zhejiang'], expect.any(Array));
  });

  // ---- Clear ----
  it('clears value when allowClear', () => {
    const onChange = vi.fn();
    const { container } = render(
      <Cascader
        options={options}
        defaultValue={['zhejiang', 'hangzhou', 'xihu']}
        allowClear
        onChange={onChange}
      />,
    );
    const clear = container.querySelector('.aero-cascader-clear')!;
    fireEvent.click(clear);
    expect(onChange).toHaveBeenCalled();
    // Value should be cleared
    expect(container.querySelector('.aero-cascader-placeholder')).toBeTruthy();
  });

  // ---- Multiple mode ----
  it('selects multiple paths and shows tags', () => {
    const onChange = vi.fn();
    const { container } = render(<Cascader options={options} multiple onChange={onChange} />);
    openDropdown(container);
    // Navigate to first leaf
    fireEvent.click(container.querySelectorAll('.aero-cascader-option')[0]); // Zhejiang
    const col2 = container.querySelectorAll('.aero-cascader-menu')[1];
    fireEvent.click(col2.querySelector('.aero-cascader-option')!); // Hangzhou
    const col3 = container.querySelectorAll('.aero-cascader-menu')[2];
    fireEvent.click(col3.querySelectorAll('.aero-cascader-option')[0]); // West Lake
    expect(onChange).toHaveBeenCalledWith(
      [['zhejiang', 'hangzhou', 'xihu']],
      expect.any(Array),
    );
    // Tag should be rendered
    const tags = container.querySelectorAll('.aero-cascader-tag-content');
    expect(tags.length).toBe(1);
  });

  it('removes tag in multiple mode', () => {
    const onChange = vi.fn();
    const { container } = render(
      <Cascader
        options={options}
        multiple
        defaultValue={[['zhejiang', 'hangzhou', 'xihu']]}
        onChange={onChange}
      />,
    );
    const closeBtn = container.querySelector('.aero-cascader-tag-close')!;
    fireEvent.click(closeBtn);
    expect(onChange).toHaveBeenCalledWith([], []);
  });

  it('maxTagCount shows +N overflow', () => {
    const { container } = render(
      <Cascader
        options={options}
        multiple
        defaultValue={[
          ['zhejiang', 'hangzhou', 'xihu'],
          ['jiangsu', 'nanjing', 'zhonghua'],
        ]}
        maxTagCount={1}
      />,
    );
    const tags = container.querySelectorAll('.aero-cascader-tag-content');
    expect(tags.length).toBe(1);
    expect(container.querySelector('.aero-cascader-tag--rest')?.textContent).toBe('+1');
  });

  // ---- Search ----
  it('filters paths by search text', () => {
    const { container } = render(<Cascader options={options} showSearch />);
    openDropdown(container);
    const input = container.querySelector('.aero-cascader-search-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'West' } });
    const items = container.querySelectorAll('.aero-cascader-search-item');
    expect(items.length).toBe(1);
    expect(items[0].textContent).toContain('West Lake');
  });

  it('shows empty state when search has no match', () => {
    const { container } = render(
      <Cascader options={options} showSearch notFoundContent="No data" />,
    );
    openDropdown(container);
    const input = container.querySelector('.aero-cascader-search-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'zzz' } });
    expect(container.querySelector('.aero-cascader-empty')?.textContent).toBe('No data');
  });

  // ---- Keyboard ----
  it('Escape closes dropdown', () => {
    const onOpenChange = vi.fn();
    const { container } = render(
      <Cascader options={options} onOpenChange={onOpenChange} />,
    );
    openDropdown(container);
    const root = container.querySelector('.aero-cascader')!;
    fireEvent.keyDown(root, { key: 'Escape' });
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it('ArrowDown opens dropdown when closed', () => {
    const { container } = render(<Cascader options={options} />);
    const root = container.querySelector('.aero-cascader')!;
    fireEvent.keyDown(root, { key: 'ArrowDown' });
    expect(container.querySelector('.aero-cascader-dropdown')).toBeTruthy();
  });

  // ---- Disabled ----
  it('does not open when disabled', () => {
    const { container } = render(<Cascader options={options} disabled />);
    openDropdown(container);
    expect(container.querySelector('.aero-cascader-dropdown')).toBeFalsy();
  });

  // ---- Status ----
  it('applies status class', () => {
    const { container } = render(<Cascader options={options} status="error" />);
    expect(container.querySelector('.aero-cascader--error')).toBeTruthy();
  });
});
