---
title: Form
group:
  title: Data Entry
  order: 3
nav:
  title: Components
  path: /components
toc: content
---

# Form

High-performance form component with built-in data management, validation, and layout. Connect various form controls via `Form.Item`, with field-level precise updates.

## Basic Usage

<code src="./en/demos/basic.tsx"></code>

## Layout Modes

<code src="./en/demos/layout.tsx"></code>

## Validation Rules

<code src="./en/demos/validation.tsx"></code>

## Dynamic Form Items

<code src="./en/demos/dynamic.tsx"></code>

## Comprehensive Example

<code src="./en/demos/complex.tsx"></code>

## Upload Image Validation

<code src="./en/demos/upload.tsx"></code>

## Data Prefill

<code src="./en/demos/prefill.tsx"></code>

## Form in Modal

<code src="./en/demos/modal.tsx"></code>

## API

### Form

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| form | Form instance (created via `Form.useForm()`) | `FormInstance` | Auto-created |
| initialValues | Initial values | `Record<string, any>` | - |
| layout | Layout mode | `'vertical' \| 'horizontal' \| 'inline'` | `'vertical'` |
| labelWidth | Label width (horizontal mode) | `number \| string` | - |
| labelAlign | Label alignment | `'left' \| 'right'` | `'left'` |
| disabled | Disable all fields | `boolean` | `false` |
| size | Size | `'small' \| 'medium' \| 'large'` | `'medium'` |
| requiredMark | Required mark | `boolean \| 'optional'` | `true` |
| validateTrigger | Validation trigger | `string \| string[]` | `'onChange'` |
| scrollToFirstError | Scroll to first error field on submit failure | `boolean \| ScrollIntoViewOptions` | `true` |
| onFinish | Submit success callback | `(values) => void` | - |
| onFinishFailed | Submit failure callback | `(info) => void` | - |
| onValuesChange | Values change callback | `(changed, all) => void` | - |

### Form.Item

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| name | Field name | `NamePath` | - |
| label | Label | `ReactNode` | - |
| rules | Validation rules | `Rule[]` | - |
| required | Required mark (visual only) | `boolean` | Inferred from rules |
| dependencies | Dependent fields (re-validate on change) | `NamePath[]` | - |
| validateTrigger | Override validation trigger | `string \| string[]` | Inherited from Form |
| valuePropName | Value property name | `string` | `'value'` |
| trigger | Value collection event name | `string` | `'onChange'` |
| getValueFromEvent | Custom value extraction | `(...args) => any` | `args[0]` |
| extra | Extra hint | `ReactNode` | - |
| help | Override error display | `ReactNode` | - |
| hidden | Hidden but preserve value | `boolean` | `false` |
| noStyle | Pure logic binding (no wrapper structure rendered) | `boolean` | `false` |

### Form.List

| Property | Description | Type |
|----------|-------------|------|
| name | Array field name | `NamePath` |
| initialValue | Initial value | `any[]` |
| children | Render function | `(fields, operation, meta) => ReactNode` |

#### operation

| Method | Description | Type |
|--------|-------------|------|
| add | Add an item | `(defaultValue?, index?) => void` |
| remove | Remove one or more items | `(index: number \| number[]) => void` |
| move | Move position | `(from: number, to: number) => void` |

### Rule

| Property | Description | Type |
|----------|-------------|------|
| required | Required | `boolean` |
| min / max | Value range | `number` |
| minLength / maxLength | Length range | `number` |
| pattern | Regular expression | `RegExp` |
| type | Built-in type validation | `'email' \| 'url' \| 'number' \| 'integer'` |
| whitespace | Whitespace detection | `boolean` |
| validator | Custom validator | `(value, formValues) => void \| Promise` |
| message | Error message | `string` |
| trigger | Trigger timing | `'onChange' \| 'onBlur' \| 'onSubmit'` |
| warningOnly | Warning only, does not block submission | `boolean` |

### FormInstance

Obtained via `Form.useForm()`.

| Method | Description | Type |
|--------|-------------|------|
| getFieldValue | Get field value | `(name: NamePath) => any` |
| getFieldsValue | Get multiple/all field values | `(names?: NamePath[]) => Record<string, any>` |
| setFieldValue | Set field value | `(name: NamePath, value: any) => void` |
| setFieldsValue | Batch set field values | `(values: Record<string, any>) => void` |
| getFieldError | Get field errors | `(name: NamePath) => string[]` |
| validateFields | Validate fields | `(names?: NamePath[]) => Promise<values>` |
| resetFields | Reset fields | `(names?: NamePath[]) => void` |
| submit | Trigger submit | `() => void` |
| isFieldTouched | Whether field has been touched | `(name: NamePath) => boolean` |

### Form.useWatch

Subscribe to a field's real-time value, automatically triggering component re-render on field change. Useful for dynamically generating content based on a field value (e.g., email suffix completion). It's recommended to extract `useWatch` and its dependent rendering logic into a separate child component to avoid re-rendering the entire form on field changes.

```tsx | pure
const email = Form.useWatch('email', form);
```

| Parameter | Type | Description |
|-----------|------|-------------|
| name | `NamePath` | Field name to watch |
| form | `FormInstance` | Form instance |
| Return value | `any` | Current field value |
