import type { LoaderOptions } from '@googlemaps/js-api-loader'

export interface MapOptions extends google.maps.MapOptions {
  language?: LoaderOptions['language']
}

export interface ReturnMapOptions extends MapOptions {
  /**
   * @default 11
   */
  zoom: NonNullable<google.maps.MapOptions['zoom']>
  /**
   * @default { lat: 25.0855388, lng: 121.4791004 }
   */
  center: NonNullable<google.maps.MapOptions['center']>
}
