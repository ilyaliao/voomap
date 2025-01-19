import type { LoaderOptions } from '@googlemaps/js-api-loader'

export interface MapOptions extends google.maps.MapOptions {
  language?: LoaderOptions['language']
}
