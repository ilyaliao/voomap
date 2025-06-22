# Marker

The `Marker` component displays a marker on the Google Map.

## Basic Usage

```vue
<script setup lang="ts">
import { GoogleMap, Marker } from '@voomap/map'

const apiKey = 'YOUR_API_KEY'
const position = { lat: 25.0855388, lng: 121.4791004 }
</script>

<template>
  <GoogleMap :api-key="apiKey">
    <Marker :position="position" title="My Location" />
  </GoogleMap>
</template>
```

## Props

All standard [Google Maps MarkerOptions](https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions) are supported as props. The marker's content can be set via the default slot or the `title` prop.

## Events

The component emits all standard [Google Maps Marker events](https://developers.google.com/maps/documentation/javascript/reference/marker#Marker-Events). Simply add event listeners to the component for the events you need.

## Slots

The default slot can be used to set the marker title using text content. This provides a more Vue-like way to set the title instead of using the `title` prop.

```vue
<Marker :position="position">
  Hello I'm Marker
</Marker>
```

::: tip NOTE
If both the default slot and the `title` prop are provided, the default slot takes precedence.
:::

## Full Example

```vue
<script setup lang="ts">
import { GoogleMap, Marker } from '@voomap/map'
import { reactive } from 'vue'

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env

const markers = reactive([
  {
    id: 1,
    position: { lat: 25.0855388, lng: 121.4791004 },
    title: 'Taipei 101',
  },
  {
    id: 2,
    position: { lat: 25.0375167, lng: 121.5637 },
    title: 'National Palace Museum',
  },
])

function handleMarkerClick(event: google.maps.MapMouseEvent) {
  console.log('Clicked marker:', event.latLng?.toJSON())
}

function handleDragEnd(event: google.maps.MapMouseEvent) {
  console.log('New position:', event.latLng?.toJSON())
}
</script>

<template>
  <GoogleMap
    style="width: 100vw; height: 100dvh"
    :api-key="VITE_GOOGLE_MAP_API_KEY"
    :zoom="10"
    :center="{ lat: 25.0855388, lng: 121.4791004 }"
  >
    <Marker
      v-for="marker in markers"
      :key="marker.id"
      :position="marker.position"
      :title="marker.title"
      :draggable="true"
      @click="(e) => handleMarkerClick(e)"
      @dragend="(e) => handleDragEnd(e)"
    />
  </GoogleMap>
</template>
