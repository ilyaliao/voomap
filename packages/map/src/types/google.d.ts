import type { MarkerEvent } from '@/utlis/events'
import type { MarkerOptions } from '.'

// Map
export type Map = google.maps.Map
export type Marker = google.maps.Marker
export type InfoWindow = google.maps.InfoWindow
export type MapRestriction = google.maps.MapRestriction
export type StreetViewPanorama = google.maps.StreetViewPanorama
export type MapTypeStyle = google.maps.MapTypeStyle

// Marker
export type Point = google.maps.Point
export type Animation = google.maps.Animation
export type Icon = google.maps.Icon
export type Symbol = google.maps.Symbol
export type MarkerLabel = google.maps.MarkerLabel
export type MarkerShape = google.maps.MarkerShape

// InfoWindow
export type Size = google.maps.Size

// other
export type LatLng = google.maps.LatLng
export type LatLngLiteral = google.maps.LatLngLiteral

// Events
export type MapMouseEvent = google.maps.MapMouseEvent
export type IconMouseEvent = google.maps.IconMouseEvent

export type GoogleComponentsKey = 'Marker' | 'Polyline' | 'Polygon' | 'Rectangle' | 'Circle'

export type GoogleMapComponentType<T> = T extends 'Marker'
  ? Marker
  : T extends 'Polyline'
    ? google.maps.Polyline
    : T extends 'Polygon'
      ? google.maps.Polygon
      : T extends 'Rectangle'
        ? google.maps.Rectangle
        : T extends 'Circle'
          ? google.maps.Circle
          : unknown

export type GoogleMapComponentEvents<T> = T extends 'Marker'
  ? MarkerEvent
  : T extends 'Polyline'
    ? MarkerEvent
    : T extends 'Polygon'
      ? MarkerEvent
      : T extends 'Rectangle'
        ? MarkerEvent
        : T extends 'Circle'
          ? MarkerEvent
          : unknown

export type GoogleMapComponentOptions<T> = T extends 'Marker'
  ? MarkerOptions
  : T extends 'Polyline'
    ? google.maps.PolylineOptions
    : T extends 'Polygon'
      ? google.maps.PolygonOptions
      : T extends 'Rectangle'
        ? google.maps.RectangleOptions
        : T extends 'Circle'
          ? google.maps.CircleOptions
          : unknown
