---
title: Layout 布局
group:
  title: 布局
  order: 2
nav:
  title: 组件
  path: /components
toc: content
---

# Layout 布局

页面级布局容器，基于 Flex 实现上下左右经典结构。Content 自动撑满剩余空间并支持滚动，Sider 宽度由外部控制，收缩逻辑交给 Menu 组件。

## 上中下结构

<code src="./demos/basic.tsx"></code>

## 侧栏导航

<code src="./demos/sider.tsx"></code>

## 可收起侧栏

<code src="./demos/collapsed.tsx"></code>

## API

### Layout

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| full | flex:1 撑满父容器剩余空间 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

Layout 可嵌套使用。包含 `Sider` 时自动切换为左右方向。

### Layout.Header

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| height | 高度，数字为 px | `number \| string` | `56` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### Layout.Footer

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| height | 高度，数字为 px | `number \| string` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### Layout.Content

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

Content 自动 `flex: 1` 撑满剩余空间，内容超出时自动滚动。

### Layout.Sider

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| width | 宽度，数字为 px | `number \| string` | `200` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

Sider 不内置收缩逻辑，通过外部状态控制 `width` 即可实现收起效果，配合 Menu 的 `collapsed` 属性联动。
