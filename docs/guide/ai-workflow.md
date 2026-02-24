---
title: AI-Driven Design to Code
order: 1
nav:
  title: Guide
  path: /guide
  order: -1
toc: content
---

# AI-Driven Design to Code

AeroUI is a React component library designed for AI coding. Combined with the Pencil design tool, it enables a complete workflow: **Design in Pencil → AI generates React code using AeroUI**.

This guide walks you through the entire process.

---

## Step 1: Install

```bash
pnpm i aero-ui lucide-react
```

If your project uses Vite, you also need Less support:

```bash
pnpm i -D less
```

Then import and use components directly:

```tsx
import { Button, Input, Select } from 'aero-ui';

export default () => (
  <div>
    <Input placeholder="Enter something" />
    <Button>Submit</Button>
  </div>
);
```

### Do I need to import global styles manually?

**No.** Each component's style file automatically imports the global CSS Variables definition. When your bundler (webpack / Vite) processes the Less files, the `:root` CSS Variables are injected into the page automatically. No extra import is needed.

The only prerequisite is that your bundler supports Less compilation — which webpack does out of the box, and Vite supports after installing `less` as a dev dependency.

---

## Step 2: Open the Design File

The `AeroUi.pen` file at the project root is a Pencil design file containing **91 reusable components** that mirror the AeroUI component library. Open it in an IDE that supports the Pencil MCP server (such as Kiro or Cursor with the Pencil plugin).

The design system includes:

| Category | Components |
|----------|-----------|
| General | Button (Primary / Default / Text / Danger), Icon, Divider |
| Form | Input, InputGroup, TextArea, Select, Checkbox, Radio, Switch, DatePicker, TimePicker, DateRangePicker, ColorPicker, Cascader, TreeSelect, AutoComplete, Rate, Slider, Upload |
| Data Display | Table, Tree, Tag, Badge, Statistic, Descriptions, Carousel, Image, QRCode, Empty, Skeleton |
| Feedback | Modal, Drawer, Message, Notification, Alert, Spin, Progress, Tour, Tooltip, Popover, Dropdown |
| Navigation | Menu, Tabs, Breadcrumb, Pagination, Steps, Segmented |
| Layout | Watermark |

---

## Step 3: Design Your Page with AI

Ask the AI to compose a page layout using the components in `AeroUi.pen`. For example:

> "Design a user management dashboard with a sidebar menu, a data table, pagination, and a search input at the top."

The AI will:
1. Read the available components from the `.pen` file
2. Arrange them on the canvas with proper layout, spacing, and alignment
3. Customize text content, colors, and sizes to match your requirements

You can iterate on the design:
- "Make the sidebar narrower"
- "Change the primary button color to purple"
- "Add a modal for creating new users"

Use the screenshot tool to verify the design looks correct before moving to code generation.

---

## Step 4: Generate React Code from the Design

Once you're happy with the design, ask the AI to generate React code:

> "Read the dashboard design from AeroUi.pen and generate a React page using AeroUI components."

The AI will translate the visual design into working React code:

```tsx
import React, { useState } from 'react';
import {
  Layout, Menu, Input, Button, Table, Pagination, Modal, Tag, Flex
} from 'aero-ui';
import { Users, Settings, Search, Plus } from 'lucide-react';

export default function UserManagement() {
  const [current, setCurrent] = useState(1);

  const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Role', dataIndex: 'role', render: (v: string) => <Tag>{v}</Tag> },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider>
        <Menu
          items={[
            { key: 'users', label: 'Users', icon: <Users size={16} /> },
            { key: 'settings', label: 'Settings', icon: <Settings size={16} /> },
          ]}
          selectedKeys={['users']}
        />
      </Layout.Sider>
      <Layout>
        <Layout.Content style={{ padding: 24 }}>
          <Flex gap={12} style={{ marginBottom: 16 }}>
            <Input prefix={<Search size={16} />} placeholder="Search users" />
            <Button type="primary" icon={<Plus size={16} />}>Add User</Button>
          </Flex>
          <Table columns={columns} dataSource={[]} rowKey="id" />
          <Pagination current={current} total={100} onChange={setCurrent} />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
```

---

## Theming and Customization

### Dark Mode

Toggle dark mode by setting the `data-theme` attribute:

```ts
document.documentElement.setAttribute('data-theme', 'dark');
```

All AeroUI components automatically adapt — colors, shadows, and glassmorphism effects switch to their dark variants.

### Runtime Theme Override

Use `ConfigProvider` to override theme colors, locale, and global size at runtime:

```tsx
import { ConfigProvider, enUS } from 'aero-ui';

<ConfigProvider
  locale={enUS}
  size="small"
  theme={{ 'primary-color': '#7c3aed' }}
>
  <App />
</ConfigProvider>
```

Supported theme keys: `primary-color`, `success-color`, `warning-color`, `error-color`, `border-radius`.

### Internationalization

AeroUI ships with English (`enUS`) and Chinese (`zhCN`) locale packs. Components with built-in text (Modal, DatePicker, Pagination, etc.) automatically use the configured locale.

```tsx
import { ConfigProvider, zhCN } from 'aero-ui';

<ConfigProvider locale={zhCN}>
  <App />
</ConfigProvider>
```

---

## FAQ

### Why don't I need to import a CSS file?

AeroUI distributes Less source files alongside compiled JavaScript. Each component's Less file imports the global `variables.less` which defines all CSS Variables at `:root`. Your bundler processes these Less files and injects the styles automatically.

### What if my project doesn't support Less?

If you cannot add Less support to your bundler, you can manually compile the styles. However, most modern React setups (Create React App, Vite, Next.js, Umi) support Less either natively or with minimal configuration.

### Can I use AeroUI without the Pencil design file?

Absolutely. The `.pen` file is optional — it enhances the AI workflow but is not required. You can use AeroUI components directly in code just like any other component library.
