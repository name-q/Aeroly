---
nav:
  title: Components
  order: 2
group:
  title: Feedback
  order: 4
title: Tour
order: 6
toc: content
---

# Tour

Step-by-step guide to help users understand product features, with support for target element highlighting, auto-positioning, and keyboard navigation.

## Basic Usage

<code src="./en/demos/basic.tsx" id="basic-en" description="Bind target elements via ref, automatically highlight and show guide cards."></code>

## Placement

<code src="./en/demos/placement.tsx" id="placement-en" description="Control the popup direction for each step via placement, with auto-flip support."></code>

## CSS Selector Targeting

<code src="./en/demos/selector.tsx" id="selector-en" description="target supports CSS selector strings, no ref needed for positioning."></code>

## Custom Content

<code src="./en/demos/custom.tsx" id="custom-en" description="Fully customize step content via content. Centered display when no target is set."></code>

## API

### TourProps

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| open | `boolean` | - | Whether to show |
| onOpenChange | `(open: boolean) => void` | - | Visibility change callback |
| steps | `TourStepConfig[]` | - | Step configuration |
| current | `number` | - | Current step (controlled) |
| onChange | `(current: number) => void` | - | Step change callback |
| onFinish | `() => void` | - | Finish callback |
| mask | `boolean` | `true` | Whether to show mask |
| maskClosable | `boolean` | `false` | Close on mask click |
| keyboard | `boolean` | `true` | Keyboard navigation (← → Esc) |
| spotlightPadding | `number` | `6` | Spotlight area padding |
| offset | `number` | `12` | Gap between popup and target |
| className | `string` | - | Custom class name |

### TourStepConfig

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| target | `RefObject \| string \| null` | - | Target element, supports ref or CSS selector |
| title | `ReactNode` | - | Title |
| description | `ReactNode` | - | Description |
| placement | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Popup direction |
| content | `ReactNode` | - | Custom content (overrides title + description) |
| mask | `boolean` | - | Per-step mask control, overrides global |

### Keyboard Interaction

| Key | Description |
|-----|-------------|
| `←` / `↑` | Previous step |
| `→` / `↓` | Next step |
| `Esc` | Close tour |
