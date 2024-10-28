import { defineConfig } from 'vitepress';

const guide = [
  {
    text: 'Get Started',
    link: '/guide/',
  },
];

const core = [
  {
    text: 'useSearch',
    link: '/core/useSearch',
  },
];

const map = [
  {
    text: 'Map',
    link: '/api/map',
  },
  {
    text: 'Marker',
    link: '/api/marker',
  },
  {
    text: 'InfoWindow',
    link: '/api/info-window',
  },
  {
    text: 'MarkerClusterer',
    link: '/api/marker-clusterer',
  },
  {
    text: 'Embed',
    link: '/api/embed',
  },
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Voomap',
  titleTemplate: 'Easy use of Google Maps with Composition API',
  description: 'Easy use of Google Maps with Composition API',

  head: [
    ['link', { rel: 'icon', href: '/voomap.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'author', content: 'ilyaliao' }],
    ['meta', { property: 'og:title', content: 'Voomap' }],
    ['meta', { property: 'og:description', content: 'Easy use of Google Maps with Composition API' }],
  ],

  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    config(md) {
      // https://github.com/markdown-it/markdown-it/issues/878
      md.linkify.set({
        fuzzyLink: false,
      });
    },
  },

  themeConfig: {
    logo: '/voomap.svg',

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Get Started', link: '/guide/', activeMatch: '/guide/' },
      { text: 'API', link: '/api/map', activeMatch: '/api/' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: guide,
      },
      {
        text: 'Core',
        items: core,
      },
      {
        text: 'Google Maps',
        items: map,
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ilyaliao/voomap' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 ilyaliao',
    },
  },
});
