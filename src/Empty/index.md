---
nav:
  title: Components
  order: 2
group:
  title: Data Display
  order: 3
title: Empty
order: 9
toc: content
---

# Empty

Placeholder prompt when data is empty, with 6 built-in scene presets ready to use.

## Basic Usage

<code src="./en/demos/basic.tsx" description="Zero configuration needed. Displays 'No Data' by default."></code>

## Scene Presets

<code src="./en/demos/presets.tsx" description="Quickly switch scenes via preset, automatically matching icons and text."></code>

## With Action Button

<code src="./en/demos/action.tsx" description="Add an action area via extra to guide users to the next step."></code>

## Custom Icon

<code src="./en/demos/custom.tsx" description="Pass a Lucide icon or any ReactNode to customize the visual."></code>

## API

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| preset | `EmptyPreset` | `'default'` | Scene preset |
| icon | `LucideIcon \| ReactNode \| null` | - | Custom icon, null to hide |
| iconSize | `number` | `48` | Icon size |
| title | `ReactNode` | - | Main text, overrides preset |
| description | `ReactNode` | - | Description text, overrides preset |
| extra | `ReactNode` | - | Action area |
| image | `ReactNode` | - | Custom image area, overrides icon |
| imageSize | `number` | `120` | Image area size |
| className | `string` | - | Custom class name |
| style | `CSSProperties` | - | Custom style |

### EmptyPreset

| Value | Icon | Default Text |
|-------|------|--------------|
| `default` | Inbox | No Data |
| `search` | Search | No Results Found |
| `noData` | PackageOpen | No Data |
| `noPermission` | ShieldX | No Access Permission |
| `networkError` | WifiOff | Network Error |
| `noContent` | FileX2 | No Content |
