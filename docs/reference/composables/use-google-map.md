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

- **`apiKey`**: Your Google Maps API key
- **`target`**: HTML element where the map will be rendered
- **`defaultOptions`**: Map configuration options. Supports all [Google Maps MapOptions](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions) plus `language`
- **`emit`**: Vue component emit function for event handling (optional)

## Return Values

- **`google`**: Reference to the global Google namespace
- **`maps`**: Reference to the Google Maps API namespace
- **`map`**: The Google Maps instance
