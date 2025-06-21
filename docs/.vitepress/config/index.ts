import { defineConfig } from 'vitepress'
import { groupIconMdPlugin } from 'vitepress-plugin-group-icons'
import { getLocaleConfig } from './theme'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  locales: {
    'root': getLocaleConfig('en'),
    'zh-TW': getLocaleConfig('zh-TW'),
  },

  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          'zh-TW': {
            translations: {
              button: {
                buttonText: '搜尋文檔',
                buttonAriaLabel: '搜尋文檔',
              },
              modal: {
                noResultsText: '無法找到相關結果',
                resetButtonTitle: '清除查詢條件',
                footer: {
                  selectText: '選擇',
                  navigateText: '切換',
                  closeText: '關閉',
                },
              },
            },
          },
        },
      },
    },
  },

  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },
})
