import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  favicons: ['/logo.png'],
  themeConfig: {
    name: 'AeroUi',
    logo: '/logo.png',
    footer: 'Powered by AeroUi',
  },
});
