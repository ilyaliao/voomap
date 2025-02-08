import type { MaybeRefOrGetter, ShallowRef } from 'vue'
import { tryOnBeforeUnmount } from '@voomap/shared'
import { markRaw, shallowRef, toValue, watch, watchEffect } from 'vue'

export interface UseInfoWindowReturn {
  /**
   * The info window instance
   */
  infoWindow: ShallowRef<google.maps.InfoWindow | undefined>
  /**
   * Open the info window
   */
  open: () => void
  /**
   * Close the info window
   */
  close: () => void
}

export function useInfoWindow(
  maps: ShallowRef<typeof globalThis.google.maps | undefined>,
  map: ShallowRef<google.maps.Map | undefined>,
  options: MaybeRefOrGetter<google.maps.InfoWindowOptions>,
  marker: MaybeRefOrGetter<google.maps.Marker | undefined>,
): UseInfoWindowReturn {
  const infoWindow = shallowRef<google.maps.InfoWindow | undefined>()

  watchEffect(() => {
    if (!maps.value || !map.value)
      return

    infoWindow.value = markRaw(new maps.value.InfoWindow({
      ...toValue(options),
    }))
  })

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

    infoWindow.value.open({
      ...toValue(_options),
      map: map.value,
    }, _anchor ?? toValue(marker))
  }

  function close() {
    if (!infoWindow.value)
      return

    infoWindow.value.close()
  }

  watch(() => toValue(marker), (markerInstance) => {
    if (!markerInstance)
      return

    markerInstance.addListener('click', open)
  })

  tryOnBeforeUnmount(() => {
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
