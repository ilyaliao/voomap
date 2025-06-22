# GoogleMap

The `GoogleMap` component is the main container for displaying Google Maps in your Vue application.

## Basic Usage

```vue
<script setup lang="ts">
import { GoogleMap } from '@voomap/map'

const apiKey = 'YOUR_API_KEY'
</script>

<template>
  <GoogleMap
    :api-key="apiKey"
    :center="{ lat: 25.0855388, lng: 121.4791004 }"
    :zoom="11"
    style="width: 100%; height: 400px;"
  />
</template>
```

## Props

### Required Props

#### `api-key`

- **Type:** `string`
- **Required:** `true`

Your Google Maps API key. This is required to load and display the map.

```vue
<GoogleMap :api-key="YOUR_GOOGLE_MAPS_API_KEY" />
```

### Map Options

All standard [Google Maps MapOptions](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions) are supported as props, plus an additional `language` option for API loading.

## Events

The component emits all standard [Google Maps events](https://developers.google.com/maps/documentation/javascript/reference/map#Map-Events). Simply add event listeners to the component for the events you need.

## Slots

The default slot is used to add child components like `Marker`, `InfoWindow`, etc.

```vue
<GoogleMap :api-key="API_KEY">
  <Marker :position="markerPosition" />
  <InfoWindow :position="infoPosition" />
</GoogleMap>
```

## Full Example

```vue
<script setup lang="ts">
import { GoogleMap, Marker } from '@voomap/map'
import { reactive, ref } from 'vue'

const center = reactive({
  lat: 25.0855388,
  lng: 121.4791004
})

const mapRef = ref()

function handleMapClick(event: google.maps.MapMouseEvent) {
  console.log('Clicked at:', event.latLng?.toJSON())
}

function handleZoomChange(zoom: number) {
  console.log('Zoom changed to:', zoom)
}
</script>

<template>
  <GoogleMap
    ref="mapRef"
    :api-key="YOUR_API_KEY"
    :center="center"
    :zoom="12"
    :max-zoom="18"
    :min-zoom="5"
    map-type-id="roadmap"
    :clickable-icons="false"
    :fullscreen-control="true"
    language="zh-TW"
    @click="handleMapClick"
    @zoom-changed="handleZoomChange"
  >
    <Marker
      :position="center"
      title="Taipei 101"
    />
  </GoogleMap>
</template>
```
