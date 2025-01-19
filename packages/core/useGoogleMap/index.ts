import type { MaybeRefOrGetter, Raw, Ref, ShallowRef } from 'vue'
import type { MapOptions, ReturnMapOptions } from './types'
import { markRaw, onBeforeUnmount, onMounted, ref, shallowRef, toValue, watch } from 'vue'
import { type MaybeComputedElementRef, unrefElement } from '../unrefElement'
import { useMap } from '../useMap'

export interface UseGoogleMapReturn {
  google: ShallowRef<typeof globalThis.google | undefined>
  maps: ShallowRef<typeof globalThis.google.maps | undefined>
  map: ShallowRef<google.maps.Map | undefined>
  options: Ref<ReturnMapOptions>
}

const _defaultOptions: NonNullable<MapOptions> = {
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
}

export function useGoogleMap(
  apiKey: string,
  target: MaybeComputedElementRef,
  defaultOptions: MapOptions = {},
): UseGoogleMapReturn {
  defaultOptions = {
    ..._defaultOptions,
    ...defaultOptions,
  }

  const google = shallowRef<Raw<typeof globalThis.google>>()
  const maps = shallowRef<Raw<typeof globalThis.google.maps>>()
  const map = shallowRef<Raw<google.maps.Map>>()

  // Since defaultOptions have been merged, the type of options will be ReturnMapOptions
  const options: Ref<ReturnMapOptions> = ref(defaultOptions as ReturnMapOptions)

  async function initMap(element: HTMLElement) {
    const { loader } = useMap(apiKey, options.value.language)
    google.value = markRaw(await loader.load())
    maps.value = markRaw(google.value.maps)
    map.value = markRaw(new maps.value.Map(element, options.value))

    // TODO: bind events
  }

  watch(() => unrefElement(target), (element) => {
    if (!element)
      return

    initMap(element as HTMLElement)
  })

  watch(
    () => options.value.zoom,
    (newZoom) => {
      if (newZoom == null)
        return

      map.value?.setZoom(newZoom)
    },
    { deep: true, immediate: true },
  )

  watch(() => options.value.center, (newCenter) => {
    if (newCenter == null)
      return

    // panTo will animate the map to the new center, setCenter will set the map to the new center without animation
    map.value?.panTo(newCenter)
  })

  onBeforeUnmount(() => {
    if (map.value)
      maps.value?.event.clearInstanceListeners(map.value)
  })

  return {
    google,
    maps,
    map,
    options,
  }
}
