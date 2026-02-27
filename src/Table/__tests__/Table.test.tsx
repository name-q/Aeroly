import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Table from '../index';
import type { ColumnType } from '../index';

interface Item {
  id: number;
  name: string;
  age: number;
}

const columns: ColumnType<Item>[] = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age', sorter: (a, b) => a.age - b.age },
];

const data: Item[] = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Charlie', age: 35 },
];

describe('Table', () => {
  it('renders rows from dataSource', () => {
    render(<Table columns={columns} dataSource={data} rowKey="id" pagination={false} />);
    expect(screen.getByText('Alice')).toBeTruthy();
    expect(screen.getByText('Bob')).toBeTruthy();
    expect(screen.getByText('Charlie')).toBeTruthy();
  });

  it('sorts ascending on first click', () => {
    const { container } = render(
      <Table columns={columns} dataSource={data} rowKey="id" pagination={false} />,
    );
    // Click Age header to sort
    const ageHeader = screen.getByText('Age');
    fireEvent.click(ageHeader);

    const cells = container.querySelectorAll('.aero-table-tbody .aero-table-row');
    const firstRowAge = cells[0]?.textContent;
    // Bob(25) should be first after ascending sort
    expect(firstRowAge).toContain('Bob');
  });

  it('sorts descending on second click', () => {
    const { container } = render(
      <Table columns={columns} dataSource={data} rowKey="id" pagination={false} />,
    );
    const ageHeader = screen.getByText('Age');
    fireEvent.click(ageHeader); // ascend
    fireEvent.click(ageHeader); // descend

    const cells = container.querySelectorAll('.aero-table-tbody .aero-table-row');
    const firstRowAge = cells[0]?.textContent;
    // Charlie(35) should be first after descending sort
    expect(firstRowAge).toContain('Charlie');
  });

  it('resets sort on third click', () => {
    const { container } = render(
      <Table columns={columns} dataSource={data} rowKey="id" pagination={false} />,
    );
    const ageHeader = screen.getByText('Age');
    fireEvent.click(ageHeader); // ascend
    fireEvent.click(ageHeader); // descend
    fireEvent.click(ageHeader); // reset

    const cells = container.querySelectorAll('.aero-table-tbody .aero-table-row');
    // Back to original order: Alice first
    expect(cells[0]?.textContent).toContain('Alice');
  });

  it('shows empty state when no data', () => {
    render(<Table columns={columns} dataSource={[]} rowKey="id" pagination={false} />);
    const emptyCell = document.querySelector('.aero-table-cell-empty');
    expect(emptyCell).toBeTruthy();
  });

  it('paginates data by default', () => {
    const bigData = Array.from({ length: 25 }, (_, i) => ({
      id: i, name: `User${i}`, age: 20 + i,
    }));
    const { container } = render(
      <Table columns={columns} dataSource={bigData} rowKey="id" />,
    );
    // Default pageSize=10, should show 10 rows
    const rows = container.querySelectorAll('.aero-table-tbody .aero-table-row');
    expect(rows.length).toBe(10);
  });
});
