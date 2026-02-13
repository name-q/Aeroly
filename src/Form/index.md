---
title: Form 表单
group:
  title: 数据录入
  order: 3
nav:
  title: 组件
  path: /components
toc: content
---

# Form 表单

高性能表单组件，自带数据域管理、校验和布局。通过 `Form.Item` 连接各种表单控件，支持字段级精准更新。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 布局模式

<code src="./demos/layout.tsx"></code>

## 校验规则

<code src="./demos/validation.tsx"></code>

## 动态增减表单项

<code src="./demos/dynamic.tsx"></code>

## 综合示例

<code src="./demos/complex.tsx"></code>

## Modal 中的表单

<code src="./demos/modal.tsx"></code>

## API

### Form

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| form | 表单实例（通过 `Form.useForm()` 创建） | `FormInstance` | 自动创建 |
| initialValues | 初始值 | `Record<string, any>` | - |
| layout | 布局模式 | `'vertical' \| 'horizontal' \| 'inline'` | `'vertical'` |
| labelWidth | 标签宽度（horizontal 模式） | `number \| string` | - |
| labelAlign | 标签对齐方式 | `'left' \| 'right'` | `'left'` |
| disabled | 整体禁用 | `boolean` | `false` |
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| requiredMark | 必填标记 | `boolean \| 'optional'` | `true` |
| validateTrigger | 校验时机 | `string \| string[]` | `'onChange'` |
| scrollToFirstError | 提交失败时滚动到第一个错误字段 | `boolean \| ScrollIntoViewOptions` | `true` |
| onFinish | 提交成功回调 | `(values) => void` | - |
| onFinishFailed | 提交失败回调 | `(info) => void` | - |
| onValuesChange | 值变化回调 | `(changed, all) => void` | - |

### Form.Item

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| name | 字段名 | `NamePath` | - |
| label | 标签 | `ReactNode` | - |
| rules | 校验规则 | `Rule[]` | - |
| required | 必填标记（仅视觉） | `boolean` | 由 rules 推断 |
| dependencies | 依赖字段（变化时重新校验） | `NamePath[]` | - |
| validateTrigger | 覆盖校验时机 | `string \| string[]` | 继承 Form |
| valuePropName | 值属性名 | `string` | `'value'` |
| trigger | 收集值事件名 | `string` | `'onChange'` |
| getValueFromEvent | 自定义取值 | `(...args) => any` | `args[0]` |
| extra | 额外提示 | `ReactNode` | - |
| help | 覆盖错误显示 | `ReactNode` | - |
| hidden | 隐藏但保留值 | `boolean` | `false` |
| noStyle | 纯逻辑绑定（不渲染包裹结构） | `boolean` | `false` |

### Form.List

| 属性 | 说明 | 类型 |
|------|------|------|
| name | 数组字段名 | `NamePath` |
| initialValue | 初始值 | `any[]` |
| children | 渲染函数 | `(fields, operation, meta) => ReactNode` |

#### operation

| 方法 | 说明 | 类型 |
|------|------|------|
| add | 添加一项 | `(defaultValue?, index?) => void` |
| remove | 删除一项或多项 | `(index: number \| number[]) => void` |
| move | 移动位置 | `(from: number, to: number) => void` |

### Rule

| 属性 | 说明 | 类型 |
|------|------|------|
| required | 必填 | `boolean` |
| min / max | 数值范围 | `number` |
| minLength / maxLength | 长度范围 | `number` |
| pattern | 正则 | `RegExp` |
| type | 内置类型校验 | `'email' \| 'url' \| 'number' \| 'integer'` |
| whitespace | 空白检测 | `boolean` |
| validator | 自定义校验 | `(value, formValues) => void \| Promise` |
| message | 错误信息 | `string` |
| trigger | 触发时机 | `'onChange' \| 'onBlur' \| 'onSubmit'` |
| warningOnly | 仅警告不阻止提交 | `boolean` |

### FormInstance

通过 `Form.useForm()` 获取。

| 方法 | 说明 | 类型 |
|------|------|------|
| getFieldValue | 获取字段值 | `(name: NamePath) => any` |
| getFieldsValue | 获取多个/全部字段值 | `(names?: NamePath[]) => Record<string, any>` |
| setFieldValue | 设置字段值 | `(name: NamePath, value: any) => void` |
| setFieldsValue | 批量设置字段值 | `(values: Record<string, any>) => void` |
| getFieldError | 获取字段错误 | `(name: NamePath) => string[]` |
| validateFields | 校验字段 | `(names?: NamePath[]) => Promise<values>` |
| resetFields | 重置字段 | `(names?: NamePath[]) => void` |
| submit | 触发提交 | `() => void` |
| isFieldTouched | 字段是否被操作过 | `(name: NamePath) => boolean` |
