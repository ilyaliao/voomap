export function createRandomCoordinate() {
  const randomLat = 22 + Math.random() * 3
  const randomLng = 120.5 + Math.random()

  const lat = Number.parseFloat(randomLat.toFixed(6))
  const lng = Number.parseFloat(randomLng.toFixed(6))

  return { lat, lng }
}
