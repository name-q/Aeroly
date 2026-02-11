---
title: InputNumber 数字输入框
group:
  title: 数据录入
  order: 3
nav:
  title: 组件
  path: /components
---

# InputNumber 数字输入框

通过鼠标或键盘输入数字，支持步进、范围限制、精度控制和格式化。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 尺寸

<code src="./demos/size.tsx"></code>

## 步长 & 精度

<code src="./demos/step.tsx"></code>

## 格式化

<code src="./demos/formatter.tsx"></code>

## 禁用 & 只读

<code src="./demos/disabled.tsx"></code>

## API

### InputNumber

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 当前值（受控） | `number \| null` | - |
| defaultValue | 默认值 | `number \| null` | `null` |
| onChange | 值变化回调 | `(value: number \| null) => void` | - |
| min | 最小值 | `number` | `-Infinity` |
| max | 最大值 | `number` | `Infinity` |
| step | 步长 | `number` | `1` |
| precision | 小数精度 | `number` | 从 step 推导 |
| disabled | 禁用 | `boolean` | `false` |
| readOnly | 只读 | `boolean` | `false` |
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| status | 状态 | `'error' \| 'warning'` | - |
| placeholder | 占位文本 | `string` | - |
| controls | 是否显示步进按钮 | `boolean` | `true` |
| prefix | 前缀内容 | `ReactNode` | - |
| formatter | 格式化显示 | `(value: number \| undefined) => string` | - |
| parser | 从显示值解析数字 | `(displayValue: string) => number` | - |
| keyboard | 是否支持键盘上下键 | `boolean` | `true` |
| onStep | 步进回调 | `(value: number, info) => void` | - |
| onPressEnter | 回车回调 | `(e) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
