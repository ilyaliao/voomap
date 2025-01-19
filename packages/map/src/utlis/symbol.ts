import type { MarkerClusterer } from '@googlemaps/markerclusterer'
import type { InjectionKey, Ref } from 'vue'
import type { Map, Marker } from '../types'

export const mapSymbol: InjectionKey<Ref<Map | undefined>> = Symbol('map')
export const apiSymbol: InjectionKey<Ref<typeof google.maps | undefined>> = Symbol('api')
export const markerClustererSymbol: InjectionKey<Ref<MarkerClusterer | undefined>> = Symbol('markerClusterer')
export const markerSymbol: InjectionKey<Ref<Marker | undefined>> = Symbol('marker')
