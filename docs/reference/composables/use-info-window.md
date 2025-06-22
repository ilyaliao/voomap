# useInfoWindow

The `useInfoWindow` composable provides programmatic access to Google Maps InfoWindow instances for displaying content in a popup window.

## Basic Usage

```typescript
import { useGoogleMap, useInfoWindow, useMarker } from '@voomap/core'
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

- **`maps`**: Reference to the Google Maps API namespace
- **`map`**: Reference to the Google Maps instance
- **`options`**: InfoWindow configuration. Supports all [Google Maps InfoWindowOptions](https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindowOptions)
- **`marker`**: Optional marker to associate with the InfoWindow (optional)
- **`emit`**: Vue component emit function for event handling (optional)

## Return Values

- **`infoWindow`**: The InfoWindow instance
- **`open`**: Function to open the InfoWindow
- **`close`**: Function to close the InfoWindow
