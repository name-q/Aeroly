---
nav:
  title: 组件
  order: 2
group:
  title: 反馈
  order: 4
title: Tour 漫游式引导
order: 6
toc: content
---

# Tour 漫游式引导

分步引导用户了解产品功能，支持高亮目标元素、自动定位、键盘导航。

## 基础用法

<code src="./demos/basic.tsx" description="通过 ref 绑定目标元素，自动高亮并弹出引导卡片。"></code>

## 弹出方向

<code src="./demos/placement.tsx" description="通过 placement 控制每一步的弹出方向，支持自动翻转。"></code>

## CSS 选择器定位

<code src="./demos/selector.tsx" description="target 支持 CSS 选择器字符串，无需 ref 也能定位。"></code>

## 自定义内容

<code src="./demos/custom.tsx" description="通过 content 完全自定义步骤内容，无 target 时居中显示。"></code>

## API

### TourProps

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| open | `boolean` | - | 是否显示 |
| onOpenChange | `(open: boolean) => void` | - | 显隐回调 |
| steps | `TourStepConfig[]` | - | 步骤配置 |
| current | `number` | - | 当前步骤（受控） |
| onChange | `(current: number) => void` | - | 步骤变化回调 |
| onFinish | `() => void` | - | 完成回调 |
| mask | `boolean` | `true` | 是否显示遮罩 |
| maskClosable | `boolean` | `false` | 点击遮罩关闭 |
| keyboard | `boolean` | `true` | 键盘导航（← → Esc） |
| spotlightPadding | `number` | `6` | 高亮区域内边距 |
| offset | `number` | `12` | 弹层与目标间距 |
| className | `string` | - | 自定义类名 |

### TourStepConfig

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| target | `RefObject \| string \| null` | - | 目标元素，支持 ref 或 CSS 选择器 |
| title | `ReactNode` | - | 标题 |
| description | `ReactNode` | - | 描述 |
| placement | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | 弹出方向 |
| content | `ReactNode` | - | 自定义内容（覆盖 title + description） |
| mask | `boolean` | - | 单步遮罩控制，覆盖全局 |

### 键盘操作

| 按键 | 说明 |
|------|------|
| `←` / `↑` | 上一步 |
| `→` / `↓` | 下一步 |
| `Esc` | 关闭引导 |
