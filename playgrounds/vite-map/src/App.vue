<script setup lang="ts">
import { GoogleMap } from '@voomap/map'
import { ref } from 'vue'

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env

const zoom = ref(10)

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
  />
</template>
