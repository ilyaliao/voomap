<script setup lang="ts">
import { useGoogleMap } from '@voomap/core'
import { toRefs, useTemplateRef } from 'vue'

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env

const el = useTemplateRef('el')

const { options } = useGoogleMap(VITE_GOOGLE_MAP_API_KEY, el, { zoom: 11 })
const { zoom, center } = toRefs(options.value)

function zoomIn() {
  zoom.value++
}

function zoomOut() {
  zoom.value--
}

function resetCenter() {
  center.value = { lat: 25.0855388, lng: 121.4791004 }
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
  </div>
  <div ref="el" style="width: 100vw; height: 100dvh" />
</template>
