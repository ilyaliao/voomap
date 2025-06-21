# useGoogleMap

The `useGoogleMap` composable provides programmatic access to Google Maps instances and APIs.

## Basic Usage

```typescript
import { useGoogleMap } from '@voomap/core'
import { ref } from 'vue'

const mapElement = ref<HTMLElement>()
const { google, maps, map } = useGoogleMap(
  'YOUR_API_KEY',
  mapElement,
  {
    center: { lat: 25.0855388, lng: 121.4791004 },
    zoom: 11
  }
)
```

## Type Definition

```typescript
function useGoogleMap(
  apiKey: string,
  target: MaybeComputedElementRef,
  defaultOptions?: MaybeRefOrGetter<MapOptions>,
  emit?: ComponentInternalInstance['emit']
): UseGoogleMapReturn

interface UseGoogleMapReturn {
  google: ShallowRef<typeof globalThis.google | undefined>
  maps: ShallowRef<typeof globalThis.google.maps | undefined>
  map: ShallowRef<google.maps.Map | undefined>
}

interface MapOptions extends google.maps.MapOptions {
  language?: string
}
```

## Parameters

### `apiKey`

- **Type:** `string`
- **Required:** `true`

Your Google Maps API key.

### `target`

- **Type:** `MaybeComputedElementRef`
- **Required:** `true`

The HTML element where the map will be rendered. Can be a ref, computed, or getter function.

### `defaultOptions`

- **Type:** `MaybeRefOrGetter<MapOptions>`
- **Default:** `{}`

Map configuration options. All standard Google Maps options are supported, plus a `language` option.

### `emit`

- **Type:** `ComponentInternalInstance['emit']`
- **Default:** `getCurrentInstance()?.emit`

Vue component emit function for event handling. Automatically uses the current component's emit if not provided.

## Return Values

### `google`

- **Type:** `ShallowRef<typeof globalThis.google | undefined>`

Reference to the global Google namespace. Will be `undefined` until the Google Maps API is loaded.

### `maps`

- **Type:** `ShallowRef<typeof globalThis.google.maps | undefined>`

Reference to the Google Maps API namespace.

### `map`

- **Type:** `ShallowRef<google.maps.Map | undefined>`

The Google Maps instance. Will be `undefined` until the map is initialized.

## Features

### Reactive Options

The composable watches for changes in the options and automatically updates the map:

```typescript
const zoom = ref(11)
const center = ref({ lat: 25.0855388, lng: 121.4791004 })

const { map } = useGoogleMap(apiKey, mapElement, {
  zoom: zoom.value,
  center: center.value
})

// Map will automatically update when these change
zoom.value = 15
center.value = { lat: 25.033, lng: 121.565 }
```

### Event Handling

The composable automatically binds Google Maps events to Vue events:

```typescript
// In your component
const emit = defineEmits<{
  'bounds-changed': []
  'center-changed': [lat: number, lng: number]
  'click': [event: google.maps.MapMouseEvent]
  'zoom-changed': [zoom: number]
  // ... all other Google Maps events
}>()

const { map } = useGoogleMap(apiKey, mapElement, options, emit)
```

### Cleanup

The composable automatically cleans up event listeners when the component is unmounted.

## Example: Custom Map Control

```vue
<script setup lang="ts">
import { useGoogleMap } from '@voomap/core'
import { onMounted, ref } from 'vue'

const mapElement = ref<HTMLElement>()
const apiKey = 'YOUR_API_KEY'

const { google, maps, map } = useGoogleMap(apiKey, mapElement, {
  center: { lat: 25.0855388, lng: 121.4791004 },
  zoom: 11,
  disableDefaultUI: true
})

onMounted(() => {
  // Wait for map to be ready
  watchEffect(() => {
    if (!map.value || !maps.value)
      return

    // Add custom control
    const controlDiv = document.createElement('div')
    const control = new CustomControl(controlDiv, map.value)

    controlDiv.index = 1
    map.value.controls[maps.value.ControlPosition.TOP_RIGHT].push(controlDiv)
  })
})

function CustomControl(controlDiv: HTMLElement, map: google.maps.Map) {
  const controlUI = document.createElement('div')
  controlUI.style.backgroundColor = '#fff'
  controlUI.style.cursor = 'pointer'
  controlUI.style.padding = '10px'
  controlUI.textContent = 'Center Map'
  controlDiv.appendChild(controlUI)

  controlUI.addEventListener('click', () => {
    map.setCenter({ lat: 25.0855388, lng: 121.4791004 })
  })
}
</script>

<template>
  <div ref="mapElement" style="height: 400px;" />
</template>
```

## Example: Drawing on Map

```vue
<script setup lang="ts">
import { useGoogleMap } from '@voomap/core'
import { ref, watchEffect } from 'vue'

const mapElement = ref<HTMLElement>()
const { maps, map } = useGoogleMap('YOUR_API_KEY', mapElement)

const drawingManager = ref<google.maps.drawing.DrawingManager>()

watchEffect(() => {
  if (!maps.value || !map.value)
    return

  drawingManager.value = new maps.value.drawing.DrawingManager({
    drawingMode: maps.value.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: maps.value.ControlPosition.TOP_CENTER,
      drawingModes: [
        maps.value.drawing.OverlayType.MARKER,
        maps.value.drawing.OverlayType.CIRCLE,
        maps.value.drawing.OverlayType.POLYGON,
        maps.value.drawing.OverlayType.POLYLINE,
        maps.value.drawing.OverlayType.RECTANGLE
      ]
    }
  })

  drawingManager.value.setMap(map.value)
})
</script>

<template>
  <div ref="mapElement" style="height: 400px;" />
</template>
```
