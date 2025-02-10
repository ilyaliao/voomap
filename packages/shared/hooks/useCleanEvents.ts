import { tryOnScopeDispose } from '@vueuse/shared'

/**
 * Used to clean up events in Google Maps
 *
 * @internal
 */
export function useCleanEvents() {
  const events = new Set<() => void>()

  function collect(fn: () => google.maps.MapsEventListener) {
    const { remove } = fn()
    events.add(remove)
  }

  function clean() {
    events.forEach(fn => fn())
    events.clear()
  }

  tryOnScopeDispose(() => {
    clean()
  })

  return {
    collect,
    clean,
  }
}
