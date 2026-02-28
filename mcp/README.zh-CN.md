中文 | [English](https://github.com/name-q/Aeroly/blob/main/mcp/README.md)

# aeroly-mcp

为 AI 编码工作流设计的 MCP Server，提供 [Aeroly](https://github.com/name-q/Aeroly) 组件检索与文档指引能力。

[官网文档](https://aeroly.zeroc.top/) | [GitHub](https://github.com/name-q/Aeroly) | [npm](https://www.npmjs.com/package/aeroly)

## 版本策略

从 `aeroly@1.0.1` 起，`aeroly-mcp` 与 `aeroly` 采用 **1:1 版本映射**。

- `aeroly@1.0.1` -> `aeroly-mcp@1.0.1`
- `aeroly@x.y.z` -> `aeroly-mcp@x.y.z`

请使用相同版本号，避免 API/文档不匹配。

## 使用方式

### 在 Kiro 中配置

Kiro 通过 `mcpServers` 配置 MCP Server。

工作区级别配置（推荐）：`.kiro/settings/mcp.json`

```json
{
  "mcpServers": {
    "aeroly": {
      "command": "npx",
      "args": [
        "aeroly-mcp@latest"
      ],
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

用户级别配置（所有项目生效）：`~/.kiro/settings/mcp.json`

```json
{
  "mcpServers": {
    "aeroly": {
      "command": "npx",
      "args": [
        "aeroly-mcp@latest"
      ],
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

如果你的环境会阻止 npm 交互提示，使用：

```json
{
  "mcpServers": {
    "aeroly": {
      "command": "npx",
      "args": [
        "-y",
        "aeroly-mcp@latest"
      ],
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

如需严格匹配 Aeroly 版本，将 `latest` 替换为具体版本号：

```json
{
  "mcpServers": {
    "aeroly": {
      "command": "npx",
      "args": [
        "aeroly-mcp@1.0.1"
      ],
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

配置加载后，可以让 AI 调用以下工具：

- `list_components`
- `search_components`
- `get_component_doc`
- `refresh_component_index`

Token 优化（可选）：

- `get_component_doc` 默认行为是 `level: "brief"`（无需额外设置）
- 仅需 API 信息时使用 `level: "brief"`（更少 token，更快响应）
- 需要完整文档和示例时使用 `level: "full"`

## npm 包内容

本包内置了预构建的文档和索引，用户项目中无需 Aeroly 源码：

- `data/docs/*.md`（快照文档，从 `src/*/index.md` 生成）
- `data/docs-api/*.md`（API 精简文档：组件标题 + API 部分）
- `data/component-index.json`

`<code src="...">` 示例在构建时已内联，demo 代码可直接阅读。

## 本地开发

```bash
cd mcp
npm install
npm run build:all
npm run smoke
npm start
```

## 工具一览

- `list_components`：列出组件元数据（支持 `group/query/offset/limit`，返回 `hasMore/nextOffset`）
- `search_components`：按意图/关键词检索最匹配的组件
- `get_component_doc`：返回纯 markdown 文本；支持 `level="brief"`（默认，仅 API）和 `level="full"`（完整文档含示例）
- `refresh_component_index`：重建索引并热加载到服务器内存
