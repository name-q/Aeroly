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
      'en-US': [{ title: 'Components', link: '/components/button' }],
      'zh-CN': [{ title: '组件', link: '/cn/components/button' }],
    },
  },
});
