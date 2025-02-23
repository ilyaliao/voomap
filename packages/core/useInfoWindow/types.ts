import type { ShallowRef } from 'vue'

export interface UseInfoWindowReturn {
  /**
   * The info window instance
   */
  infoWindow: ShallowRef<google.maps.InfoWindow | undefined>
  /**
   * Open the info window
   */
  open: () => void
  /**
   * Close the info window
   */
  close: () => void
}
