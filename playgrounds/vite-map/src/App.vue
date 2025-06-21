<script setup lang="ts">
import type { ComponentExposed } from 'vue-component-type-helpers'
import { GoogleMap, InfoWindow, Marker } from '@voomap/map'
import { ref, useTemplateRef } from 'vue'

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env

const zoom = ref(10)

const markerRef = useTemplateRef<ComponentExposed<typeof Marker>>('markerRef')
const infoWindowRef = useTemplateRef<ComponentExposed<typeof InfoWindow>>('infoWindowRef')

function zoomIn() {
  zoom.value++
}

function zoomOut() {
  zoom.value--
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
    :zoom
    @zoom-changed="zoom = $event"
  >
    <Marker
      ref="markerRef"
      :position="{ lat: 25.0855388, lng: 121.4791004 }"
    >
      <InfoWindow
        ref="infoWindowRef"
      >
        Hello I'm Marker
      </InfoWindow>
    </Marker>
  </GoogleMap>
</template>
