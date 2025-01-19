<script setup lang="ts">
import { GoogleMap } from '@voomap/map'
import { reactive, ref } from 'vue'
import { createRandomCoordinate } from '../../mock'

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env

const zoom = ref(12)
const center = reactive<google.maps.LatLngLiteral>(createRandomCoordinate())
const mapRef = ref<InstanceType<typeof GoogleMap> | null>(null)

function handleZoomIn(value: number) {
  zoom.value = ++value
}

function handleZoomOut(value: number) {
  zoom.value = --value
}

function changeCenter() {
  Object.assign(center, createRandomCoordinate())
}
</script>

<template>
  <GoogleMap
    ref="mapRef"
    disable-default-u-i
    in-taiwan
    :clickable-icons="false"
    :api-key="VITE_GOOGLE_MAP_API_KEY"
    :zoom="zoom"
    :max-zoom="20"
    :min-zoom="10"
    :center="center"
  />
  <button type="button" style="bottom: 20px; left: 10px" @click="changeCenter()">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20 1v3h3v2h-3v3h-2V6h-3V4h3V1h2zm-8 12c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2zm2-9.75V7h3v3h2.92c.05.39.08.79.08 1.2c0 3.32-2.67 7.25-8 11.8c-5.33-4.55-8-8.48-8-11.8C4 6.22 7.8 3 12 3c.68 0 1.35.08 2 .25z" /></svg>
  </button>
  <button type="button" style="bottom: 70px; right: 10px;" @click="handleZoomIn(zoom)">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2z" /></svg>
  </button>
  <button type="button" style="bottom: 20px; right: 10px" @click="handleZoomOut(zoom)">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18 12.998H6a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2z" /></svg>
  </button>
</template>
