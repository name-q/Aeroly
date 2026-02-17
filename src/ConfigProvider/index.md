---
title: ConfigProvider
group:
  order: 0
nav:
  title: Components
  path: /components
---

# ConfigProvider

Provides unified global configuration for components, including locale (i18n), theme customization, and global size.

## Basic Usage

<code src="./en/demos/basic.tsx"></code>

## Switch Language

<code src="./en/demos/locale.tsx"></code>

## Theme Customization

<code src="./en/demos/theme.tsx"></code>

## Nested Override

<code src="./en/demos/nested.tsx"></code>

## API

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| locale | Locale pack | `Locale` | `zhCN` |
| size | Global size | `'small' \| 'medium' \| 'large'` | - |
| theme | Theme variables, keys without `--aero-` prefix | `Record<string, string>` | - |

## Theme Variables

Override CSS Variables via the `theme` prop, scoped within the ConfigProvider:

```tsx | pure
<ConfigProvider theme={{ 'primary-color': '#ff6a00' }}>
  <Button type="primary">Orange Theme</Button>
</ConfigProvider>
```

Common variables:

| Variable | Description | Default (Light) |
|----------|-------------|-----------------|
| `primary-color` | Primary color | `#50b8e7` |
| `text-color` | Primary text color | `#1a1a1a` |
| `text-secondary` | Secondary text color | `#666666` |
| `border-color` | Border color | `rgba(0,0,0,0.08)` |
| `success-color` | Success color | `#52c41a` |
| `warning-color` | Warning color | `#faad14` |
| `error-color` | Error color | `#f5222d` |

## Built-in Locales

| Locale | Import |
|--------|--------|
| Simplified Chinese | `import { zhCN } from 'aero-ui'` |
| English | `import { enUS } from 'aero-ui'` |

## Custom Locale

A locale is a plain object matching the `Locale` type. You can extend from built-in locales:

```tsx | pure
import { zhCN } from 'aero-ui';
import type { Locale } from 'aero-ui';

const jaJP: Locale = {
  ...zhCN,
  locale: 'ja_JP',
  Modal: { okText: 'OK', cancelText: 'キャンセル' },
  // ... other components
};
```

## Priority

The `locale`, `size`, and `theme` provided by ConfigProvider all follow the same priority rules:

> **Component's own prop > Nearest ConfigProvider > Parent ConfigProvider > Default value**

Props passed directly to a component always take the highest priority. ConfigProvider only takes effect when the component doesn't specify a value. For nested providers, the nearest one wins.

```tsx | pure
<ConfigProvider size="large">
  {/* Global large, Button follows -> large */}
  <Button type="primary">Large Button</Button>

  {/* Component specifies small, overrides global -> small */}
  <Input size="small" placeholder="Small input" />

  {/* Nested ConfigProvider, inner overrides outer -> small */}
  <ConfigProvider size="small">
    <Select options={[]} placeholder="Small select" />
  </ConfigProvider>
</ConfigProvider>
```

The final default value when `size` is not specified is `'medium'`.
