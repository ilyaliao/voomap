import type { Raw, ShallowRef } from 'vue'
import type { MapOptions } from './types'
import { markRaw, onBeforeUnmount, onMounted, shallowRef, watch } from 'vue'
import { type MaybeComputedElementRef, unrefElement } from '../unrefElement'
import { useMap } from '../useMap'

export interface UseGoogleMapReturn {
  google: ShallowRef<typeof globalThis.google | undefined>
  maps: ShallowRef<typeof globalThis.google.maps | undefined>
  map: ShallowRef<google.maps.Map | undefined>
}

export function useGoogleMap(
  apiKey: string,
  target: MaybeComputedElementRef,
  options: MapOptions = {
    center: { lat: 25.0855388, lng: 121.4791004 },
    clickableIcons: true,
    draggable: true,
    fullscreenControl: true,
    gestureHandling: 'auto',
    isFractionalZoomEnabled: true,
    maxZoom: 15,
    minZoom: 8,
    scaleControl: true,
    scrollwheel: true,
    zoom: 11,
    zoomControl: true,
    language: 'en',
  },
): UseGoogleMapReturn {
  const google = shallowRef<Raw<typeof globalThis.google>>()
  const maps = shallowRef<Raw<typeof globalThis.google.maps>>()
  const map = shallowRef<Raw<google.maps.Map>>()

  async function initMap(element: HTMLElement) {
    const { loader } = useMap(apiKey, options.language)
    google.value = markRaw(await loader.load())
    maps.value = markRaw(google.value.maps)
    map.value = markRaw(new maps.value.Map(element, options))

    // TODO: bind events
  }

  watch(() => unrefElement(target), (element) => {
    if (!element)
      return

    initMap(element as HTMLElement)
  })

  onBeforeUnmount(() => {
    if (map.value)
      maps.value?.event.clearInstanceListeners(map.value)
  })

  return {
    google,
    maps,
    map,
  }
}
