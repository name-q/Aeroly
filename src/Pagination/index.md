---
title: Pagination 分页
group:
  title: 导航
  order: 5
nav:
  title: 组件
  path: /components
---

# Pagination 分页

数据量较多时，采用分页的形式分隔长列表，每次只加载一页数据。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 更多页码

<code src="./demos/more.tsx"></code>

## 尺寸

<code src="./demos/size.tsx"></code>

## 简洁模式

<code src="./demos/simple.tsx"></code>

## 总数 & 快速跳转 & 条数切换

<code src="./demos/jumper.tsx"></code>

## 禁用

<code src="./demos/disabled.tsx"></code>

## API

### Pagination

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| current | 当前页（受控） | `number` | - |
| defaultCurrent | 默认当前页 | `number` | `1` |
| total | 数据总数 | `number` | `0` |
| pageSize | 每页条数（受控） | `number` | - |
| defaultPageSize | 默认每页条数 | `number` | `10` |
| onChange | 页码/pageSize 变化回调 | `(page: number, pageSize: number) => void` | - |
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| disabled | 禁用 | `boolean` | `false` |
| showQuickJumper | 显示快速跳转输入框 | `boolean` | `false` |
| showSizeChanger | 显示每页条数切换器 | `boolean` | `false` |
| pageSizeOptions | 每页条数选项 | `number[]` | `[10, 20, 50, 100]` |
| showTotal | 显示总数 | `(total: number, range: [number, number]) => ReactNode` | - |
| simple | 简洁模式 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
