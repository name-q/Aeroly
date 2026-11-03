---
title: Grid 栅格
group:
  title: 布局
  order: 2
nav:
  title: 组件
  path: /components
toc: content
---

# Grid 栅格

24 列栅格系统，通过 `Row` 和 `Col` 组合实现响应式布局。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 间距

<code src="./demos/gutter.tsx"></code>

## 偏移

<code src="./demos/offset.tsx"></code>

## 对齐

<code src="./demos/align.tsx"></code>

## 弹性布局

<code src="./demos/flex.tsx"></code>

## 响应式

<code src="./demos/responsive.tsx"></code>

## API

API 与 antd Grid 一致。

### Row

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| gutter | 栅格间隔，可为数字、CSS 字符串或响应式对象 `{ xs: 8, md: 16 }`；数组形式 `[水平间距, 垂直间距]` | `number \| string \| object \| array` | `0` |
| align | 垂直对齐方式，支持响应式对象 | `'top' \| 'middle' \| 'bottom' \| 'stretch'` | `'top'` |
| justify | 水平排列方式，支持响应式对象 | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | `'start'` |
| wrap | 是否自动换行 | `boolean` | `true` |

### Col

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| span | 栅格占位格数，为 0 时相当于 `display: none` | `number` | - |
| offset | 栅格左侧的间隔格数 | `number` | `0` |
| order | 栅格顺序 | `number` | `0` |
| push | 栅格向右移动格数 | `number` | `0` |
| pull | 栅格向左移动格数 | `number` | `0` |
| flex | flex 布局属性。数字对应 `flex: n n auto`，`'100px'` 等长度对应 `flex: 0 0 100px`，其他字符串直接透传 | `string \| number` | - |
| xs | `窗口宽度 < 576px` 响应式栅格，可为栅格数或包含其他属性的对象 | `number \| ColSize` | - |
| sm | `窗口宽度 ≥ 576px` 响应式栅格 | `number \| ColSize` | - |
| md | `窗口宽度 ≥ 768px` 响应式栅格 | `number \| ColSize` | - |
| lg | `窗口宽度 ≥ 992px` 响应式栅格 | `number \| ColSize` | - |
| xl | `窗口宽度 ≥ 1200px` 响应式栅格 | `number \| ColSize` | - |
| xxl | `窗口宽度 ≥ 1600px` 响应式栅格 | `number \| ColSize` | - |
| xxxl | `窗口宽度 ≥ 1920px` 响应式栅格 | `number \| ColSize` | - |

`ColSize` 为 `{ span, offset, order, push, pull, flex }`。其余 HTML 属性透传到根元素。
