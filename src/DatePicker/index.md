---
title: DatePicker 日期选择框
group:
  title: 数据录入
  order: 3
nav:
  title: 组件
  path: /components
toc: content
---

# DatePicker 日期选择框

选择或输入日期，支持日、月、年三级视图切换。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 受控模式

<code src="./demos/controlled.tsx"></code>

## 自定义格式

<code src="./demos/format.tsx"></code>

## 禁用特定日期

<code src="./demos/disabledDate.tsx"></code>

## 尺寸

<code src="./demos/size.tsx"></code>

## 禁用

<code src="./demos/disabled.tsx"></code>

## 日期时间选择

<code src="./demos/showTime.tsx"></code>

## 日期时间（隐藏秒）

<code src="./demos/showTimeNoSecond.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 当前值（受控） | `string` | - |
| defaultValue | 默认值（非受控） | `string` | - |
| onChange | 变化回调 | `(value: string) => void` | - |
| placeholder | 占位文案 | `string` | `'请选择日期'` |
| disabled | 是否禁用 | `boolean` | `false` |
| allowClear | 是否允许清除 | `boolean` | `true` |
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| format | 显示格式 | `string` | `'YYYY-MM-DD'` |
| disabledDate | 禁用日期判断 | `(date: Date) => boolean` | - |
| showTime | 是否显示时间选择 | `boolean \| { showSecond?: boolean }` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
