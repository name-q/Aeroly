import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Select from '../index';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry', disabled: true },
];

const groupOptions = [
  {
    label: 'Fruits',
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
    ],
  },
  {
    label: 'Vegetables',
    options: [
      { label: 'Carrot', value: 'carrot' },
    ],
  },
];

function openDropdown(container: HTMLElement) {
  const selector = container.querySelector('.aero-select-selector')!;
  fireEvent.click(selector);
}

describe('Select — Deep Interaction', () => {
  // ---- Basic rendering ----
  it('renders with placeholder', () => {
    const { container } = render(<Select options={options} placeholder="Pick one" />);
    expect(container.querySelector('.aero-select-placeholder')?.textContent).toBe('Pick one');
  });

  it('renders defaultValue', () => {
    const { container } = render(<Select options={options} defaultValue="banana" />);
    expect(container.querySelector('.aero-select-value')?.textContent).toBe('Banana');
  });

  // ---- Single selection ----
  it('selects an option and closes dropdown', () => {
    const onChange = vi.fn();
    const { container } = render(<Select options={options} onChange={onChange} />);
    openDropdown(container);
    const opts = container.querySelectorAll('.aero-select-option');
    fireEvent.click(opts[1]); // Banana
    expect(onChange).toHaveBeenCalledWith('banana', expect.objectContaining({ value: 'banana' }));
    expect(container.querySelector('.aero-select-value')?.textContent).toBe('Banana');
  });

  it('does not select disabled option', () => {
    const onChange = vi.fn();
    const { container } = render(<Select options={options} onChange={onChange} />);
    openDropdown(container);
    const opts = container.querySelectorAll('.aero-select-option');
    fireEvent.click(opts[2]); // Cherry (disabled)
    expect(onChange).not.toHaveBeenCalled();
  });

  // ---- Controlled mode ----
  it('respects controlled value', () => {
    const { container, rerender } = render(<Select options={options} value="apple" />);
    expect(container.querySelector('.aero-select-value')?.textContent).toBe('Apple');
    rerender(<Select options={options} value="banana" />);
    expect(container.querySelector('.aero-select-value')?.textContent).toBe('Banana');
  });

  // ---- Clear ----
  it('clears value when allowClear', () => {
    const onChange = vi.fn();
    const { container } = render(
      <Select options={options} defaultValue="apple" allowClear onChange={onChange} />,
    );
    const clear = container.querySelector('.aero-select-clear')!;
    fireEvent.click(clear);
    expect(onChange).toHaveBeenCalledWith('', undefined);
  });

  // ---- Multiple selection ----
  it('selects multiple options and shows tags', () => {
    const onChange = vi.fn();
    const { container } = render(<Select options={options} multiple onChange={onChange} />);
    openDropdown(container);
    const opts = container.querySelectorAll('.aero-select-option');
    fireEvent.click(opts[0]); // Apple
    expect(onChange).toHaveBeenCalledWith(['apple'], expect.any(Array));
    // Dropdown stays open in multiple mode — select another
    fireEvent.click(opts[1]); // Banana
    expect(onChange).toHaveBeenLastCalledWith(['apple', 'banana'], expect.any(Array));
    // Tags rendered
    const tags = container.querySelectorAll('.aero-select-tag-content');
    expect(tags.length).toBe(2);
  });

  it('deselects in multiple mode by clicking again', () => {
    const onChange = vi.fn();
    const { container } = render(
      <Select options={options} multiple defaultValue={['apple', 'banana']} onChange={onChange} />,
    );
    openDropdown(container);
    const opts = container.querySelectorAll('.aero-select-option');
    fireEvent.click(opts[0]); // deselect Apple
    expect(onChange).toHaveBeenCalledWith(['banana'], expect.any(Array));
  });

  it('removes tag by clicking close', () => {
    const onChange = vi.fn();
    const { container } = render(
      <Select options={options} multiple defaultValue={['apple', 'banana']} onChange={onChange} />,
    );
    const closeBtn = container.querySelector('.aero-select-tag-close')!;
    fireEvent.click(closeBtn);
    expect(onChange).toHaveBeenCalledWith(['banana'], expect.any(Array));
  });

  it('maxTagCount shows +N overflow', () => {
    const { container } = render(
      <Select options={options} multiple defaultValue={['apple', 'banana']} maxTagCount={1} />,
    );
    const tags = container.querySelectorAll('.aero-select-tag-content');
    expect(tags.length).toBe(1);
    expect(container.querySelector('.aero-select-tag--rest')?.textContent).toBe('+1');
  });

  // ---- Search / filter ----
  it('filters options by search text', () => {
    const { container } = render(<Select options={options} showSearch />);
    openDropdown(container);
    const input = container.querySelector('.aero-select-search-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'ban' } });
    const visible = container.querySelectorAll('.aero-select-option');
    expect(visible.length).toBe(1);
    expect(visible[0].textContent).toBe('Banana');
  });

  it('shows empty state when no match', () => {
    const { container } = render(
      <Select options={options} showSearch notFoundContent="Nothing" />,
    );
    openDropdown(container);
    const input = container.querySelector('.aero-select-search-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'zzz' } });
    expect(container.querySelector('.aero-select-empty')?.textContent).toBe('Nothing');
  });

  // ---- Group options ----
  it('renders grouped options', () => {
    const { container } = render(<Select options={groupOptions} />);
    openDropdown(container);
    const groups = container.querySelectorAll('.aero-select-group');
    expect(groups.length).toBe(2);
    expect(container.querySelector('.aero-select-group-title')?.textContent).toBe('Fruits');
  });

  // ---- Keyboard navigation ----
  it('ArrowDown opens dropdown when closed', () => {
    const { container } = render(<Select options={options} />);
    const root = container.querySelector('.aero-select')!;
    fireEvent.keyDown(root, { key: 'ArrowDown' });
    expect(container.querySelector('.aero-select-dropdown')).toBeTruthy();
  });

  it('Escape closes dropdown', () => {
    const onOpenChange = vi.fn();
    const { container } = render(<Select options={options} onOpenChange={onOpenChange} />);
    openDropdown(container);
    const root = container.querySelector('.aero-select')!;
    fireEvent.keyDown(root, { key: 'Escape' });
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  // ---- Disabled ----
  it('does not open when disabled', () => {
    const { container } = render(<Select options={options} disabled />);
    openDropdown(container);
    expect(container.querySelector('.aero-select-dropdown')).toBeFalsy();
  });

  // ---- Status ----
  it('applies error status class', () => {
    const { container } = render(<Select options={options} status="error" />);
    expect(container.querySelector('.aero-select--error')).toBeTruthy();
  });

  it('applies warning status class', () => {
    const { container } = render(<Select options={options} status="warning" />);
    expect(container.querySelector('.aero-select--warning')).toBeTruthy();
  });

  // ---- Size ----
  it('applies size class', () => {
    const { container } = render(<Select options={options} size="large" />);
    expect(container.querySelector('.aero-select--large')).toBeTruthy();
  });
});
