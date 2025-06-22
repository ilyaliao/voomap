import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import {
  groupIconVitePlugin,
  localIconLoader,
} from 'vitepress-plugin-group-icons'
import llmstxt from 'vitepress-plugin-llms'

export default defineConfig({
  plugins: [
    UnoCSS(),
    groupIconVitePlugin({
      customIcon: {
        voomap: localIconLoader(import.meta.url, 'public/voomap.svg'),
      },
    }),
    llmstxt({
      ignoreFiles: ['index.md', 'README.md', 'zh-TW/**/*'],
      description: 'Voomap is a Vue 3 Google Maps component library with TypeScript support.',
      details: '',
    }),
  ],
})
