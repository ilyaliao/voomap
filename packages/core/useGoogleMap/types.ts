import type { LoaderOptions } from '@googlemaps/js-api-loader'
import type { ShallowRef } from 'vue'

// reference https://github.com/vuejs/core/issues/8348
export interface MapOptions extends /* @vue-ignore */ google.maps.MapOptions {
  language?: LoaderOptions['language']
}

export interface UseGoogleMapReturn {
  google: ShallowRef<typeof globalThis.google | undefined>
  maps: ShallowRef<typeof globalThis.google.maps | undefined>
  map: ShallowRef<google.maps.Map | undefined>
}

export const googleMapsEmits = [
  'bounds_changed',
  'center_changed',
  'click',
  'contextmenu',
  'dblclick',
  'drag',
  'dragend',
  'dragstart',
  'heading_changed',
  'idle',
  'isfractionalzoomenabled_changed',
  'mapcapabilities_changed',
  'maptypeid_changed',
  'mousemove',
  'mouseout',
  'mouseover',
  'projection_changed',
  'renderingtype_changed',
  'tilesloaded',
  'tilt_changed',
  'zoom_changed',
] as const

export type GoogleMapEmitType = (typeof googleMapsEmits)[number]

export interface GoogleMapEmits {
  boundsChanged: []
  centerChanged: [lat: number, lng: number]
  click: [event: google.maps.MapMouseEvent]
  contextmenu: [event: google.maps.MapMouseEvent]
  dblclick: [event: google.maps.MapMouseEvent]
  drag: []
  dragend: [event: google.maps.MapMouseEvent]
  dragstart: [event: google.maps.MapMouseEvent]
  headingChanged: []
  idle: []
  isfractionalzoomenabledChanged: []
  mapcapabilitiesChanged: []
  maptypeidChanged: []
  mousemove: [event: google.maps.MapMouseEvent]
  mouseout: [event: google.maps.MapMouseEvent]
  mouseover: [event: google.maps.MapMouseEvent]
  projectionChanged: []
  renderingtypeChanged: []
  tilesloaded: []
  tiltChanged: []
  zoomChanged: [zoom: number]
}
