---
title: Input 输入框
group:
  title: 数据录入
  order: 3
nav:
  title: 组件
  path: /components
---

# Input 输入框

用于文本输入，毛玻璃风格容器搭配清晰的交互反馈。支持前后缀、可清除、密码切换、字数统计等能力。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 尺寸

<code src="./demos/size.tsx"></code>

## 前缀与后缀

<code src="./demos/prefix-suffix.tsx"></code>

## 可清除

<code src="./demos/clear.tsx"></code>

## 密码输入

<code src="./demos/password.tsx"></code>

## 字数统计

<code src="./demos/count.tsx"></code>

## 前后附加内容

<code src="./demos/addon.tsx"></code>

## 受控模式

<code src="./demos/controlled.tsx"></code>

## 校验状态

<code src="./demos/status.tsx"></code>

## 禁用与只读

<code src="./demos/disabled.tsx"></code>

## API

### Input

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 输入值（受控） | `string` | - |
| defaultValue | 默认值（非受控） | `string` | `''` |
| onChange | 值变化回调 | `(value: string) => void` | - |
| placeholder | 占位文本 | `string` | - |
| type | 输入类型 | `'text' \| 'password' \| 'number' \| 'email' \| 'tel' \| 'url'` | `'text'` |
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| status | 校验状态 | `'error' \| 'warning'` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| readOnly | 是否只读 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| allowClear | 是否可清除 | `boolean` | `false` |
| maxLength | 最大长度 | `number` | - |
| showCount | 是否显示字数统计 | `boolean` | `false` |
| prefixIcon | 前缀图标（Lucide 图标组件） | `LucideIcon` | - |
| suffixIcon | 后缀图标（Lucide 图标组件） | `LucideIcon` | - |
| prefix | 前缀内容 | `ReactNode` | - |
| suffix | 后缀内容 | `ReactNode` | - |
| addonBefore | 前置附加内容 | `ReactNode` | - |
| addonAfter | 后置附加内容 | `ReactNode` | - |
| autoFocus | 自动聚焦 | `boolean` | `false` |
| onPressEnter | 按下回车回调 | `(e: KeyboardEvent) => void` | - |
| onFocus | 聚焦回调 | `(e: FocusEvent) => void` | - |
| onBlur | 失焦回调 | `(e: FocusEvent) => void` | - |
| onKeyDown | 按键回调 | `(e: KeyboardEvent) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
