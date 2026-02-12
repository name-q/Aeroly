---
title: Popover 气泡卡片
group:
  title: 数据展示
  order: 4
nav:
  title: 组件
  path: /components
toc: content
---

# Popover 气泡卡片

点击或鼠标移入元素，弹出气泡式的卡片浮层。毛玻璃面板，支持 4 个方向、自动翻转、自适应内容。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 点击触发

<code src="./demos/click.tsx"></code>

## 弹出方向

<code src="./demos/placement.tsx"></code>

## 自定义内容

<code src="./demos/custom.tsx"></code>

## 受控模式

<code src="./demos/controlled.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| content | 弹出内容 | `ReactNode` | - |
| title | 标题 | `ReactNode` | - |
| trigger | 触发方式 | `'hover' \| 'click'` | `'hover'` |
| placement | 弹出方向 | `PopoverPlacement` | `'top'` |
| open | 是否显示（受控） | `boolean` | - |
| defaultOpen | 默认是否显示（非受控） | `boolean` | `false` |
| onOpenChange | 显隐变化回调 | `(open: boolean) => void` | - |
| offset | 弹层与触发元素的间距 | `number` | `8` |
| children | 触发元素 | `ReactNode` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### PopoverPlacement

```ts
type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';
```
