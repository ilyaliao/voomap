# useMarker

The `useMarker` composable provides programmatic access to create and manage Google Maps markers.

## Basic Usage

```typescript
import { useGoogleMap, useMarker } from '@voomap/core'
import { ref } from 'vue'

const mapElement = ref<HTMLElement>()
const { maps, map } = useGoogleMap('YOUR_API_KEY', mapElement)

// Create a marker
const { marker } = useMarker(maps, map, {
  position: { lat: 25.0855388, lng: 121.4791004 },
  title: 'My Marker',
  draggable: true
})

// The marker is now displayed on the map
```

## Type Definition

```typescript
function useMarker(
  maps: ShallowRef<typeof globalThis.google.maps | undefined>,
  map: ShallowRef<google.maps.Map | undefined>,
  options: MaybeRefOrGetter<google.maps.MarkerOptions>,
  emit?: ComponentInternalInstance['emit']
): UseMarkerReturn

interface UseMarkerReturn {
  marker: ShallowRef<google.maps.Marker | undefined>
}
```

## Parameters

### `maps`

- **Type:** `ShallowRef<typeof google.maps | undefined>`
- **Required:** `true`

Reference to the Google Maps API namespace.

### `map`

- **Type:** `ShallowRef<google.maps.Map | undefined>`
- **Required:** `true`

Reference to the Google Maps instance where the marker will be placed.

### `options`

- **Type:** `MaybeRefOrGetter<google.maps.MarkerOptions>`
- **Required:** `true`

Marker configuration options. All standard Google Maps marker options are supported.

### `emit`

- **Type:** `ComponentInternalInstance['emit']`
- **Default:** `getCurrentInstance()?.emit`

Vue component emit function for event handling.

## Return Values

### `marker`

- **Type:** `ShallowRef<google.maps.Marker | undefined>`

The Google Maps Marker instance. Will be `undefined` until the marker is created.

## Features

### Reactive Options

The composable watches for changes in the options and automatically updates the marker:

```typescript
const position = ref({ lat: 25.0855388, lng: 121.4791004 })
const draggable = ref(false)

const { marker } = useMarker(maps, map, {
  position: position.value,
  draggable: draggable.value
})

// Marker will automatically update when these change
position.value = { lat: 25.033, lng: 121.565 }
draggable.value = true
```

### Event Handling

The composable automatically binds Google Maps marker events to Vue events when used with emit:

```typescript
// In your component
const emit = defineEmits<{
  'click': [event: google.maps.MapMouseEvent]
  'dragend': [event: google.maps.MapMouseEvent]
  'position-changed': []
  // ... all other Google Maps marker events
}>()

const { marker } = useMarker(maps, map, options, emit)
```

### Cleanup

The composable automatically removes the marker from the map and cleans up when the component is unmounted.

## Example: Dynamic Marker Management

```vue
<script setup lang="ts">
import { useGoogleMap, useMarker } from '@voomap/core'
import { computed, reactive, ref } from 'vue'

const mapElement = ref<HTMLElement>()
const { maps, map } = useGoogleMap('YOUR_API_KEY', mapElement)

const markers = reactive([
  { id: 1, lat: 25.0855388, lng: 121.4791004, title: 'Taipei 101' },
  { id: 2, lat: 25.0375167, lng: 121.5637, title: 'Palace Museum' }
])

const markerInstances = computed(() =>
  markers.map((markerData) => {
    const { marker } = useMarker(maps, map, {
      position: { lat: markerData.lat, lng: markerData.lng },
      title: markerData.title,
      draggable: true
    })
    return { ...markerData, marker }
  })
)

function addMarker(lat: number, lng: number, title: string) {
  const id = Math.max(...markers.map(m => m.id)) + 1
  markers.push({ id, lat, lng, title })
}

function removeMarker(id: number) {
  const index = markers.findIndex(m => m.id === id)
  if (index > -1) {
    markers.splice(index, 1)
  }
}
</script>

<template>
  <div>
    <div ref="mapElement" style="height: 400px;" />
    <button @click="addMarker(25.047, 121.517, 'New Marker')">
      Add Marker
    </button>
  </div>
</template>
```
