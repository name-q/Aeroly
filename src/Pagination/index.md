---
title: Pagination
group:
  title: Navigation
  order: 5
nav:
  title: Components
  path: /components
toc: content
---

# Pagination

Split long lists into pages when dealing with large amounts of data, loading one page at a time.

## Basic Usage

<code src="./en/demos/basic.tsx" id="basic-en"></code>

## More Pages

<code src="./en/demos/more.tsx" id="more-en"></code>

## Sizes

<code src="./en/demos/size.tsx" id="size-en"></code>

## Simple Mode

<code src="./en/demos/simple.tsx" id="simple-en"></code>

## Total & Quick Jumper & Page Size Changer

<code src="./en/demos/jumper.tsx" id="jumper-en"></code>

## Disabled

<code src="./en/demos/disabled.tsx" id="disabled-en"></code>

## API

### Pagination

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| current | Current page (controlled) | `number` | - |
| defaultCurrent | Default current page | `number` | `1` |
| total | Total number of data items | `number` | `0` |
| pageSize | Number of items per page (controlled) | `number` | - |
| defaultPageSize | Default number of items per page | `number` | `10` |
| onChange | Callback when page or pageSize changes | `(page: number, pageSize: number) => void` | - |
| size | Size | `'small' \| 'medium' \| 'large'` | `'medium'` |
| disabled | Whether disabled | `boolean` | `false` |
| showQuickJumper | Whether to show quick jumper input | `boolean` | `false` |
| showSizeChanger | Whether to show page size changer | `boolean` | `false` |
| pageSizeOptions | Page size options | `number[]` | `[10, 20, 50, 100]` |
| showTotal | Show total count | `(total: number, range: [number, number]) => ReactNode` | - |
| simple | Simple mode | `boolean` | `false` |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |
