---
title: ConfigProvider 全局化配置
group:
  order: 0
nav:
  title: 组件
  path: /components
---

# ConfigProvider 全局化配置

为组件提供统一的全局化配置，包括语言包（国际化）、主题定制、全局尺寸等。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 切换语言

<code src="./demos/locale.tsx"></code>

## 主题定制

<code src="./demos/theme.tsx"></code>

## 嵌套覆盖

<code src="./demos/nested.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| locale | 语言包 | `Locale` | `zhCN` |
| size | 全局尺寸 | `'small' \| 'medium' \| 'large'` | - |
| theme | 主题变量，key 不含 `--aero-` 前缀 | `Record<string, string>` | - |

## 主题变量

通过 `theme` 属性覆盖 CSS Variables，作用域限定在 ConfigProvider 内部：

```tsx | pure
<ConfigProvider theme={{ 'primary-color': '#ff6a00' }}>
  <Button type="primary">橙色主题</Button>
</ConfigProvider>
```

常用变量：

| 变量名 | 说明 | 默认值（亮色） |
|--------|------|----------------|
| `primary-color` | 主色 | `#50b8e7` |
| `text-color` | 主文本色 | `#1a1a1a` |
| `text-secondary` | 次要文本色 | `#666666` |
| `border-color` | 边框色 | `rgba(0,0,0,0.08)` |
| `success-color` | 成功色 | `#52c41a` |
| `warning-color` | 警告色 | `#faad14` |
| `error-color` | 错误色 | `#f5222d` |

## 内置语言包

| 语言包 | 导入方式 |
|--------|----------|
| 简体中文 | `import { zhCN } from 'aero-ui'` |
| English | `import { enUS } from 'aero-ui'` |

## 自定义语言包

语言包是一个纯对象，结构与 `Locale` 类型一致。你可以基于内置语言包扩展：

```tsx | pure
import { zhCN } from 'aero-ui';
import type { Locale } from 'aero-ui';

const jaJP: Locale = {
  ...zhCN,
  locale: 'ja_JP',
  Modal: { okText: 'OK', cancelText: 'キャンセル' },
  // ... 其他组件
};
```

## 优先级

ConfigProvider 提供的 `locale`、`size`、`theme` 均遵循相同的优先级规则：

> **组件自身 prop > 最近的 ConfigProvider > 上层 ConfigProvider > 默认值**

即组件上直接传入的 prop 始终最优先，ConfigProvider 只在组件未指定时生效。多层嵌套时，就近原则。

```tsx | pure
<ConfigProvider size="large">
  {/* 全局 large，Button 跟随 → large */}
  <Button type="primary">大按钮</Button>

  {/* 组件自身指定 small，覆盖全局 → small */}
  <Input size="small" placeholder="小输入框" />

  {/* 嵌套 ConfigProvider，内层覆盖外层 → small */}
  <ConfigProvider size="small">
    <Select options={[]} placeholder="小选择器" />
  </ConfigProvider>
</ConfigProvider>
```

`size` 未指定时的最终默认值为 `'medium'`。
