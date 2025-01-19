import type {
  GoogleComponentsKey,
  GoogleMapComponentEvents,
  GoogleMapComponentOptions,
  GoogleMapComponentType,
  Marker,
  MarkerOptions,
} from '@/types'
import type { Ref } from 'vue'
import { computed, inject, onBeforeUnmount, ref, unref, watch } from 'vue'
import { hasChanged } from '../utlis'
import { apiSymbol, mapSymbol, markerClustererSymbol } from '../utlis/symbol'

export function useMap<T extends GoogleComponentsKey>(
  key: T,
  events: GoogleMapComponentEvents<T>,
  options: Ref<GoogleMapComponentOptions<T>>,
  emit: (event: any, ...args: any) => void,
): Ref<GoogleMapComponentType<T> | undefined> {
  const component = ref<GoogleMapComponentType<T>>()
  const map = inject(mapSymbol, ref())
  const api = inject(apiSymbol, ref())
  const markerClusterer = inject(markerClustererSymbol, ref())

  const hasMarkerInCluster = computed(() => !!markerClusterer.value)

  // NOTE: avoiding redundant rendering.
  watch([map, options], (_, [oldMap, oldOptions]) => {
    if (!map.value || !api.value || !(hasChanged(options.value, oldOptions) || hasChanged(map.value, oldMap)))
      return

    const marker = new api.value.Marker({
      ...unref(options),
      map: map.value,
    })

    if (component.value) {
      component.value.setOptions(
        options as (
          MarkerOptions
          & google.maps.PolylineOptions
          & google.maps.PolygonOptions
          & google.maps.RectangleOptions
          & google.maps.CircleOptions
        ) | null,
      )

      if (hasMarkerInCluster.value) {
        markerClusterer.value?.removeMarker(component.value as Marker)
        markerClusterer.value?.addMarker(component.value as Marker)
      }
    }
    else {
      component.value = marker as GoogleMapComponentType<typeof key>

      if (hasMarkerInCluster.value)
        markerClusterer.value?.addMarker(component.value as Marker)

      events.forEach((event) => {
        component.value?.addListener(event, (e: any) => emit(event, e))
      })
    }
  }, {
    immediate: true,
  })

  onBeforeUnmount(() => {
    if (component.value)
      api.value?.event.clearInstanceListeners(component.value)

    if (hasMarkerInCluster.value)
      markerClusterer.value?.removeMarker(component.value as Marker)
  })

  return component
}
