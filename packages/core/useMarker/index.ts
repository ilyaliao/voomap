import type { MaybeRefOrGetter, ShallowRef } from 'vue'
import { createMarker } from '@voomap/shared'
import { tryOnScopeDispose, watchDeep } from '@vueuse/shared'
import { markRaw, shallowRef, toValue, watch } from 'vue'

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

  watch(
    [maps, map],
    ([newMaps, newMap]) => {
      if (!newMaps || !newMap)
        return

      marker.value = markRaw(createMarker(newMaps, newMap, toValue(options)))
    },
  )

  watchDeep(
    () => toValue(options),
    (newOptions) => {
      if (!marker.value)
        return

      marker.value.setOptions(newOptions)
    },
  )

  tryOnScopeDispose(() => {
    if (!marker.value)
      return

    const _marker = toValue(marker.value)
    _marker.setMap(null)
  })

  return { marker }
}
