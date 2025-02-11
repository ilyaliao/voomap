import type { MaybeRefOrGetter, Raw } from 'vue'
import type { MapOptions, UseGoogleMapReturn } from './types'
import { type MaybeComputedElementRef, unrefElement } from '@vueuse/core'
import { reactiveOmit, tryOnScopeDispose, watchDeep } from '@vueuse/shared'
import { markRaw, reactive, ref, shallowRef, toRefs, toValue, watch } from 'vue'
import { useMap } from '../useMap'

export function useGoogleMap(
  apiKey: string,
  target: MaybeComputedElementRef,
  defaultOptions: MaybeRefOrGetter<MapOptions> = {},
): UseGoogleMapReturn {
  const google = shallowRef<Raw<typeof globalThis.google>>()
  const maps = shallowRef<Raw<typeof globalThis.google.maps>>()
  const map = shallowRef<Raw<google.maps.Map>>()

  const options = reactive(toValue(defaultOptions))

  const {
    zoom = ref(0),
  } = toRefs(options)

  async function initMap(element: HTMLElement) {
    const { loader } = useMap(apiKey, options.language)
    google.value = markRaw(await loader.load())
    maps.value = markRaw(google.value.maps)
    map.value = markRaw(new maps.value.Map(element, options))
  }

  watch(() => unrefElement(target), (element) => {
    if (!element)
      return

    initMap(element as HTMLElement)
  })

  watchDeep([
    () => options.zoom,
    () => options.center,
    () => reactiveOmit(options, 'zoom', 'center'),
  ], ([newZoom, newCenter], [oldZoom, oldCenter]) => {
    if (newZoom != null && newZoom !== oldZoom)
      map.value?.setZoom(newZoom)

    if (newCenter != null && newCenter !== oldCenter) {
      // panTo will animate the map to the new center, setCenter will set the map to the new center without animation
      map.value?.panTo(newCenter)
    }

    map.value?.setOptions(options)
  })

  tryOnScopeDispose(() => {
    if (map.value)
      maps.value?.event.clearInstanceListeners(map.value)
  })

  return {
    google,
    maps,
    map,
    options,
    zoom,
  }
}

export * from './types'
