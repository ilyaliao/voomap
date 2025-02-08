import type { MaybeRefOrGetter, ShallowRef } from 'vue'
import { markRaw, shallowRef, toValue, watchEffect } from 'vue'
import { tryOnBeforeUnmount } from '../shared'

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

    marker.value = markRaw(new maps.value.Marker({
      ...toValue(options),
      map: map.value,
    }))
  })

  tryOnBeforeUnmount(() => {
    if (!marker.value)
      return

    const _marker = toValue(marker.value)
    _marker.setMap(null)
  })

  return { marker }
}
