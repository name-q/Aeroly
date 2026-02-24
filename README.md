<p align="center">
  <a href="https://aeroly.zeroc.top">
    <img src="./logo.png" alt="aeroly" width="120" />
  </a>
</p>

<h1 align="center">aeroly</h1>

<p align="center">A React component library designed for AI collaboration and effortless interface building.</p>

<p align="center">
  <a href="https://npmjs.org/package/aeroly"><img src="https://img.shields.io/npm/v/aeroly.svg?style=flat" alt="NPM version" /></a>
  <a href="https://npmjs.org/package/aeroly"><img src="https://img.shields.io/npm/dm/aeroly.svg?style=flat" alt="NPM downloads" /></a>
  <a href="https://github.com/name-q/aeroly/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/aeroly.svg" alt="License" /></a>
</p>

<p align="center">
  <a href="https://aeroly.zeroc.top">Documentation</a> · <a href="https://aeroly.zeroc.top/cn">中文文档</a> · <a href="https://aeroly.zeroc.top/guide/ai-workflow">AI Workflow Guide</a>
</p>

---

## Features

- **Pencil Support** — Built-in `.pen` design file with 91 reusable components. AI reads the design and generates React code directly.
- **60+ Components** — From Form to Table, Modal to Masonry — a comprehensive toolkit for production interfaces.
- **AI-Friendly** — Consistent API patterns (`value`/`onChange`, `open`/`onOpenChange`, `size`, `disabled`) so AI can predict usage across all components.
- **Themeable** — CSS Variables + `ConfigProvider` for runtime theme switching. Dark mode built-in.
- **i18n Ready** — Built-in English and Chinese locale packs, easily extensible.
- **Lightweight** — Tree-shakeable ESM exports, zero runtime CSS-in-JS. Less + CSS Variables keep the bundle lean.

## Install

```bash
pnpm i aeroly lucide-react
```

Vite projects also need Less:

```bash
pnpm i -D less
```

## Quick Start

```tsx
import { Button, Input, ConfigProvider } from 'aeroly';

export default () => (
  <ConfigProvider>
    <Input placeholder="Enter something" />
    <Button type="primary">Submit</Button>
  </ConfigProvider>
);
```

No global CSS import needed — styles are injected automatically when your bundler processes the component Less files.

## AI Workflow with Pencil

aeroly ships with an `aeroly.pen` design file containing all components as reusable design elements. In an IDE with Pencil MCP support:

1. **Open** `aeroly.pen` in your editor
2. **Ask AI** to design a page using the components
3. **Iterate** on the design visually
4. **Ask AI** to read the design and generate React code with aeroly

See the [AI Workflow Guide](https://aeroly.zeroc.top/guide/ai-workflow) for details.

## Theming

```tsx
import { ConfigProvider } from 'aeroly';

<ConfigProvider
  theme={{ 'primary-color': '#7c3aed' }}
  size="small"
>
  <App />
</ConfigProvider>
Toggle dark mode:

```ts
document.documentElement.setAttribute('data-theme', 'dark');
```

## Internationalization

```tsx
import { ConfigProvider, enUS, zhCN } from 'aeroly';

<ConfigProvider locale={enUS}>
  <App />
</ConfigProvider>
```

## Mock Server

The `server/` directory contains a local Koa server for testing file upload demos. To start it:

```bash
cd server && node index.js
```

This launches a mock backend on `http://localhost:3001` that handles upload requests for the Upload component demos.

## Links

- [Documentation](https://aeroly.zeroc.top)
- [AI Workflow Guide](https://aeroly.zeroc.top/guide/ai-workflow)
- [GitHub](https://github.com/name-q/aeroly)

## License

[MIT](./LICENSE)
