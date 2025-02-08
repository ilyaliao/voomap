import { resolve } from 'node:path'
import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
  plugins: [
    Vue(),
  ],
  resolve: command === 'build'
    ? {}
    : {
        alias: {
          '@voomap/core': resolve(__dirname, '../../packages/core/index.ts'),
          '@voomap/shared': resolve(__dirname, '../../packages/shared/index.ts'),
        },
      },
  build: {
    minify: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('@voomap/'))
            return 'voomap'
          else
            return 'vendor'
        },
      },
    },
  },
}))
