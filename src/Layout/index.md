---
title: Layout 布局
group:
  title: 布局
  order: 2
nav:
  title: 组件
  path: /components
---

# Layout 布局

页面级布局容器，基于 Flex 实现上下左右经典结构。Content 自动撑满剩余空间并支持滚动，适配 AI 时代内容高度不确定的场景。

## 上中下结构

<code src="./demos/basic.tsx"></code>

## 侧栏布局

<code src="./demos/sider.tsx"></code>

## 右侧栏

<code src="./demos/right-sider.tsx"></code>

## 可收起侧栏

<code src="./demos/collapsible.tsx"></code>

## 内容滚动

<code src="./demos/scroll.tsx"></code>

## API

### Layout

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| full | 撑满视口高度（100vh） | `boolean` | `false` |
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

Content 自动 `flex: 1` 撑满剩余空间，内容超出时自动滚动（`overflow: auto`）。

### Layout.Sider

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| width | 宽度，数字为 px | `number \| string` | `200` |
| collapsedWidth | 收起后的宽度 | `number` | `48` |
| collapsible | 是否可收起 | `boolean` | `false` |
| collapsed | 是否收起（受控） | `boolean` | - |
| defaultCollapsed | 默认是否收起 | `boolean` | `false` |
| onCollapsedChange | 收起/展开回调 | `(collapsed: boolean) => void` | - |
| trigger | 自定义触发器，传 `null` 隐藏 | `ReactNode \| null` | 默认圆形箭头 |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
