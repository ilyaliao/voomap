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

All standard [Google Maps options](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions) are supported as props:

#### `center`

- **Type:** `google.maps.LatLngLiteral | google.maps.LatLng`
- **Default:** `{ lat: 25.0855388, lng: 121.4791004 }`

The initial center position of the map.

```vue
<GoogleMap :center="{ lat: 37.7749, lng: -122.4194 }" />
```

#### `zoom`

- **Type:** `number`
- **Default:** `11`

The initial zoom level of the map.

```vue
<GoogleMap :zoom="15" />
```

#### `map-type-id`

- **Type:** `string`
- **Default:** `'roadmap'`

The map type to display. Options: `'roadmap'`, `'satellite'`, `'hybrid'`, `'terrain'`.

```vue
<GoogleMap :map-type-id="'satellite'" />
```

#### `clickable-icons`

- **Type:** `boolean`
- **Default:** `true`

Whether map icons are clickable.

#### `disable-default-ui`

- **Type:** `boolean`
- **Default:** `false`

Disables all default UI buttons.

#### `disable-double-click-zoom`

- **Type:** `boolean`
- **Default:** `false`

Disables zooming on double click.

#### `draggable`

- **Type:** `boolean`
- **Default:** `true`

Whether the map is draggable.

#### `fullscreen-control`

- **Type:** `boolean`
- **Default:** `true`

Whether to show the fullscreen control button.

#### `gesture-handling`

- **Type:** `string`
- **Default:** `'auto'`

How the map handles gestures. Options: `'cooperative'`, `'greedy'`, `'none'`, `'auto'`.

#### `max-zoom`

- **Type:** `number`
- **Default:** `15`

The maximum zoom level of the map.

#### `min-zoom`

- **Type:** `number`
- **Default:** `8`

The minimum zoom level of the map.

#### `scale-control`

- **Type:** `boolean`
- **Default:** `true`

Whether to show the scale control.

#### `scrollwheel`

- **Type:** `boolean`
- **Default:** `true`

Whether to allow zooming with the mouse wheel.

#### `zoom-control`

- **Type:** `boolean`
- **Default:** `true`

Whether to show the zoom control buttons.

#### `language`

- **Type:** `string`
- **Default:** `'en'`

The language to use for the map. For example: `'zh-TW'`, `'ja'`, `'ko'`.

## Events

The component emits all standard [Google Maps events](https://developers.google.com/maps/documentation/javascript/reference/map#Map-Events):

### `@bounds-changed`

Fired when the viewport bounds have changed.

```vue
<GoogleMap @bounds-changed="handleBoundsChange" />
```

### `@center-changed`

Fired when the map center property changes.

- **Arguments:** `(lat: number, lng: number)`

```vue
<GoogleMap @center-changed="(lat, lng) => console.log(lat, lng)" />
```

### `@click`

Fired when the user clicks on the map.

- **Arguments:** `(event: google.maps.MapMouseEvent)`

```vue
<GoogleMap @click="handleMapClick" />
```

### `@dblclick`

Fired when the user double-clicks on the map.

- **Arguments:** `(event: google.maps.MapMouseEvent)`

### `@drag`

Fired repeatedly while the user drags the map.

### `@dragend`

Fired when the user stops dragging the map.

### `@dragstart`

Fired when the user starts dragging the map.

### `@idle`

Fired when the map becomes idle after panning or zooming.

### `@mousemove`

Fired when the user's mouse moves over the map.

- **Arguments:** `(event: google.maps.MapMouseEvent)`

### `@mouseout`

Fired when the user's mouse exits the map.

### `@mouseover`

Fired when the user's mouse enters the map.

### `@zoom-changed`

Fired when the map zoom property changes.

- **Arguments:** `(zoom: number)`

```vue
<GoogleMap @zoom-changed="(zoom) => console.log('New zoom:', zoom)" />
```

## Exposed Properties

The component exposes the following properties via template refs:

### `google`

- **Type:** `typeof google`

The global Google Maps namespace.

### `maps`

- **Type:** `typeof google.maps`

The Google Maps API namespace.

### `map`

- **Type:** `google.maps.Map`

The Google Maps instance.

```vue
<script setup>
import { onMounted, ref } from 'vue'

const mapRef = ref()

onMounted(() => {
  // Access the map instance
  const map = mapRef.value.map

  // Use any Google Maps API method
  map.panTo({ lat: 40.7128, lng: -74.0060 })
})
</script>

<template>
  <GoogleMap ref="mapRef" :api-key="API_KEY" />
</template>
```

## Slots

### Default Slot

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
