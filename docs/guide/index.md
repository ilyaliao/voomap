# Get Started

Voomap is entirely written in [TypeScript with Composition API](https://vuejs.org/guide/typescript/composition-api.html). Not only is it strongly typed, but it is also easy to pick up.

## Installation

```bash
npm install --save @voomap/map
```

> Voomap requires vue >= v3.3

## Apply for a Google Maps API

Please remember to definitely apply for an `API`, this is the most crucial step.

> [apply for a Google Maps API](https://developers.google.com/maps/documentation/javascript/get-api-key)

## Usage Example

```vue
<script setup lang="ts">
import { GoogleMap } from '@voomap/map'
import { reactive } from 'vue'

const center = reactive<google.maps.LatLngLiteral>({
  lat: 25.0855388,
  lng: 121.4791004
})
</script>

<template>
  <GoogleMap
    :api-key="YOUR_GOOGLE_MAPS_API_KEY"
    :center="center"
    :zoom="11"
  />
</template>
```

## Usage Types

Voomap supports native Google Maps types. If you need to use them, please install [@types/google.maps](https://www.npmjs.com/package/@types/google.maps).

```bash
npm install --save-dev @types/google.maps
```
