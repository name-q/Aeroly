---
nav:
  title: 组件
  order: 1
group:
  title: 导航
  order: 2
toc: content
---

# Affix 固钉

将元素固定在可视区域的指定位置。基于 `position: sticky` 实现，零 JS 定位计算。

自动感知最近的可滚动祖先容器，多实例互不干扰。

## 吸顶固定

<code src="./demos/basic.tsx"></code>

## 吸底固定

<code src="./demos/bottom.tsx"></code>

## 多实例 & 多容器

<code src="./demos/multiple.tsx"></code>

## API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| offsetTop | `number` | `0` | 距顶部固定距离（px） |
| offsetBottom | `number` | - | 距底部固定距离（px），设置后变为吸底模式，与 offsetTop 互斥 |
| onChange | `(affixed: boolean) => void` | - | 固定状态变化回调 |
| target | `() => HTMLElement \| Window` | 自动查找 | 自定义滚动容器，默认向上查找最近的可滚动祖先 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
