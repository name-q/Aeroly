---
title: Table
group:
  title: Data Display
  order: 4
nav:
  title: Components
  path: /components
toc: content
---

# Table

Display row and column data with support for sorting, selection, pagination, and more.

## Basic Usage

<code src="./en/demos/basic.tsx" id="basic-en"></code>

## Bordered & Striped

<code src="./en/demos/bordered.tsx" id="bordered-en"></code>

## Custom Render

<code src="./en/demos/custom-render.tsx" id="custom-render-en"></code>

## Sorting

<code src="./en/demos/sorter.tsx" id="sorter-en"></code>

## Row Selection

<code src="./en/demos/selection.tsx" id="selection-en"></code>

## Pagination

<code src="./en/demos/pagination.tsx" id="pagination-en"></code>

## Loading State

<code src="./en/demos/loading.tsx" id="loading-en"></code>

## Fixed Columns & Scroll

<code src="./en/demos/fixed-scroll.tsx" id="fixed-scroll-en"></code>

## Expandable Rows

<code src="./en/demos/expandable.tsx" id="expandable-en"></code>

## API

### Table

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| columns | Column configuration | `ColumnType[]` | - |
| dataSource | Data source | `T[]` | - |
| rowKey | Row unique identifier | `keyof T \| (record: T) => string \| number` | `'id'` |
| rowSelection | Row selection configuration | `RowSelection` | - |
| pagination | Pagination configuration, `false` to disable | `object \| false` | - |
| size | Size | `'small' \| 'medium' \| 'large'` | `'medium'` |
| bordered | Show border | `boolean` | `false` |
| striped | Show striped rows | `boolean` | `false` |
| loading | Loading state | `boolean` | `false` |
| emptyText | Custom empty state | `ReactNode` | `<Empty preset="noData" />` |
| onRow | Row events | `(record, index) => { onClick? }` | - |
| sticky | Sticky table header | `boolean` | `false` |
| scroll | Vertical scroll | `{ y?: number \| string }` | - |
| defaultExpandedRowKeys | Default expanded row keys | `(string \| number)[]` | - |
| expandedRowKeys | Expanded row keys (controlled) | `(string \| number)[]` | - |
| onExpandedRowsChange | Expanded rows change callback | `(keys: (string \| number)[]) => void` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

### ColumnType

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| title | Column title | `ReactNode` | - |
| dataIndex | Data field name | `string` | - |
| key | Unique identifier | `string` | `dataIndex` |
| width | Column width | `number \| string` | - |
| align | Alignment | `'left' \| 'center' \| 'right'` | `'center'` |
| fixed | Fixed column | `'left' \| 'right'` | - |
| render | Custom render | `(value, record, index) => ReactNode` | - |
| sorter | Sort function | `(a, b) => number` | - |
| defaultSortOrder | Default sort order | `'ascend' \| 'descend'` | - |
| ellipsis | Text overflow ellipsis | `boolean` | `false` |
| className | Custom className | `string` | - |

### RowSelection

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| selectedRowKeys | Selected row keys | `(string \| number)[]` | - |
| onChange | Selection change callback | `(selectedRowKeys, selectedRows) => void` | - |
| getCheckboxProps | Row checkbox props | `(record) => { disabled? }` | - |

### pagination

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| current | Current page (controlled) | `number` | - |
| defaultCurrent | Default current page | `number` | `1` |
| pageSize | Page size (controlled) | `number` | - |
| defaultPageSize | Default page size | `number` | `10` |
| total | Total count (for server-side pagination) | `number` | - |
| showSizeChanger | Show size changer | `boolean` | - |
| showQuickJumper | Show quick jumper | `boolean` | - |
| showTotal | Show total | `(total, range) => ReactNode` | - |
| pageSizeOptions | Page size options | `number[]` | `[10, 20, 50, 100]` |
| onChange | Pagination change callback | `(page, pageSize) => void` | - |
