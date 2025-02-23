import type { MaybeComputedElementRef } from '@vueuse/core'
import type { ComponentInternalInstance, MaybeRefOrGetter, Raw } from 'vue'
import type { MapOptions, UseGoogleMapReturn } from './types'
import { unrefElement } from '@vueuse/core'
import { tryOnScopeDispose, watchDeep } from '@vueuse/shared'
import { computed, getCurrentInstance, markRaw, shallowRef, toValue, watch } from 'vue'
import { useMap } from '../useMap'
import { googleMapsEmits } from './types'

export function useGoogleMap(
  apiKey: string,
  target: MaybeComputedElementRef,
  defaultOptions: MaybeRefOrGetter<MapOptions> = {},
  emit: ComponentInternalInstance['emit'] | undefined = getCurrentInstance()?.emit,
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

  function bindEvents() {
    if (!emit)
      return

    for (const event of googleMapsEmits) {
      const kebabEvent = event.replace(/_([a-z])/g, (_, c) => c.toUpperCase())

      if (event === 'zoom_changed') {
        map.value?.addListener(event, () => {
          const zoom = map.value?.getZoom()
          emit(kebabEvent, zoom)
        })
      }
      else if (event === 'center_changed') {
        map.value?.addListener(event, () => {
          const center = map.value?.getCenter()
          emit(kebabEvent, center?.lat(), center?.lng())
        })
      }
      else {
        map.value!.addListener(event, ((...args: unknown[]) => {
          emit(kebabEvent, ...(args as any[]))
        }) as any)
      }
    }
  }

  watch(() => unrefElement(target), async (element) => {
    if (!element)
      return

    await initMap(element as HTMLElement)
    bindEvents()
  })

  watchDeep([
    () => options.value.zoom,
    () => options.value.center,
    () => options.value,
  ], ([newZoom, newCenter], [oldZoom, oldCenter]) => {
    if (newZoom != null && newZoom !== oldZoom && newZoom !== map.value?.getZoom())
      map.value?.setZoom(newZoom)

    if (newCenter != null && newCenter !== oldCenter && newCenter !== map.value?.getCenter()) {
      // panTo will animate the map to the new center, setCenter will set the map to the new center without animation
      map.value?.panTo(newCenter)
    }

    const { zoom, center, ...otherOptions } = toValue(options)
    map.value?.setOptions(otherOptions)
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
