# MarkerClusterer

Using the `MarkerClusterer` allows you to display a large number of markers on the map.

> The `MarkerClusterer` is implemented through `@googlemaps/js-markerclusterer` You can refer to their [documentation](https://googlemaps.github.io/js-markerclusterer/#md:description) for instructions on how to use it.

## Usage

The following code excerpt demonstrates a basic usage example:

```vue
<script setup lang="ts">
import { GoogleMap, Marker, MarkerClusterer } from '@voomap/map'
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
  >
    <MarkerClusterer>
      <Marker
        v-for="marker in 500"
        :key="marker"
        :position="center"
      />
    </MarkerClusterer>
  </GoogleMap>
</template>
```

## Params

### MarkerClustererOptions

import options from `@googlemaps/js-markerclusterer`.

- Type `MarkerClustererOptions`

```ts
import type { MarkerClustererOptions } from '@googlemaps/markerclusterer'
```

- Example

```vue
<script setup lang="ts">
import { GridAlgorithm } from '@googlemaps/markerclusterer'
import { GoogleMap, Marker, MarkerClusterer } from '@voomap/map'
import { reactive } from 'vue'

const center = reactive<google.maps.LatLngLiteral>({
  lat: 25.0855388,
  lng: 121.4791004
})

const algorithm = new GridAlgorithm({
  gridSize: 60
})

function createRandomCoordinate() {
  const randomLat = 22 + Math.random() * 3
  const randomLng = 120.5 + Math.random()

  const lat = Number.parseFloat(randomLat.toFixed(6))
  const lng = Number.parseFloat(randomLng.toFixed(6))

  return { lat, lng }
}
</script>

<template>
  <GoogleMap
    :api-key="YOUR_GOOGLE_MAPS_API_KEY"
    :center="center"
    :zoom="11"
  >
    <MarkerClusterer :algorithm="algorithm">
      <Marker
        v-for="marker in 100"
        :key="marker"
        :position="createRandomCoordinate()"
      />
    </MarkerClusterer>
  </GoogleMap>
</template>
```

## Events

import events from `@googlemaps/js-markerclusterer`.

- Example

```vue
<script setup lang="ts">
import { GoogleMap, Marker, MarkerClusterer } from '@voomap/map'
import { reactive } from 'vue'

const center = reactive<google.maps.LatLngLiteral>({
  lat: 25.0855388,
  lng: 121.4791004
})

function handleClick() {
  console.log('click')
}
</script>

<template>
  <GoogleMap
    :api-key="YOUR_GOOGLE_MAPS_API_KEY"
    :center="center"
    :zoom="11"
  >
    <MarkerClusterer @click="handleClick">
      <Marker
        v-for="marker in 500"
        :key="marker"
        :position="center"
      />
    </MarkerClusterer>
  </GoogleMap>
</template>
```

## Expose

If you want to further manipulate the map, you can use the public instance of the component.

### markerClusterer

- Type `MarkerClusterer`

```ts
import { MarkerClusterer } from '@googlemaps/markerclusterer'
```

## Automatic updates

When **dynamically passing parameters**, the `markerClusterer` will automatically determine whether an instance already exists to decide whether to **update** or **create** a new one.
