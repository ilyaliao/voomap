import type { LoaderOptions } from '@googlemaps/js-api-loader'
import type { Reactive, Ref, ShallowRef } from 'vue'

// reference https://github.com/vuejs/core/issues/8348
export interface MapOptions extends /* @vue-ignore */ google.maps.MapOptions {
  language?: LoaderOptions['language']
}

export interface UseGoogleMapReturn {
  google: ShallowRef<typeof globalThis.google | undefined>
  maps: ShallowRef<typeof globalThis.google.maps | undefined>
  map: ShallowRef<google.maps.Map | undefined>
  options: Reactive<MapOptions>
  zoom: Ref<NonNullable<google.maps.MapOptions['zoom']>>
  center: Ref<NonNullable<google.maps.MapOptions['center']>>
}
