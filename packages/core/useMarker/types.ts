import type { ShallowRef } from 'vue'

// reference https://github.com/vuejs/core/issues/8348
export interface MarkerOptions extends /* @vue-ignore */ google.maps.MarkerOptions {}

export interface UseMarkerReturn {
  /**
   * The marker instance
   */
  marker: ShallowRef<google.maps.Marker | undefined>
}

/**
 * Marker Events
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/marker?hl=zh-tw#Marker-Events
 */
export const markerEmits = [
  'animation_changed',
  'click',
  'clickable_changed',
  'contextmenu',
  'cursor_changed',
  'dblclick',
  'drag',
  'dragend',
  'draggable_changed',
  'dragstart',
  'flat_changed',
  'icon_changed',
  'mousedown',
  'mouseout',
  'mouseover',
  'mouseup',
  'position_changed',
  'shape_changed',
  'title_changed',
  'visible_changed',
  'zindex_changed',
  'rightclick',
] as const

export type MarkerEmitType = (typeof markerEmits)[number]

/**
 * Marker Events
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/marker?hl=zh-tw#Marker-Events
 */
export interface MarkerEmits {
  animationChanged: []
  click: [event: google.maps.MapMouseEvent]
  clickableChanged: []
  contextmenu: [event: google.maps.MapMouseEvent]
  cursorChanged: []
  dblclick: [event: google.maps.MapMouseEvent]
  drag: [event: google.maps.MapMouseEvent]
  draggableChanged: []
  dragstart: [event: google.maps.MapMouseEvent]
  flatChanged: []
  iconChanged: []
  mousedown: [event: google.maps.MapMouseEvent]
  mouseout: [event: google.maps.MapMouseEvent]
  mouseover: [event: google.maps.MapMouseEvent]
  mouseup: [event: google.maps.MapMouseEvent]
  positionChanged: []
  shapeChanged: []
  titleChanged: []
  visibleChanged: []
  zindexChanged: []
  rightclick: [event: google.maps.MapMouseEvent]
}
