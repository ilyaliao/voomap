<script setup lang="ts">
import { useGoogleMap, useInfoWindow, useMarker } from '@voomap/core'
import { watchOnce } from '@vueuse/core'
import { reactive, shallowRef, useTemplateRef } from 'vue'

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env

const el = useTemplateRef('el')

const options = reactive({
  zoom: 10,
  center: { lat: 25.0855388, lng: 121.4791004 },
})

const { maps, map } = useGoogleMap(
  VITE_GOOGLE_MAP_API_KEY,
  el,
  options,
)

const currentMarker = shallowRef<google.maps.Marker>()

const { marker } = useMarker(
  maps,
  map,
  {
    title: 'marker1',
    position: { lat: 25.0337, lng: 121.5636 },
  },
)

const { marker: marker2 } = useMarker(
  maps,
  map,
  {
    title: 'marker2',
    position: { lat: 24.1233, lng: 121.5636 },
  },
)

watchOnce(marker, () => {
  currentMarker.value = marker.value
})

useInfoWindow(
  maps,
  map,
  {},
  currentMarker,
)

function zoomIn() {
  if (options.zoom)
    options.zoom++
}

function zoomOut() {
  if (options.zoom)
    options.zoom--
}

function resetCenter() {
  options.center = { lat: 25.0855388, lng: 121.4791004 }
}

function changeMarker() {
  currentMarker.value = marker2.value
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
    <button @click="changeMarker">
      Change Marker
    </button>
    <button @click="changeMarkerContent">
      Change Marker Content
    </button>
  </div>
  <div ref="el" style="width: 100vw; height: 100dvh" />
</template>
