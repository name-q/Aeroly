import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DatePicker from '../index';

function openPicker(container: HTMLElement) {
  const input = container.querySelector('.aero-date-picker-input')!;
  fireEvent.click(input);
}

describe('DatePicker — Deep Interaction', () => {
  // ---- Basic rendering ----
  it('renders with placeholder', () => {
    const { container } = render(<DatePicker placeholder="Pick date" />);
    expect(container.querySelector('.aero-date-picker-value--placeholder')?.textContent).toBe('Pick date');
  });

  it('renders defaultValue', () => {
    const { container } = render(<DatePicker defaultValue="2024-06-15" />);
    expect(container.querySelector('.aero-date-picker-value')?.textContent).toBe('2024-06-15');
  });

  // ---- Date selection ----
  it('selects a date and triggers onChange', () => {
    const onChange = vi.fn();
    const { container } = render(<DatePicker defaultValue="2024-06-15" onChange={onChange} />);
    openPicker(container);
    // Find a current-month cell that is not selected
    const cells = container.querySelectorAll('.aero-date-picker-cell:not(.aero-date-picker-cell--outside):not(.aero-date-picker-cell--disabled)');
    // Click the first cell (day 1)
    fireEvent.click(cells[0]);
    expect(onChange).toHaveBeenCalledWith('2024-06-01');
  });

  it('does not select disabled date', () => {
    const onChange = vi.fn();
    const disabledDate = (date: Date) => date.getDate() === 1;
    const { container } = render(
      <DatePicker defaultValue="2024-06-15" disabledDate={disabledDate} onChange={onChange} />,
    );
    openPicker(container);
    const disabledCell = container.querySelector('.aero-date-picker-cell--disabled');
    expect(disabledCell).toBeTruthy();
    if (disabledCell) fireEvent.click(disabledCell);
    expect(onChange).not.toHaveBeenCalled();
  });

  // ---- Month navigation ----
  it('navigates to previous month', () => {
    const { container } = render(<DatePicker defaultValue="2024-06-15" />);
    openPicker(container);
    const navBtns = container.querySelectorAll('.aero-date-picker-nav');
    fireEvent.click(navBtns[0]); // prev
    const title = container.querySelector('.aero-date-picker-title')?.textContent;
    expect(title).toContain('5'); // May
  });

  it('navigates to next month', () => {
    const { container } = render(<DatePicker defaultValue="2024-06-15" />);
    openPicker(container);
    const navBtns = container.querySelectorAll('.aero-date-picker-nav');
    fireEvent.click(navBtns[1]); // next
    const title = container.querySelector('.aero-date-picker-title')?.textContent;
    expect(title).toContain('7'); // July
  });

  // ---- View switching ----
  it('switches to month view on title click', () => {
    const { container } = render(<DatePicker defaultValue="2024-06-15" />);
    openPicker(container);
    const title = container.querySelector('.aero-date-picker-title')!;
    fireEvent.click(title); // switch to month view
    const gridCells = container.querySelectorAll('.aero-date-picker-grid-cell');
    expect(gridCells.length).toBe(12); // 12 months
  });

  it('switches to year view from month view', () => {
    const { container } = render(<DatePicker defaultValue="2024-06-15" />);
    openPicker(container);
    // Go to month view
    fireEvent.click(container.querySelector('.aero-date-picker-title')!);
    // Go to year view
    fireEvent.click(container.querySelector('.aero-date-picker-title')!);
    const gridCells = container.querySelectorAll('.aero-date-picker-grid-cell');
    expect(gridCells.length).toBe(12); // 12 year cells
  });

  // ---- Clear ----
  it('clears value when allowClear', () => {
    const onChange = vi.fn();
    const { container } = render(
      <DatePicker defaultValue="2024-06-15" allowClear onChange={onChange} />,
    );
    const clear = container.querySelector('.aero-date-picker-clear')!;
    fireEvent.click(clear);
    expect(onChange).toHaveBeenCalledWith('');
  });

  // ---- Controlled mode ----
  it('respects controlled value', () => {
    const { container, rerender } = render(<DatePicker value="2024-06-15" />);
    expect(container.querySelector('.aero-date-picker-value')?.textContent).toBe('2024-06-15');
    rerender(<DatePicker value="2024-12-25" />);
    expect(container.querySelector('.aero-date-picker-value')?.textContent).toBe('2024-12-25');
  });

  // ---- Disabled ----
  it('does not open when disabled', () => {
    const { container } = render(<DatePicker disabled />);
    openPicker(container);
    expect(container.querySelector('.aero-date-picker-dropdown')).toBeFalsy();
  });

  // ---- Status ----
  it('applies status class', () => {
    const { container } = render(<DatePicker status="error" />);
    expect(container.querySelector('.aero-date-picker--error')).toBeTruthy();
  });

  // ---- Custom format ----
  it('displays with custom format', () => {
    const { container } = render(<DatePicker defaultValue="2024-06-15" format="YYYY/MM/DD" />);
    expect(container.querySelector('.aero-date-picker-value')?.textContent).toBe('2024/06/15');
  });

  // ---- Calendar grid ----
  it('renders 42 cells (6 weeks)', () => {
    const { container } = render(<DatePicker defaultValue="2024-06-15" />);
    openPicker(container);
    const cells = container.querySelectorAll('.aero-date-picker-cell');
    expect(cells.length).toBe(42);
  });
});
