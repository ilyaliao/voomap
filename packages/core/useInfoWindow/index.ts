import type { MaybeRefOrGetter, ShallowRef } from 'vue'
import type { UseInfoWindowReturn } from './types'
import { tryOnScopeDispose } from '@vueuse/shared'
import { shallowRef, toValue, watch } from 'vue'

export function useInfoWindow(
  maps: ShallowRef<typeof globalThis.google.maps | undefined>,
  map: ShallowRef<google.maps.Map | undefined>,
  options: MaybeRefOrGetter<google.maps.InfoWindowOptions>,
  marker: MaybeRefOrGetter<google.maps.Marker | undefined>,
): UseInfoWindowReturn {
  const infoWindow = shallowRef<google.maps.InfoWindow | undefined>()

  function getContent() {
    const _options = toValue(options)
    return _options?.content ?? toValue(marker)?.getTitle() ?? ''
  }

  watch(
    [maps, map],
    ([newMaps, newMap]) => {
      if (!newMaps || !newMap)
        return

      infoWindow.value = new newMaps.InfoWindow({
        ...toValue(options),
        content: getContent(),
      })
    },
  )

  function open(
    _options:
      | google.maps.InfoWindowOpenOptions
      | null
      | google.maps.Map
      | google.maps.StreetViewPanorama = null,
    _anchor:
      | google.maps.MVCObject
      | null
      | google.maps.marker.AdvancedMarkerElement = null,
  ) {
    if (!infoWindow.value)
      return

    infoWindow.value.open(
      _options,
      _anchor ?? toValue(marker),
    )
  }

  function close() {
    if (!infoWindow.value)
      return

    infoWindow.value.close()
  }

  function changeInfoWindowContent() {
    if (!infoWindow.value)
      return

    infoWindow.value.setContent(getContent())
  }

  watch(() => toValue(marker), (markerInstance) => {
    if (!markerInstance)
      return

    markerInstance.addListener('click', open)
    markerInstance.addListener('title_changed', changeInfoWindowContent)
  })

  tryOnScopeDispose(() => {
    if (!infoWindow.value)
      return

    const _infoWindow = toValue(infoWindow.value)
    _infoWindow.close()
  })

  return {
    infoWindow,
    open,
    close,
  }
}
