---
title: Table 表格
group:
  title: 数据展示
  order: 4
nav:
  title: 组件
  path: /components
toc: content
---

# Table 表格

展示行列数据，支持排序、选择、分页等交互。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 边框与斑马纹

<code src="./demos/bordered.tsx"></code>

## 自定义渲染

<code src="./demos/custom-render.tsx"></code>

## 排序

<code src="./demos/sorter.tsx"></code>

## 行选择

<code src="./demos/selection.tsx"></code>

## 分页

<code src="./demos/pagination.tsx"></code>

## 加载状态

<code src="./demos/loading.tsx"></code>

## 固定列与滚动

<code src="./demos/fixed-scroll.tsx"></code>

## API

### Table

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| columns | 列配置 | `ColumnType[]` | - |
| dataSource | 数据源 | `T[]` | - |
| rowKey | 行唯一标识 | `keyof T \| (record: T) => string \| number` | `'id'` |
| rowSelection | 行选择配置 | `RowSelection` | - |
| pagination | 分页配置，`false` 关闭 | `object \| false` | - |
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| bordered | 是否显示边框 | `boolean` | `false` |
| striped | 是否显示斑马纹 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| emptyText | 空状态自定义 | `ReactNode` | `<Empty preset="noData" />` |
| onRow | 行事件 | `(record, index) => { onClick? }` | - |
| sticky | 表头吸顶 | `boolean` | `false` |
| scroll | 纵向滚动 | `{ y?: number \| string }` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### ColumnType

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 列标题 | `ReactNode` | - |
| dataIndex | 数据字段名 | `string` | - |
| key | 唯一标识 | `string` | `dataIndex` |
| width | 列宽 | `number \| string` | - |
| align | 对齐方式 | `'left' \| 'center' \| 'right'` | `'left'` |
| fixed | 固定列 | `'left' \| 'right'` | - |
| render | 自定义渲染 | `(value, record, index) => ReactNode` | - |
| sorter | 排序函数 | `(a, b) => number` | - |
| defaultSortOrder | 默认排序 | `'ascend' \| 'descend'` | - |
| ellipsis | 文本溢出省略 | `boolean` | `false` |
| className | 自定义 className | `string` | - |

### RowSelection

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| selectedRowKeys | 选中的行 key | `(string \| number)[]` | - |
| onChange | 选中变化回调 | `(selectedRowKeys, selectedRows) => void` | - |
| getCheckboxProps | 行 checkbox 属性 | `(record) => { disabled? }` | - |

### pagination

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| current | 当前页（受控） | `number` | - |
| defaultCurrent | 默认当前页 | `number` | `1` |
| pageSize | 每页条数（受控） | `number` | - |
| defaultPageSize | 默认每页条数 | `number` | `10` |
| total | 总条数（服务端分页时传入） | `number` | - |
| showSizeChanger | 是否显示切换器 | `boolean` | - |
| showQuickJumper | 是否显示快速跳转 | `boolean` | - |
| showTotal | 显示总数 | `(total, range) => ReactNode` | - |
| pageSizeOptions | 每页条数选项 | `number[]` | `[10, 20, 50, 100]` |
| onChange | 分页变化回调 | `(page, pageSize) => void` | - |
