---
nav:
  title: Components
  order: 1
group:
  title: Navigation
  order: 4
toc: content
---

# Breadcrumb

Displays the current page's position in the system hierarchy and allows navigating back up.

## Basic Usage

<code src="./en/demos/basic.tsx" id="basic-en" description="The simplest breadcrumb, with the last item being the current page."></code>

## With Icons

<code src="./en/demos/icon.tsx" id="icon-en" description="Each item can be configured with a Lucide icon."></code>

## Custom Separator

<code src="./en/demos/separator.tsx" id="separator-en" description="Customize the separator via the separator prop, supports string or ReactNode."></code>

## Dropdown Menu

<code src="./en/demos/menu.tsx" id="menu-en" description="Add a dropdown selection to an item via menu, shown on hover."></code>

## Collapse

<code src="./en/demos/collapse.tsx" id="collapse-en" description="When maxItems is set, excess middle items collapse into an ellipsis, expanding on hover."></code>

## API

### Breadcrumb

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| items | Breadcrumb data | `BreadcrumbItemType[]` | - |
| separator | Custom separator | `ReactNode` | `<ChevronRight />` |
| maxItems | Collapse middle items when exceeding this count | `number` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

### BreadcrumbItemType

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| label | Display text | `ReactNode` | - |
| href | Link URL | `string` | - |
| icon | Icon (Lucide component) | `LucideIcon` | - |
| onClick | Click callback (prevents navigation when href is also present, only executes callback) | `(e: MouseEvent) => void` | - |
| menu | Dropdown menu items | `{ label, href?, onClick? }[]` | - |
