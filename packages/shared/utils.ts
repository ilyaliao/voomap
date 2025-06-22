/**
 * Create a marker instance
 */
export function createMarker(
  maps: typeof globalThis.google.maps,
  map: google.maps.Map,
  options: google.maps.MarkerOptions,
): google.maps.Marker {
  return new maps.Marker({
    ...options,
    map,
  })
}

/**
 * Create an info window instance
 */
export function createInfoWindow(
  maps: typeof globalThis.google.maps,
  options: google.maps.InfoWindowOptions,
): google.maps.InfoWindow {
  return new maps.InfoWindow(options)
}
