---
title: TextArea 文本域
group:
  title: 数据录入
  order: 3
nav:
  title: 组件
  path: /components
---

# TextArea 文本域

多行文本输入，默认自适应内容高度。毛玻璃风格容器，输入多少撑多高，体验自然流畅。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 限制行数范围

<code src="./demos/autosize.tsx"></code>

## 固定行数

<code src="./demos/fixed.tsx"></code>

## 字数统计

<code src="./demos/count.tsx"></code>

## 受控模式

<code src="./demos/controlled.tsx"></code>

## 尺寸

<code src="./demos/size.tsx"></code>

## 校验状态

<code src="./demos/status.tsx"></code>

## 禁用与只读

<code src="./demos/disabled.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 输入值（受控） | `string` | - |
| defaultValue | 默认值（非受控） | `string` | `''` |
| onChange | 值变化回调 | `(value: string) => void` | - |
| placeholder | 占位文本 | `string` | - |
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| status | 校验状态 | `'error' \| 'warning'` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| readOnly | 是否只读 | `boolean` | `false` |
| autoSize | 自适应高度 | `boolean \| { minRows?: number; maxRows?: number }` | `true` |
| rows | 固定行数（`autoSize` 关闭时生效） | `number` | `3` |
| resize | 是否允许手动拖拽调整高度（`autoSize` 关闭时生效） | `boolean` | `false` |
| maxLength | 最大长度 | `number` | - |
| showCount | 是否显示字数统计 | `boolean` | `false` |
| autoFocus | 自动聚焦 | `boolean` | `false` |
| onFocus | 聚焦回调 | `(e: FocusEvent) => void` | - |
| onBlur | 失焦回调 | `(e: FocusEvent) => void` | - |
| onKeyDown | 按键回调 | `(e: KeyboardEvent) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
