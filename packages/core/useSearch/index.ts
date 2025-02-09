import type { Ref } from 'vue'
import { markRaw, onMounted, reactive, ref, toValue } from 'vue'
import { useMap } from '../useMap'

export function useSearch(apiKey: string, language: string = 'en') {
  const isLoading = ref(false)
  const cGoogle = ref<typeof google>()
  const cApi = ref<typeof google.maps>()
  const cGeocoder = ref<google.maps.Geocoder>()
  const coordinates = reactive<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  })

  function resetCoordinates() {
    Object.assign(coordinates, {
      lat: 0,
      lng: 0,
    })
  }

  const getCoordinates = async (address: string | Ref<string>) => {
    isLoading.value = true

    if (!cGeocoder.value)
      return

    if (!address && !toValue(address))
      return

    const request: google.maps.GeocoderRequest = {
      address: toValue(address),
    }

    // Use the geocoding service to convert the address into geographic coordinates
    await cGeocoder.value.geocode(request, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {
        const { location } = results[0].geometry

        if (!location)
          return

        const { lat, lng } = location

        if (!lat || !lng)
          return

        // 設置座標
        Object.assign(coordinates, { lat: lat(), lng: lng() })

        isLoading.value = false
      }
      else {
        resetCoordinates()

        isLoading.value = false
      }
    })
  }

  onMounted(async () => {
    const { loader } = useMap(apiKey, language)
    cGoogle.value = markRaw(await loader.load())
    cApi.value = markRaw(cGoogle.value.maps)
    cGeocoder.value = markRaw(new cApi.value.Geocoder())
  })

  return {
    isLoading,
    coordinates,
    getCoordinates,
  }
}
