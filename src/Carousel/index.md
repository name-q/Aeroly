---
nav:
  title: 组件
  order: 2
group:
  title: 数据展示
  order: 3
title: Carousel 走马灯
order: 8
---

# Carousel 走马灯

循环播放一组内容，支持滑动和淡入淡出两种切换效果。

## 基础用法

<code src="./demos/basic.tsx" description="水平滑动切换，hover 显示箭头，点击指示点跳转。"></code>

## 自动播放

<code src="./demos/autoplay.tsx" description="开启 autoplay 自动轮播，鼠标悬停时暂停，离开后恢复。"></code>

## 淡入淡出

<code src="./demos/fade.tsx" description="effect='fade' 切换时平滑淡入淡出。"></code>

## 垂直方向

<code src="./demos/vertical.tsx" description="direction='vertical' 垂直滑动，指示点在右侧。"></code>

## 外部控制

<code src="./demos/custom.tsx" description="通过 ref 获取 next / prev / goTo 方法，实现外部按钮控制。"></code>

## API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| items | `CarouselItem[]` | - | 轮播项数据 |
| current | `number` | - | 当前索引（受控） |
| defaultCurrent | `number` | `0` | 默认索引 |
| onChange | `(current: number) => void` | - | 切换回调 |
| beforeChange | `(from: number, to: number) => void` | - | 切换前回调 |
| effect | `'slide' \| 'fade'` | `'slide'` | 切换效果 |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | 方向 |
| autoplay | `boolean` | `false` | 自动播放 |
| autoplayInterval | `number` | `3000` | 自动播放间隔 (ms) |
| arrows | `boolean \| 'hover'` | `'hover'` | 箭头显示方式 |
| dots | `boolean` | `true` | 指示点 |
| dotsPosition | `'bottom' \| 'top' \| 'left' \| 'right' \| 'inner'` | `'inner'` | 指示点位置，inner 叠在内容底部 |
| loop | `boolean` | `true` | 循环播放 |
| height | `number \| string` | - | 垂直模式高度 |
| className | `string` | - | 自定义类名 |
| style | `CSSProperties` | - | 自定义样式 |

### CarouselItem

| 属性 | 类型 | 说明 |
|------|------|------|
| key | `string` | 唯一标识 |
| children | `ReactNode` | 内容 |

### CarouselRef

通过 `ref` 获取实例方法：

| 方法 | 说明 |
|------|------|
| `next()` | 下一张 |
| `prev()` | 上一张 |
| `goTo(index)` | 跳转到指定索引 |

### 键盘操作

| 按键 | 说明 |
|------|------|
| `←` / `→` | 水平模式切换 |
| `↑` / `↓` | 垂直模式切换 |
