# useInfoWindow

The `useInfoWindow` composable provides programmatic access to Google Maps InfoWindow instances for displaying content in a popup window.

## Basic Usage

```typescript
import { useGoogleMap, useMarker, useInfoWindow } from '@voomap/core'
import { ref } from 'vue'

const mapElement = ref<HTMLElement>()
const { maps, map } = useGoogleMap('YOUR_API_KEY', mapElement)

// Create a marker
const { marker } = useMarker(maps, map, {
  position: { lat: 25.0855388, lng: 121.4791004 },
  title: 'My Marker'
})

// Create an InfoWindow attached to the marker
const { infoWindow, open, close } = useInfoWindow(
  maps,
  map,
  {
    content: '<div><h3>Hello World!</h3><p>This is an info window.</p></div>',
    position: { lat: 25.0855388, lng: 121.4791004 }
  },
  marker // InfoWindow will open when marker is clicked
)
```

## Type Definition

```typescript
function useInfoWindow(
  maps: ShallowRef<typeof globalThis.google.maps | undefined>,
  map: ShallowRef<google.maps.Map | undefined>,
  options: MaybeRefOrGetter<google.maps.InfoWindowOptions>,
  marker?: MaybeRefOrGetter<google.maps.Marker | undefined>,
  emit?: ComponentInternalInstance['emit']
): UseInfoWindowReturn

interface UseInfoWindowReturn {
  infoWindow: ShallowRef<google.maps.InfoWindow | undefined>
  open: (
    options?: google.maps.InfoWindowOpenOptions | null | google.maps.Map | google.maps.StreetViewPanorama,
    anchor?: google.maps.MVCObject | null | google.maps.marker.AdvancedMarkerElement
  ) => void
  close: () => void
}
```

## Parameters

### `maps`

- **Type:** `ShallowRef<typeof globalThis.google.maps | undefined>`
- **Required:** `true`

Reference to the Google Maps API namespace, typically returned from `useGoogleMap`.

### `map`

- **Type:** `ShallowRef<google.maps.Map | undefined>`
- **Required:** `true`

Reference to the Google Maps instance, typically returned from `useGoogleMap`.

### `options`

- **Type:** `MaybeRefOrGetter<google.maps.InfoWindowOptions>`
- **Required:** `true`

InfoWindow configuration options. Supports all standard Google Maps InfoWindow options.

### `marker`

- **Type:** `MaybeRefOrGetter<google.maps.Marker | undefined>`
- **Default:** `undefined`

Optional marker to associate with the InfoWindow. When provided, the InfoWindow will automatically open when the marker is clicked.

### `emit`

- **Type:** `ComponentInternalInstance['emit']`
- **Default:** `getCurrentInstance()?.emit`

Vue component emit function for event handling.

## Return Values

### `infoWindow`

- **Type:** `ShallowRef<google.maps.InfoWindow | undefined>`

The InfoWindow instance. Will be `undefined` until the InfoWindow is created.

### `open`

- **Type:** `(
  options?: google.maps.InfoWindowOpenOptions | null | google.maps.Map | google.maps.StreetViewPanorama,
  anchor?: google.maps.MVCObject | null | google.maps.marker.AdvancedMarkerElement
) => void`

Function to open the InfoWindow.

### `close`

- **Type:** `() => void`

Function to close the InfoWindow.

## Features

### Automatic Marker Integration

When a marker is provided, the InfoWindow automatically:
- Opens when the marker is clicked
- Updates content when the marker title changes
- Positions itself relative to the marker

### Event Handling

The composable automatically binds InfoWindow events to Vue events:

```typescript
// In your component
const emit = defineEmits<{
  'close': []
  'closeclick': []
  'content-changed': []
  'domready': []
  'position-changed': []
  // ... all other InfoWindow events
}>()
```

### Content Management

The InfoWindow content can be dynamic and reactive:

```typescript
const content = ref('<h3>Initial Content</h3>')

const { infoWindow } = useInfoWindow(maps, map, {
  content: content.value
})

// Update content dynamically
content.value = '<h3>Updated Content</h3>'
```

## Example: Basic InfoWindow

```vue
<script setup lang="ts">
import { useGoogleMap, useInfoWindow } from '@voomap/core'
import { ref } from 'vue'

const mapElement = ref<HTMLElement>()
const { maps, map } = useGoogleMap('YOUR_API_KEY', mapElement)

const { infoWindow, open, close } = useInfoWindow(maps, map, {
  content: `
    <div style="padding: 10px;">
      <h3>Welcome to Taipei!</h3>
      <p>This is the capital city of Taiwan.</p>
    </div>
  `,
  position: { lat: 25.0855388, lng: 121.4791004 }
})

// Open the InfoWindow after 2 seconds
setTimeout(() => {
  open()
}, 2000)
</script>

<template>
  <div>
    <button @click="open">Open InfoWindow</button>
    <button @click="close">Close InfoWindow</button>
    <div ref="mapElement" style="height: 400px;" />
  </div>
</template>
```

## Example: InfoWindow with Marker

```vue
<script setup lang="ts">
import { useGoogleMap, useMarker, useInfoWindow } from '@voomap/core'
import { ref, watchOnce } from 'vue'

const mapElement = ref<HTMLElement>()
const { maps, map } = useGoogleMap('YOUR_API_KEY', mapElement)

const currentMarker = ref<google.maps.Marker>()

const { marker } = useMarker(maps, map, {
  position: { lat: 25.0855388, lng: 121.4791004 },
  title: 'Click me!'
})

watchOnce(marker, () => {
  currentMarker.value = marker.value
})

const { infoWindow } = useInfoWindow(
  maps,
  map,
  {
    content: `
      <div style="padding: 15px; max-width: 300px;">
        <h3>Marker Information</h3>
        <p>This InfoWindow opens when you click the marker.</p>
        <button onclick="alert('Hello from InfoWindow!')">Click me</button>
      </div>
    `
  },
  currentMarker
)
</script>

<template>
  <div ref="mapElement" style="height: 400px;" />
</template>
```

## Example: Dynamic Content

```vue
<script setup lang="ts">
import { useGoogleMap, useMarker, useInfoWindow } from '@voomap/core'
import { ref, computed, watchOnce } from 'vue'

const mapElement = ref<HTMLElement>()
const { maps, map } = useGoogleMap('YOUR_API_KEY', mapElement)

const markerTitle = ref('Dynamic Marker')
const timestamp = ref(new Date().toLocaleTimeString())

const { marker } = useMarker(maps, map, {
  position: { lat: 25.0855388, lng: 121.4791004 },
  title: markerTitle.value
})

const currentMarker = ref<google.maps.Marker>()
watchOnce(marker, () => {
  currentMarker.value = marker.value
})

const content = computed(() => `
  <div style="padding: 15px;">
    <h3>${markerTitle.value}</h3>
    <p>Last updated: ${timestamp.value}</p>
  </div>
`)

const { infoWindow } = useInfoWindow(
  maps,
  map,
  { content: content.value },
  currentMarker
)

function updateContent() {
  timestamp.value = new Date().toLocaleTimeString()
  markerTitle.value = `Updated at ${timestamp.value}`
}
</script>

<template>
  <div>
    <button @click="updateContent">Update Content</button>
    <div ref="mapElement" style="height: 400px;" />
  </div>
</template>
``` 
