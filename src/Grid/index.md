---
title: Grid 栅格
group:
  title: 布局
  order: 2
nav:
  title: 组件
  path: /components
---

# Grid 栅格

24 列栅格系统，通过 `Row` 和 `Col` 组合实现响应式布局。`gutter` 支持语义 token，`Col` 同时支持 `span` 和 `flex` 两种模式。

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

### Row

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| gutter | 栅格间距，支持语义 token，数组 `[水平, 垂直]` | `number \| 'xs' \| 'sm' \| 'md' \| 'lg' \| [h, v]` | - |
| justify | 主轴对齐 | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` | - |
| align | 交叉轴对齐 | `'start' \| 'center' \| 'end' \| 'stretch'` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### Col

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| span | 栅格占位格数（共 24 格），0 隐藏 | `number` | - |
| offset | 左侧偏移格数 | `number` | - |
| flex | CSS flex，设置后 span 失效 | `number \| string` | - |
| xs | ≥0px 响应式 | `number \| { span, offset }` | - |
| sm | ≥576px 响应式 | `number \| { span, offset }` | - |
| md | ≥768px 响应式 | `number \| { span, offset }` | - |
| lg | ≥992px 响应式 | `number \| { span, offset }` | - |
| xl | ≥1200px 响应式 | `number \| { span, offset }` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### gutter 语义 token

| Token | 值 |
|-------|-----|
| `xs` | 4px |
| `sm` | 8px |
| `md` | 12px |
| `lg` | 16px |
