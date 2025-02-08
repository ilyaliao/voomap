import type { ShallowRef } from 'vue'
import { markRaw, shallowRef, watchEffect } from 'vue'

export interface UseMarkerReturn {
  marker: ShallowRef<google.maps.Marker | undefined>
}

export function useMarker(
  maps: ShallowRef<typeof globalThis.google.maps | undefined>,
  map: ShallowRef<google.maps.Map | undefined>,
  options: google.maps.marker.AdvancedMarkerElementOptions = {},
) {
  const marker = shallowRef<google.maps.Marker | undefined>()

  watchEffect(() => {
    if (!maps.value || !map.value)
      return

    marker.value = markRaw(new maps.value.Marker({
      ...options,
      map: map.value,
    }))
  })

  return { marker }
}
