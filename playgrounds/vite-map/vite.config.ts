import { resolve } from 'node:path'
import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    Vue(),
  ],
  resolve: {
    alias: {
      '@voomap/core': resolve(__dirname, '../../packages/core/index.ts'),
      '@voomap/shared': resolve(__dirname, '../../packages/shared/index.ts'),
    },
  },
})
