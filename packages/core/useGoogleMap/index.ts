import type { MaybeRefOrGetter, Raw } from 'vue'
import type { MapOptions, UseGoogleMapReturn } from './types'
import { type MaybeComputedElementRef, unrefElement } from '@vueuse/core'
import { tryOnScopeDispose, watchDeep } from '@vueuse/shared'
import { computed, markRaw, shallowRef, toValue, watch } from 'vue'
import { useMap } from '../useMap'

export function useGoogleMap(
  apiKey: string,
  target: MaybeComputedElementRef,
  defaultOptions: MaybeRefOrGetter<MapOptions> = {},
): UseGoogleMapReturn {
  const google = shallowRef<Raw<typeof globalThis.google>>()
  const maps = shallowRef<Raw<typeof globalThis.google.maps>>()
  const map = shallowRef<Raw<google.maps.Map>>()

  const options = computed(() => toValue(defaultOptions))

  async function initMap(element: HTMLElement) {
    const { loader } = useMap(apiKey, options.value.language)
    google.value = markRaw(await loader.load())
    maps.value = markRaw(google.value.maps)
    map.value = markRaw(new maps.value.Map(element, options.value))
  }

  watch(() => unrefElement(target), (element) => {
    if (!element)
      return

    initMap(element as HTMLElement)
  })

  watchDeep([
    () => options.value.zoom,
    () => options.value.center,
    () => options.value,
  ], ([newZoom, newCenter], [oldZoom, oldCenter]) => {
    if (newZoom != null && newZoom !== oldZoom)
      map.value?.setZoom(newZoom)

    if (newCenter != null && newCenter !== oldCenter) {
      // panTo will animate the map to the new center, setCenter will set the map to the new center without animation
      map.value?.panTo(newCenter)
    }

    map.value?.setOptions(toValue(options))
  })

  tryOnScopeDispose(() => {
    if (map.value)
      maps.value?.event.clearInstanceListeners(map.value)
  })

  return {
    google,
    maps,
    map,
  }
}

export * from './types'
