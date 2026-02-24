---
title: AI 驱动的设计到代码
order: 1
nav:
  title: 指南
  path: /guide
  order: -1
toc: content
---

# AI 驱动的设计到代码

Aeroly 是一个为 AI 编码而设计的 React 组件库。结合 Pencil 设计工具，可以实现完整的工作流闭环：**在 Pencil 中设计 → AI 使用 Aeroly 生成 React 代码**。

本指南将带你走完整个流程。

---

## 第一步：安装

```bash
pnpm i Aeroly lucide-react
```

如果你的项目使用 Vite，还需要安装 Less 支持：

```bash
pnpm i -D less
```

然后直接导入使用组件：

```tsx | pure
import { Button, Input, Select } from 'aeroly';

export default () => (
  <div>
    <Input placeholder="请输入内容" />
    <Button>提交</Button>
  </div>
);
```

### 需要手动引入全局样式文件吗？

**不需要。** 每个组件的样式文件会自动引入全局 CSS Variables 定义。当你的打包工具（webpack / Vite）处理 Less 文件时，`:root` 下的 CSS Variables 会自动注入到页面中，无需额外操作。

唯一的前提是你的打包工具支持 Less 编译 —— webpack 原生支持，Vite 安装 `less` 作为开发依赖即可。

---

## 第二步：打开设计文件

项目根目录下的 `Aeroly.pen` 是一个 Pencil 设计文件，包含 **91 个可复用组件**，与 Aeroly 组件库一一对应。在支持 Pencil MCP 的 IDE（如 Kiro 或配置了 Pencil 插件的 Cursor）中打开它。

设计系统包含以下组件：

| 分类 | 组件 |
|------|------|
| 通用 | Button（Primary / Default / Text / Danger）、Icon、Divider |
| 表单 | Input、InputGroup、TextArea、Select、Checkbox、Radio、Switch、DatePicker、TimePicker、DateRangePicker、ColorPicker、Cascader、TreeSelect、AutoComplete、Rate、Slider、Upload |
| 数据展示 | Table、Tree、Tag、Badge、Statistic、Descriptions、Carousel、Image、QRCode、Empty、Skeleton |
| 反馈 | Modal、Drawer、Message、Notification、Alert、Spin、Progress、Tour、Tooltip、Popover、Dropdown |
| 导航 | Menu、Tabs、Breadcrumb、Pagination、Steps、Segmented |
| 布局 | Watermark |

---

## 第三步：让 AI 设计页面

让 AI 使用 `Aeroly.pen` 中的组件来组合页面布局。例如：

> "设计一个用户管理后台，左侧有菜单栏，顶部有搜索框，中间是数据表格和分页。"

AI 会：
1. 读取 `.pen` 文件中的可用组件
2. 在画布上按合理的布局、间距和对齐方式排列组件
3. 根据你的需求自定义文本内容、颜色和尺寸

你可以反复迭代设计：
- "把侧边栏再窄一点"
- "主按钮颜色换成紫色"
- "加一个新建用户的弹窗"

在进入代码生成之前，使用截图工具确认设计效果。

---

## 第四步：从设计生成 React 代码

对设计满意后，让 AI 生成 React 代码：

> "读取 Aeroly.pen 中的后台设计稿，使用 Aeroly 组件生成 React 页面。"

AI 会将视觉设计转化为可运行的 React 代码

---

## 主题与定制

### 暗色模式

通过设置 `data-theme` 属性切换暗色模式：

```ts
document.documentElement.setAttribute('data-theme', 'dark');
```

所有 Aeroly 组件会自动适配 —— 颜色、阴影、毛玻璃效果都会切换到暗色变体。

### 运行时主题覆盖

使用 `ConfigProvider` 在运行时覆盖主题色、语言和全局尺寸：

```tsx | pure
import { ConfigProvider, zhCN } from 'aeroly';

<ConfigProvider
  locale={zhCN}
  size="small"
  theme={{ 'primary-color': '#7c3aed' }}
>
  <App />
</ConfigProvider>
```

支持的主题键：`primary-color`、`success-color`、`warning-color`、`error-color`、`border-radius`。

### 国际化

Aeroly 内置英文（`enUS`）和中文（`zhCN`）语言包。包含默认文案的组件（Modal、DatePicker、Pagination 等）会自动使用配置的语言。

```tsx | pure
import { ConfigProvider, enUS } from 'aeroly';

<ConfigProvider locale={enUS}>
  <App />
</ConfigProvider>
```

---

## 常见问题

### 为什么不需要引入 CSS 文件？

Aeroly 随 JavaScript 一起分发 Less 源文件。每个组件的 Less 文件都引入了全局 `variables.less`，其中在 `:root` 下定义了所有 CSS Variables。你的打包工具处理这些 Less 文件时会自动注入样式。

### 如果我的项目不支持 Less 怎么办？

如果无法为打包工具添加 Less 支持，可以手动编译样式。不过大多数现代 React 项目（Create React App、Vite、Next.js、Umi）都原生支持或只需少量配置即可支持 Less。

### 不用 Pencil 设计文件可以吗？

完全可以。`.pen` 文件是可选的 —— 它增强了 AI 工作流，但不是必需的。你可以像使用其他组件库一样，直接在代码中使用 Aeroly 组件。
