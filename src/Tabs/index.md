---
nav:
  title: Components
  order: 1
group:
  title: Data Display
  order: 3
toc: content
---

# Tabs

Switch between different content panels within the same area. Supports three style variants, sliding indicator animation, closable tabs, and keyboard navigation.

## Basic Usage

<code src="./en/demos/basic.tsx" description="The simplest usage, default line style."></code>

## Style Variants

<code src="./en/demos/variant.tsx" description="Three styles: line (underline), card, and pill."></code>

## Icon Tabs

<code src="./en/demos/icon.tsx" description="Add Lucide icons before tab labels."></code>

## Size

<code src="./en/demos/size.tsx" description="Three sizes: small / medium / large."></code>

## Closable Tabs

<code src="./en/demos/closable.tsx" description="Dynamically add and remove tabs, automatically selects an adjacent tab after closing."></code>

## Extra Content

<code src="./en/demos/extra.tsx" description="Place extra actions on the right side of the tab bar."></code>

## API

### TabsProps

| Property | Type | Default | Description |
|------|------|--------|------|
| items | `TabItem[]` | - | Tab data |
| activeKey | `string` | - | Currently active key (controlled) |
| defaultActiveKey | `string` | - | Default active key (uncontrolled) |
| onChange | `(key: string) => void` | - | Switch callback |
| variant | `'line' \| 'card' \| 'pill'` | `'line'` | Style variant |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size |
| centered | `boolean` | `false` | Center aligned |
| onClose | `(key: string) => void` | - | Close tab callback |
| extra | `ReactNode` | - | Extra content on the right side of the tab bar |
| className | `string` | - | Custom class name |
| style | `CSSProperties` | - | Custom style |

### TabItem

| Property | Type | Description |
|------|------|------|
| key | `string` | Unique identifier |
| label | `ReactNode` | Tab label text |
| icon | `LucideIcon` | Icon |
| children | `ReactNode` | Panel content |
| disabled | `boolean` | Disabled |
| closable | `boolean` | Closable |
