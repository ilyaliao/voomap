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

- **`maps`**: Reference to the Google Maps API namespace
- **`map`**: Reference to the Google Maps instance
- **`options`**: Marker configuration. Supports all [Google Maps MarkerOptions](https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions)
- **`emit`**: Vue component emit function for event handling (optional)

## Return Values

- **`marker`**: The Google Maps Marker instance
