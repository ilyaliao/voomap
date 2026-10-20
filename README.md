<br>
<p align="center">
<a href="https://voomap.ilyal.me/" target="_blank">
<img src="https://voomap.ilyal.me/voomap.svg" alt="Voomap" height="250" width="250"/>
</a>
</p>

<p align="center">
<b>Vue 3 Google Maps Components</b> with <b>Composition API</b>

</p>

> Voomap is built using Composition API and TypeScript, providing both **component** and **composable** approaches.

## 📦 Install

**Component Approach** (Recommended for quick setup):
```bash
npm i @voomap/map
```

**Composable Approach** (Maximum control):
```bash
npm i @voomap/core
```

**TypeScript Support**:
```bash
npm i -D @types/google.maps
```

## 🦄 Usage

### Component Approach

Before using `voomap`, the only thing you need to do is to [apply for a Google Maps API](https://developers.google.com/maps/documentation/javascript/get-api-key).

```html
<script setup lang="ts">
  import { GoogleMap, Marker } from '@voomap/map'
  import { reactive } from 'vue'

  const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env

  const center = reactive<google.maps.LatLngLiteral>({
    lat: 25.0855388,
    lng: 121.4791004,
  })
</script>

<template>
  <GoogleMap
    :api-key="VITE_GOOGLE_MAP_API_KEY"
    :center="center"
    :zoom="11"
  >
    <Marker :position="center" />
  </GoogleMap>
</template>
```

### Composable Approach

For maximum flexibility and programmatic control:

```html
<script setup lang="ts">
  import { useGoogleMap, useMarker } from '@voomap/core'
  import { reactive, useTemplateRef } from 'vue'

  const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env

  const el = useTemplateRef('mapContainer')
  const options = reactive({
    zoom: 11,
    center: { lat: 25.0855388, lng: 121.4791004 },
  })

  const { maps, map } = useGoogleMap(VITE_GOOGLE_MAP_API_KEY, el, options)
  const { marker } = useMarker(maps, map, { position: options.center })
</script>

<template>
  <div ref="mapContainer" style="width: 100vw; height: 100dvh" />
</template>
```

Refer to [documentations](https://voomap.ilyal.me/) for more details.

## 📃 Code Style

[![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config)

## 👨‍🚀 Contributors

This project is not yet complete, and I warmly welcome feature requests and improvement suggestions. You can create an issue to initiate a discussion with me!

## 🌸 Thanks

This project is heavily inspired by the following awesome projects.

- [vueuse](https://github.com/vueuse/vueuse)
- [inocan-group/vue3-google-map](https://github.com/inocan-group/vue3-google-map)
- [unovue/reka-ui](https://github.com/unovue/reka-ui)

## 📄 License

[MIT](./LICENSE) License © 2025-PRESENT [IlyaL](https://github.com/ilyaliao)
