<br>
<p align="center">
<a href="https://voomap.vercel.app/" target="_blank">
<img src="https://voomap.vercel.app/voomap.svg" alt="Voomap" height="250" width="250"/>
</a>
</p>

<p align="center">
Easy use of <b>Google Maps</b> with <b>Composition API</b>

</p>

> Voomap is built using Composition API and TypeScript.

## 📦 Install

```bash
npm i @voomap/map
```

## 🦄 Usage

### Map

Before using `voomap`, the only thing you need to do is to [apply for a Google Maps API](https://developers.google.com/maps/documentation/javascript/get-api-key).

```html
<script setup lang="ts">
  import { GoogleMap } from "@voomap/map";
  import { reactive } from "vue";

  const center = reactive<google.maps.LatLngLiteral>({
    lat: 25.0855388,
    lng: 121.4791004,
  });
</script>

<template>
  <GoogleMap :api-key="YOUR_GOOGLE_MAPS_API_KEY" :center="center" :zoom="11" />
</template>
```

Refer to [documentations](https://voomap.vercel.app/) for more details.

### Marker

To make it easy for you to use **Google Map**, you can simply add the components you need as child components, just as easily as with `element-ui`!

```html
<script setup lang="ts">
  import { GoogleMap, Marker } from "@voomap/map";
  import { reactive } from "vue";

  const center = reactive<google.maps.LatLngLiteral>({
    lat: 25.0855388,
    lng: 121.4791004,
  });
</script>

<template>
  <GoogleMap :api-key="VITE_GOOGLE_MAP_API_KEY" :center="center" :zoom="11">
    <Marker :position="center" />
  </GoogleMap>
</template>
```

## 📃 Code Style

[![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config)

## 👨‍🚀 Contributors

This project is not yet complete, and I warmly welcome feature requests and improvement suggestions. You can create an issue to initiate a discussion with me!

## 📄 License

[MIT](./LICENSE) License © 2024-PRESENT [Ilya Liao](https://github.com/ilyaliao)
