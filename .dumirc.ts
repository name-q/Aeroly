import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  favicons: ['/logo.png'],
  locales: [
    { id: 'en-US', name: 'English' },
    { id: 'zh-CN', name: '中文', base: '/cn' },
  ],
  themeConfig: {
    name: 'AeroUi',
    logo: '/logo.png',
    footer: 'Powered by AeroUi',
    nav: {
      'en-US': [
        { title: 'Guide', link: '/guide/ai-workflow' },
        { title: 'Components', link: '/components/button' },
      ],
      'zh-CN': [
        { title: '指南', link: '/cn/guide/ai-workflow' },
        { title: '组件', link: '/cn/components/button' },
      ],
    },
  },
});
