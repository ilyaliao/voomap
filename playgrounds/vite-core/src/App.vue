<script setup lang="ts">
import { useGoogleMap, useInfoWindow, useMarker } from '@voomap/core'
import { useTemplateRef } from 'vue'

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env

const el = useTemplateRef('el')

const { maps, map, zoom, center } = useGoogleMap(
  VITE_GOOGLE_MAP_API_KEY,
  el,
  {
    zoom: 11,
    disableDefaultUI: true,
    zoomControl: false,
  },
)

const { marker } = useMarker(
  maps,
  map,
  {
    title: '1232321',
    position: { lat: 25.0337, lng: 121.5636 },
  },
)

useInfoWindow(
  maps,
  map,
  {
    position: { lat: 25.0337, lng: 121.5636 },
  },
  marker,
)

function zoomIn() {
  zoom.value++
}

function zoomOut() {
  zoom.value--
}

function resetCenter() {
  center.value = { lat: 25.0855388, lng: 121.4791004 }
}

function changeMarkerContent() {
  const texts = ['Hello', 'Good Morning', 'Good Afternoon', 'Good Evening', 'Goodbye']
  const randomText = texts[Math.floor(Math.random() * texts.length)]
  marker.value?.setTitle(randomText)
}
</script>

<template>
  <div style="position: absolute; top: 0; left: 0; z-index: 1000">
    <button @click="zoomIn">
      Zoom In
    </button>
    <button @click="zoomOut">
      Zoom Out
    </button>
    <button @click="resetCenter">
      Reset Center
    </button>
    <button @click="changeMarkerContent">
      Change Marker Content
    </button>
  </div>
  <div ref="el" style="width: 100vw; height: 100dvh" />
</template>
