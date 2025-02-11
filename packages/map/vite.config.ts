import path, { resolve } from 'node:path'
import process from 'node:process'
import Vue from '@vitejs/plugin-vue'
import VueComplexTypes from '@vue.ts/complex-types/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueComplexTypes({
      tsconfigPath: path.join(process.cwd(), 'tsconfig.build.json'),
    }),
    Vue(),
    dts({
      tsconfigPath: 'tsconfig.build.json',
      cleanVueFileName: true,
      rollupTypes: true,
    }),
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
  build: {
    minify: false,
    target: 'esnext',
    sourcemap: true,
    lib: {
      name: 'voomap-map',
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
      },
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies ?? {}),
        ...Object.keys(pkg.peerDependencies ?? {}),
      ],
      output: {
        exports: 'named',
        globals: {
          'vue': 'Vue',
          '@voomap/core': 'VoomapCore',
        },
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'style.css')
            return 'index.css'
          return chunkInfo.name as string
        },
      },
    },
  },
})
