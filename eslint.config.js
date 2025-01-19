// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: ['dist', 'html', 'node_modules', '*.d.ts', '!.vitepress', 'docs/.vitepress/cache/deps/*.*'],
    formatters: true,
    markdown: {
      overrides: {
        'ts/no-empty-object-type': 'off',
        'vue/no-parsing-error': 'off',
      },
    },
  },
  {
    rules: {
      'no-irregular-whitespace': 'off',
    },
  },
)
