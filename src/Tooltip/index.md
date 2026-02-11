---
title: Tooltip 文字提示
group:
  title: 数据展示
  order: 4
nav:
  title: 组件
  path: /components
---

# Tooltip 文字提示

简单的文字提示气泡框，鼠标移入触发。基于 Popover 实现，支持 12 个方向、自动翻转、自适应内容高度。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 弹出方向

<code src="./demos/placement.tsx"></code>

## 富文本内容

<code src="./demos/richContent.tsx"></code>

## 空 title 不显示

<code src="./demos/empty.tsx"></code>

## 受控模式

<code src="./demos/controlled.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 提示内容 | `ReactNode` | - |
| placement | 弹出方向 | `TooltipPlacement` | `'top'` |
| open | 是否显示（受控） | `boolean` | - |
| defaultOpen | 默认是否显示 | `boolean` | `false` |
| onOpenChange | 显隐变化回调 | `(open: boolean) => void` | - |
| offset | 弹层与触发元素的间距 | `number` | `8` |
| children | 触发元素 | `ReactNode` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### TooltipPlacement

```ts
type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
```
