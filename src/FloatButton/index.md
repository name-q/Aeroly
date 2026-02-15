---
nav:
  title: 组件
  order: 1
group:
  title: 通用
  order: 0
toc: content
---

# FloatButton 悬浮按钮

固定在页面边缘的快捷操作入口，支持单按钮、按钮组展开收起、回到顶部。毛玻璃风格，自带 Tooltip 和 Badge。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 按钮组

<code src="./demos/group.tsx"></code>

## 回到顶部

<code src="./demos/backtop.tsx"></code>

## API

### FloatButton

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| icon | `LucideIcon` | - | 图标 |
| description | `ReactNode` | - | 描述文字（图标下方） |
| tooltip | `ReactNode` | - | Tooltip 提示 |
| tooltipPlacement | `'top' \| 'bottom' \| 'left' \| 'right'` | `'left'` | Tooltip 方向 |
| badge | `number` | - | 徽标数 |
| dot | `boolean` | - | 徽标小红点 |
| shape | `'circle' \| 'square'` | `'circle'` | 按钮形状 |
| type | `'default' \| 'primary'` | `'default'` | 按钮类型 |
| onClick | `(e: MouseEvent) => void` | - | 点击回调 |
| href | `string` | - | 链接地址 |
| target | `string` | - | 链接 target |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |

### FloatButton.Group

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| icon | `LucideIcon` | `Plus` | 触发按钮图标 |
| closeIcon | `LucideIcon` | - | 展开后的关闭图标，不传则旋转 icon 45° |
| trigger | `'hover' \| 'click'` | `'click'` | 触发方式 |
| open | `boolean` | - | 是否展开（受控） |
| onOpenChange | `(open: boolean) => void` | - | 展开变化回调 |
| shape | `'circle' \| 'square'` | `'circle'` | 按钮形状 |
| tooltip | `ReactNode` | - | 触发按钮 Tooltip |
| type | `'default' \| 'primary'` | `'default'` | 触发按钮类型 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |

### FloatButton.BackTop

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| visibilityHeight | `number` | `400` | 滚动高度达到此值时显示 |
| target | `() => HTMLElement \| Window` | `window` | 滚动目标 |
| shape | `'circle' \| 'square'` | `'circle'` | 按钮形状 |
| icon | `LucideIcon` | `ArrowUp` | 图标 |
| tooltip | `ReactNode` | `'回到顶部'` | Tooltip 提示 |
| onClick | `() => void` | - | 点击回调 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
