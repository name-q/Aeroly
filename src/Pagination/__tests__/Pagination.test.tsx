import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../index';

describe('Pagination', () => {
  it('renders correct number of page buttons for small total', () => {
    render(<Pagination total={50} defaultPageSize={10} />);
    const buttons = screen.getAllByRole('button');
    // 5 pages + prev + next = 7 buttons
    expect(buttons.length).toBe(7);
  });

  it('shows ellipsis for large page count', () => {
    // current=10, totalPages=20 → [1, 'left', 8, 9, 10, 11, 12, 'right', 20]
    render(<Pagination total={200} defaultPageSize={10} defaultCurrent={10} />);
    const buttons = screen.getAllByRole('button');
    // 9 page items + prev + next = 11
    expect(buttons.length).toBe(11);
  });

  it('disables prev button on first page', () => {
    render(<Pagination total={50} defaultCurrent={1} defaultPageSize={10} />);
    // aria-label is "上一页" (zh_CN default)
    const prevBtn = screen.getByLabelText('上一页');
    expect(prevBtn).toBeDisabled();
  });

  it('calls onChange when clicking a page', () => {
    const onChange = vi.fn();
    render(<Pagination total={50} defaultPageSize={10} onChange={onChange} />);
    fireEvent.click(screen.getByText('3'));
    expect(onChange).toHaveBeenCalledWith(3, 10);
  });

  it('navigates to next page', () => {
    const onChange = vi.fn();
    render(<Pagination total={50} defaultPageSize={10} defaultCurrent={1} onChange={onChange} />);
    const nextBtn = screen.getByLabelText('下一页');
    fireEvent.click(nextBtn);
    expect(onChange).toHaveBeenCalledWith(2, 10);
  });

  it('handles total=0 gracefully', () => {
    const { container } = render(<Pagination total={0} />);
    expect(container.querySelector('.aero-pagination')).toBeTruthy();
  });
});
