import type { MaybeRefOrGetter, ShallowRef } from 'vue'
import { createMarker, tryOnBeforeUnmount } from '@voomap/shared'
import { markRaw, shallowRef, toValue, watchEffect } from 'vue'

export interface UseMarkerReturn {
  /**
   * The marker instance
   */
  marker: ShallowRef<google.maps.Marker | undefined>
}

export function useMarker(
  maps: ShallowRef<typeof globalThis.google.maps | undefined>,
  map: ShallowRef<google.maps.Map | undefined>,
  options: MaybeRefOrGetter<google.maps.marker.AdvancedMarkerElementOptions>,
): UseMarkerReturn {
  const marker = shallowRef<google.maps.Marker | undefined>()

  watchEffect(() => {
    if (!maps.value || !map.value)
      return

    marker.value = markRaw(createMarker(maps.value, map.value, toValue(options)))
  })

  tryOnBeforeUnmount(() => {
    if (!marker.value)
      return

    const _marker = toValue(marker.value)
    _marker.setMap(null)
  })

  return { marker }
}
