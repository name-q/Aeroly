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

## 嵌套布局

<code src="./demos/nested.tsx"></code>

## 布局模式

<code src="./demos/layout.tsx"></code>

## 校验规则

<code src="./demos/validation.tsx"></code>

## 动态增减表单项

<code src="./demos/dynamic.tsx"></code>

## 综合示例

<code src="./demos/complex.tsx"></code>

## 上传图片校验

<code src="./demos/upload.tsx"></code>

## 数据回显

<code src="./demos/prefill.tsx"></code>

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

### 布局选择指南

`inline` 和 `Row/Col` 是两套独立的多列布局方案，**不能混用**。

| 场景 | 推荐方案 | 说明 |
|------|----------|------|
| 搜索栏、筛选条件等自动排列 | `layout="inline"` | 内置 CSS Grid 自动分列，直接放 `Form.Item` 即可 |
| 需要精确控制每列宽度 | `layout="horizontal"` + `Row/Col` | 用栅格系统手动控制列宽 |

**禁止**：`layout="inline"` 内嵌套 `Row/Col`。`inline` 模式的 CSS Grid 会将 `Row` 压缩到单个 grid cell 中，导致内部控件宽度塌缩。

```tsx | pure
// ❌ 错误 — inline + Row/Col 冲突，控件无宽度
<Form layout="inline">
  <Row><Col span={8}><Form.Item>...</Form.Item></Col></Row>
</Form>

// ✅ 正确 — 自动排列用 inline
<Form layout="inline">
  <Form.Item>...</Form.Item>
  <Form.Item>...</Form.Item>
</Form>

// ✅ 正确 — 精确控制用 horizontal + Row/Col
<Form layout="horizontal">
  <Row gutter={[16, 16]}>
    <Col span={8}><Form.Item>...</Form.Item></Col>
  </Row>
</Form>
```

### Form.useWatch

订阅指定字段的实时值，字段变化时自动触发组件重渲染。适合根据某个字段值动态生成其他内容（如邮箱后缀补全）。建议将 `useWatch` 及其依赖的渲染逻辑下沉到独立子组件中，避免字段变化导致整个表单重渲染。

```tsx | pure
const email = Form.useWatch('email', form);
```

| 参数 | 类型 | 说明 |
|------|------|------|
| name | `NamePath` | 要监听的字段名 |
| form | `FormInstance` | 表单实例 |
| 返回值 | `any` | 字段当前值 |
