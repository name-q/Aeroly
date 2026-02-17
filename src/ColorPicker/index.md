---
nav:
  title: Components
  order: 1
group:
  title: Data Entry
  order: 3
toc: content
---

# ColorPicker

A color picker supporting Hex, RGB input and opacity adjustment.

## Basic Usage

<code src="./en/demos/basic.tsx" description="Click the trigger to open the color panel, drag or type to modify the color."></code>

## Opacity

<code src="./en/demos/alpha.tsx" description="Enable showAlpha for opacity selection, outputs rgba format."></code>

## Preset Colors

<code src="./en/demos/presets.tsx" description="Provide commonly used colors for quick selection via presets."></code>

## Size

<code src="./en/demos/size.tsx" description="Three sizes: small / medium / large."></code>

## Disabled

<code src="./en/demos/disabled.tsx" description="Disabled state."></code>

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| value | Color value (controlled) | `string` | - |
| defaultValue | Default color | `string` | `'#1677ff'` |
| onChange | Callback when color changes | `(color: string) => void` | - |
| showAlpha | Show opacity | `boolean` | `false` |
| disabled | Disabled | `boolean` | `false` |
| size | Trigger size | `'small' \| 'medium' \| 'large'` | `'medium'` |
| presets | Preset color list | `string[]` | - |
| placement | Popup direction | `PopoverPlacement` | `'bottom'` |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |
