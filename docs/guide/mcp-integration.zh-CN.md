---
title: MCP 集成
order: 2
nav:
  title: 指南
  path: /guide
  order: -1
toc: content
---

# MCP 集成

Aeroly 提供官方 MCP（Model Context Protocol）Server —— `aeroly-mcp`。它让 AI 编码助手能够实时查询组件文档、搜索 API、获取用法示例，确保 AI 始终生成正确的 Aeroly 代码，不会凭空捏造 props 或误用组件。

---

## 为什么需要 MCP？

AI 在使用组件库写代码时，经常会猜测 prop 名称、编造不存在的 API、或使用过时的写法。MCP 通过给 AI 提供一个实时连接到组件索引的通道来解决这个问题：

- AI 调用 `search_components` 找到适合当前任务的组件
- AI 调用 `get_component_doc` 在生成代码前读取准确的 API 表格
- 没有过时的训练数据 —— 文档来自你安装的同一版本

结果：更少的幻觉，更少的修复轮次，更快的开发速度。

---

## 快速配置

通过 npx 启动，无需全局安装。将以下配置添加到你的 IDE 的 MCP 配置中：

### Kiro

工作区配置：`.kiro/settings/mcp.json`

```json
{
  "mcpServers": {
    "aeroly": {
      "command": "npx",
      "args": ["-y", "aeroly-mcp@latest"],
      "autoApprove": [
        "list_components",
        "search_components",
        "get_component_doc",
        "refresh_component_index"
      ]
    }
  }
}
```

### Claude Code

项目配置：`.claude/settings.json`

```json
{
  "mcpServers": {
    "aeroly": {
      "command": "npx",
      "args": ["-y", "aeroly-mcp@latest"]
    }
  }
}
```

### Cursor

项目配置：`.cursor/mcp.json`

```json
{
  "mcpServers": {
    "aeroly": {
      "command": "npx",
      "args": ["-y", "aeroly-mcp@latest"]
    }
  }
}
```

配置加载后，AI 会自动调用这些工具，无需手动触发。

---

## 可用工具

| 工具 | 说明 |
|------|------|
| `list_components` | 列出所有组件及元数据。支持 `group`、`query`、`offset`、`limit` 进行过滤和分页。 |
| `search_components` | 按意图语义搜索。例如 "表单验证弹窗" 会返回按相关度排序的最匹配组件。 |
| `get_component_doc` | 返回组件 markdown 文档。`level="brief"`（默认）仅返回 API 表格；`level="full"` 返回包含 demo 代码的完整文档。 |
| `refresh_component_index` | 重建组件索引并热加载到服务器内存。 |

---

## 实际工作流程

### 场景：构建用户设置页

你告诉 AI：

> "构建一个用户设置页面，包含个人信息表单、密码修改区域和保存按钮。"

AI 在后台会：

1. 调用 `search_components`，查询 `"form input button"` 找到相关组件
2. 调用 `get_component_doc` 读取 `Form`、`Input`、`Button` 的准确 props
3. 使用正确的 API 生成代码 —— `Form.Item`、`rules`、`onFinish` 等

没有 MCP 时，AI 可能会猜测 `Form` 使用 `onSubmit`（实际是 `onFinish`），或者把校验规则放在 `Form` 上而不是 `Form.Item` 上。有了 MCP，它会先读取实际 API。

### 场景：选择正确的组件

你告诉 AI：

> "我需要一个省/市/区的级联选择器。"

AI 调用 `search_components` 查询 "级联选择器"，得到 `Cascader` 作为最佳匹配，然后读取完整文档了解 `options` 数据结构、`onChange` 签名以及 `loadData` 异步加载方式。

---

## Token 优化

MCP 的响应设计注重 token 效率：

- `level="brief"`（默认）仅返回组件标题和 API 表格 —— 通常 30-50 行
- `level="full"` 返回包含内联 demo 代码的完整文档 —— 当 AI 需要用法示例时使用
- `list_components` 支持分页（`offset`/`limit`），避免一次加载全部 57 个组件

大多数代码生成任务用 `brief` 就够了。只有当 AI 需要理解复杂模式（如 Form 校验规则、Table 自定义列）时才需要升级到 `full`。

---

## 版本匹配

`aeroly-mcp` 与 `aeroly` 采用 1:1 版本映射：

| aeroly | aeroly-mcp |
|--------|------------|
| 1.0.1  | 1.0.1     |
| x.y.z  | x.y.z     |

大多数情况下使用 `@latest` 即可。如需严格的 API 一致性，可以锁定具体版本：

```json
{
  "args": ["aeroly-mcp@1.0.1"]
}
```

---

## 包内容

npm 包内置了预构建数据，无需 Aeroly 源码即可工作：

- `data/docs/*.md` —— 完整组件文档，demo 代码已内联
- `data/docs-api/*.md` —— API 精简文档（标题 + props 表格）
- `data/component-index.json` —— 结构化索引，含 props、关键词、受控对、反模式规则

无网络请求，无外部依赖 —— 一切通过 stdio 在本地运行。

---

## 与 Pencil 配合使用

MCP 和 Pencil 在 AI 工作流中互为补充：

1. **设计阶段**：AI 通过 Pencil MCP 读取 `Aeroly.pen` 来组合视觉布局
2. **代码生成阶段**：AI 通过 `aeroly-mcp` 读取组件 API 来生成正确的 React 代码
3. **迭代**：修改设计，重新生成代码 —— 两个工具保持同步，因为它们引用的是同一个组件库

这给你一个完整的闭环：**设计 → 代码 → 迭代**，全程 AI 辅助。

---

## 相关链接

- [aeroly-mcp npm 主页](https://www.npmjs.com/package/aeroly-mcp)
- [Aeroly GitHub 仓库](https://github.com/name-q/Aeroly)
- [Aeroly 官方文档](https://aeroly.zeroc.top/)
