import type { DefaultTheme, HeadConfig, LocaleConfig } from 'vitepress'
import { createTranslate } from '../i18n/utils'

export function getLocaleConfig(lang: string) {
  const t = createTranslate(lang)

  const urlPrefix = lang && lang !== 'en' ? (`/${lang}` as const) : ''
  const title = t('Voomap')
  const description = t('Vue 3 Google Maps Components')
  const titleTemplate = `:title - ${description}`

  const docsLink = `https://voomap.vercel.app/`
  const ogImage = `${docsLink}og-image.png`

  const head: HeadConfig[] = [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/voomap.svg' }],
    ['meta', { name: 'theme-color', content: '#4285f4' }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: docsLink }],
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'twitter:image', content: ogImage }],
  ]

  const nav: DefaultTheme.NavItem[] = [
    { text: t('Home'), link: `${urlPrefix}/` },
    { text: t('Guide'), link: `${urlPrefix}/guide/` },
  ]

  const sidebar: DefaultTheme.SidebarItem[] = [
    {
      text: t('Guide'),
      base: `${urlPrefix}/guide`,
      items: [
        { text: t('Introduction'), link: '/' },
        { text: t('Getting Started'), link: '/getting-started' },
      ],
    },
    {
      text: t('Components'),
      base: `${urlPrefix}/reference/components`,
      items: [
        { text: t('GoogleMap'), link: '/google-map' },
        { text: t('Marker'), link: '/marker' },
      ],
    },
    {
      text: t('Composables'),
      base: `${urlPrefix}/reference/composables`,
      items: [
        { text: t('useGoogleMap'), link: '/use-google-map' },
        { text: t('useInfoWindow'), link: '/use-info-window' },
        { text: t('useMarker'), link: '/use-marker' },
      ],
    },
  ]

  const themeConfig: DefaultTheme.Config = {
    logo: { src: '/voomap.svg', width: 24, height: 24 },
    nav,
    sidebar,
    outline: 'deep',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ilyaliao/voomap' },
      { icon: 'npm', link: 'https://npmjs.com/package/@voomap/map' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present IlyaL',
    },
  }

  if (lang === 'zh-TW') {
    Object.assign(themeConfig, {
      outline: {
        label: '頁面導航',
        level: 'deep',
      },
      lastUpdatedText: '最後更新於',
      darkModeSwitchLabel: '外觀',
      sidebarMenuLabel: '目錄',
      returnToTopLabel: '返回頂部',
      langMenuLabel: '選擇語言',
      docFooter: {
        prev: '上一頁',
        next: '下一頁',
      },
    } satisfies DefaultTheme.Config)
  }

  const localeConfig: LocaleConfig<DefaultTheme.Config>[string] = {
    label: t('English'),
    lang: t('en'),
    title,
    titleTemplate,
    description,
    head,
    themeConfig,
  }

  return localeConfig
}
