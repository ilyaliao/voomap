import type { ComponentInternalInstance, MaybeRefOrGetter, ShallowRef } from 'vue'
import type { UseMarkerReturn } from './types'
import { camelizeUnderscore, createMarker } from '@voomap/shared'
import { tryOnScopeDispose, watchDeep } from '@vueuse/shared'
import { getCurrentInstance, shallowRef, toValue, watch } from 'vue'
import { markerEmits } from './types'

export function useMarker(
  maps: ShallowRef<typeof globalThis.google.maps | undefined>,
  map: ShallowRef<google.maps.Map | undefined>,
  /**
   * Marker Options
   *
   * @see https://developers.google.com/maps/documentation/javascript/reference/marker?hl=zh-tw#MarkerOptions-Properties
   */
  options: MaybeRefOrGetter<google.maps.MarkerOptions>,
  emit: ComponentInternalInstance['emit'] | undefined = getCurrentInstance()?.emit,
): UseMarkerReturn {
  const marker = shallowRef<google.maps.Marker | undefined>()

  function bindEvents() {
    if (!emit)
      return

    for (const event of markerEmits) {
      const kebabEvent = camelizeUnderscore(event)

      marker.value?.addListener(event, () => {
        emit(kebabEvent, event)
      })
    }
  }

  watch(
    [maps, map],
    ([newMaps, newMap]) => {
      if (!newMaps || !newMap)
        return

      marker.value = createMarker(newMaps, newMap, toValue(options))
      bindEvents()
    },
  )

  watchDeep(
    () => toValue(options),
    (newOptions) => {
      if (!marker.value || !map.value)
        return

      marker.value.setOptions({
        ...newOptions,
        map: map.value,
      })
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

export * from './types'
