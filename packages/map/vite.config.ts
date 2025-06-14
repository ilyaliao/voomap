import { resolve } from 'node:path'
import Vue from '@vitejs/plugin-vue'
import VueComplexTypes from '@vue.ts/complex-types/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueComplexTypes(),
    Vue(),
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
    dedupe: [
      'vue',
      '@vue/runtime-core',
    ],
  },
})
