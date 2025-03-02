// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    rules: {
      'import/first': 'off',
    },
    markdown: {
      overrides: {
        'vue/no-parsing-error': 'off',
        'ts/no-empty-object-type': 'off',
      },
    },
  },
)
