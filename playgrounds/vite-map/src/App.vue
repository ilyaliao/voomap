<script setup lang="ts">
import { GoogleMap, InfoWindow, Marker } from '@voomap/map'
import { reactive } from 'vue'

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env

const googleMapOptions = reactive({
  zoom: 10,
  center: { lat: 25.0855388, lng: 121.4791004 },
})

function zoomIn() {
  googleMapOptions.zoom++
}

function zoomOut() {
  googleMapOptions.zoom--
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
  </div>
  <GoogleMap
    style="width: 100vw; height: 100dvh"
    :api-key="VITE_GOOGLE_MAP_API_KEY"
    :="googleMapOptions"
  >
    <Marker
      title="Marker1"
      :position="{ lat: 25.0855388, lng: 121.4791004 }"
    >
      <InfoWindow />
    </Marker>
    <Marker
      :position="{ lat: 24.1233, lng: 121.5636 }"
    >
      <InfoWindow>
        Marker2
      </InfoWindow>
    </Marker>
  </GoogleMap>
</template>
