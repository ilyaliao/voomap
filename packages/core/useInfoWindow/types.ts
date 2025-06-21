import type { ShallowRef } from 'vue'

// reference https://github.com/vuejs/core/issues/8348
export interface InfoWindowOptions extends /* @vue-ignore */ google.maps.InfoWindowOptions {}

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

/**
 * Marker Events
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/info-window?hl=zh-tw#InfoWindow-Events
 */
export const infoWindowEmits = [
  'close',
  'closeclick',
  'content_changed',
  'domready',
  'headercontent_changed',
  'headerdisabled_changed',
  'position_changed',
  'visible',
  'zindex_changed',
] as const

export type InfoWindowEmitType = (typeof infoWindowEmits)[number]

/**
 * Marker Events
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/info-window?hl=zh-tw#InfoWindow-Events
 */
export interface InfoWindowEmits {
  close: []
  closeclick: []
  contentChanged: []
  domready: []
  headercontentChanged: []
  headerdisabledChanged: []
  positionChanged: []
  visible: []
  zindexChanged: []
}
