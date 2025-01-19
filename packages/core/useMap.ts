import type { LoaderOptions } from '@googlemaps/js-api-loader'
import { Loader } from '@googlemaps/js-api-loader'

export function useMap(apiKey: string, language?: LoaderOptions['language']): { loader: Loader } {
  const loader: Loader = new Loader({
    apiKey,
    version: 'weekly',
    libraries: ['places'],
    language,
  })

  return {
    loader,
  }
}
