---
title: Slider
group:
  title: Data Entry
  order: 3
nav:
  title: Components
  path: /components
toc: content
---

# Slider

Select a value within a range by dragging a slider, supporting single value and range selection.

## Basic Usage

<code src="./en/demos/basic.tsx" id="basic-en"></code>

## Controlled Mode

<code src="./en/demos/controlled.tsx" id="controlled-en"></code>

## Range Selection

<code src="./en/demos/range.tsx" id="range-en"></code>

## Step

<code src="./en/demos/step.tsx" id="step-en"></code>

## Marks

<code src="./en/demos/marks.tsx" id="marks-en"></code>

## Tooltip

<code src="./en/demos/tooltip.tsx" id="tooltip-en"></code>

## Animation

<code src="./en/demos/animated.tsx" id="animated-en"></code>

## Vertical Mode

<code src="./en/demos/vertical.tsx" id="vertical-en"></code>

## Disabled

<code src="./en/demos/disabled.tsx" id="disabled-en"></code>

## API

| Property | Description | Type | Default |
|------|------|------|--------|
| value | Current value (controlled) | `number \| [number, number]` | - |
| defaultValue | Default value (uncontrolled) | `number \| [number, number]` | `0` |
| min | Minimum value | `number` | `0` |
| max | Maximum value | `number` | `100` |
| step | Step size, set to `null` to only allow marks values | `number \| null` | `1` |
| marks | Tick marks | `Record<number, ReactNode>` | - |
| disabled | Whether disabled (grayed out and non-interactive) | `boolean` | `false` |
| readOnly | Whether read only (normal appearance but non-interactive) | `boolean` | `false` |
| range | Whether range selection | `boolean` | `false` |
| vertical | Whether vertical | `boolean` | `false` |
| tooltipVisible | Whether to always show tooltip | `boolean` | - |
| tipFormatter | Custom tooltip formatter, set to `null` to hide | `((value: number) => ReactNode) \| null` | `(v) => v` |
| animated | Whether to enable track shine flow animation | `boolean` | `true` |
| onChange | Change callback | `(value: number \| [number, number]) => void` | - |
| onChangeComplete | Drag end callback | `(value: number \| [number, number]) => void` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |
