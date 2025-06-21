import type { ComponentInternalInstance, MaybeRefOrGetter, ShallowRef } from 'vue'
import type { UseInfoWindowReturn } from './types'
import { camelizeUnderscore, createInfoWindow } from '@voomap/shared'
import { tryOnScopeDispose, watchImmediate } from '@vueuse/shared'
import { getCurrentInstance, shallowRef, toValue, watch } from 'vue'
import { infoWindowEmits } from './types'

export * from './types'

export function useInfoWindow(
  maps: ShallowRef<typeof globalThis.google.maps | undefined>,
  map: ShallowRef<google.maps.Map | undefined>,
  /**
   * InfoWindow Options
   *
   * @see https://developers.google.com/maps/documentation/javascript/reference/info-window?hl=zh-tw#InfoWindowOptions-Properties
   */
  options: MaybeRefOrGetter<google.maps.InfoWindowOptions>,
  marker?: MaybeRefOrGetter<google.maps.Marker | undefined>,
  emit: ComponentInternalInstance['emit'] | undefined = getCurrentInstance()?.emit,
): UseInfoWindowReturn {
  const infoWindow = shallowRef<google.maps.InfoWindow | undefined>()

  function getContent() {
    const _options = toValue(options)
    return _options?.content ?? toValue(marker)?.getTitle() ?? ''
  }

  function bindEvents() {
    if (!emit)
      return

    for (const event of infoWindowEmits) {
      const kebabEvent = camelizeUnderscore(event)

      infoWindow.value?.addListener(event, () => {
        emit(kebabEvent, event)
      })
    }
  }

  watch(
    [maps, map],
    ([newMaps, newMap]) => {
      if (!newMaps || !newMap)
        return

      const _options = {
        ...toValue(options),
        content: getContent(),
      }

      infoWindow.value = createInfoWindow(newMaps, _options)
      bindEvents()
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

  const markerEvents = new Set<google.maps.MapsEventListener>()
  watchImmediate(() => toValue(marker), (markerInstance) => {
    if (!markerInstance)
      return

    if (markerEvents.size) {
      for (const event of markerEvents) {
        event.remove()
      }

      markerEvents.clear()
    }

    infoWindow.value?.setContent(getContent())
    markerEvents.add(markerInstance.addListener('click', open))
    markerEvents.add(markerInstance.addListener('title_changed', changeInfoWindowContent))
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
