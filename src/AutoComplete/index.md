---
nav:
  title: Components
  order: 1
group:
  title: Data Entry
  order: 3
toc: content
---

# AutoComplete

Input with auto-completion, supporting local filtering and async search. Unlike Select: allows free input without forcing selection from options.

## Basic Usage

<code src="./en/demos/basic.tsx" id="basic-en"></code>

## Async Search

<code src="./en/demos/async.tsx" id="async-en"></code>

## Usage in Form

<code src="./en/demos/form.tsx" id="form-en"></code>

## API

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| value | `string` | - | Current value (controlled) |
| defaultValue | `string` | `''` | Default value |
| onChange | `(value: string) => void` | - | Value change callback (input or selection) |
| onSelect | `(value: string, option: AutoCompleteOption) => void` | - | Option selected callback |
| options | `AutoCompleteOption[]` | `[]` | Option list |
| placeholder | `string` | - | Placeholder text |
| disabled | `boolean` | `false` | Whether disabled |
| allowClear | `boolean` | `false` | Allow clear |
| loading | `boolean` | `false` | Loading state |
| notFoundContent | `ReactNode` | - | Content when no match found |
| filterOption | `boolean \| (input, option) => boolean` | `true` | Custom filter, pass `false` to disable built-in filtering (for async search) |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size |
| status | `'error' \| 'warning'` | - | Status (for use with Form) |
| prefix | `ReactNode` | - | Prefix icon |
| className | `string` | - | Custom class name |
| style | `React.CSSProperties` | - | Custom style |

### AutoCompleteOption

| Property | Type | Description |
|----------|------|-------------|
| value | `string` | Option value |
| label | `ReactNode` | Display text (defaults to value) |
| disabled | `boolean` | Whether disabled |
