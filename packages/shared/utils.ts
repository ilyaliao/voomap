/**
 * Create a marker instance
 */
export function createMarker(
  maps: typeof globalThis.google.maps,
  map: google.maps.Map,
  options: google.maps.marker.AdvancedMarkerElementOptions,
): google.maps.Marker {
  return new maps.Marker({
    ...options,
    map,
  })
}
