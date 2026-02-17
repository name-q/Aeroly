---
nav:
  title: 组件
  order: 1
group:
  title: 数据录入
  order: 3
toc: content
---

# AutoComplete 自动补全

输入框自动补全，支持本地过滤和异步搜索。与 Select 的区别：允许自由输入，不强制从选项中选择。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 异步搜索

<code src="./demos/async.tsx"></code>

## 在表单中使用

<code src="./demos/form.tsx"></code>

## API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | `string` | - | 当前值（受控） |
| defaultValue | `string` | `''` | 默认值 |
| onChange | `(value: string) => void` | - | 值变化回调（输入或选中） |
| onSelect | `(value: string, option: AutoCompleteOption) => void` | - | 选中选项回调 |
| options | `AutoCompleteOption[]` | `[]` | 选项列表 |
| placeholder | `string` | - | 占位文案 |
| disabled | `boolean` | `false` | 是否禁用 |
| allowClear | `boolean` | `false` | 允许清除 |
| loading | `boolean` | `false` | 加载中状态 |
| notFoundContent | `ReactNode` | - | 无匹配时提示 |
| filterOption | `boolean \| (input, option) => boolean` | `true` | 自定义过滤，传 `false` 关闭内置过滤（异步搜索时使用） |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 尺寸 |
| status | `'error' \| 'warning'` | - | 状态（配合 Form 使用） |
| prefix | `ReactNode` | - | 前缀图标 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |

### AutoCompleteOption

| 属性 | 类型 | 说明 |
|------|------|------|
| value | `string` | 选项值 |
| label | `ReactNode` | 显示文本（默认同 value） |
| disabled | `boolean` | 是否禁用 |
