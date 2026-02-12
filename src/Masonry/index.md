---
title: Masonry 瀑布流
group:
  title: 布局
  order: 2
nav:
  title: 组件
  path: /components
toc: content
---

# Masonry 瀑布流

基于 CSS 多列布局的瀑布流组件，适用于图片墙、卡片流等不等高内容的排列。支持固定列数和响应式列数，间距复用 Grid 的语义 token。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 自定义列数

<code src="./demos/columns.tsx"></code>

## 响应式列数

<code src="./demos/responsive.tsx"></code>

## 自定义内容

<code src="./demos/custom.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| columns | 列数，支持响应式对象 | `number \| Partial<Record<Breakpoint, number>>` | `3` |
| gutter | 间距，数字为 px，支持语义 token | `number \| 'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` |
| children | 子元素 | `ReactNode` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### Breakpoint 响应式断点

| 断点 | 宽度 |
|------|------|
| `xs` | ≥0px |
| `sm` | ≥576px |
| `md` | ≥768px |
| `lg` | ≥992px |
| `xl` | ≥1200px |

响应式列数降级逻辑：`{ xs: 1, md: 3 }` 在 `sm` 断点时取 `xs` 的值 `1`（向下找最近的已定义断点）。

### gutter 语义 token

| Token | 值 |
|-------|-----|
| `xs` | 4px |
| `sm` | 8px |
| `md` | 12px |
| `lg` | 16px |
