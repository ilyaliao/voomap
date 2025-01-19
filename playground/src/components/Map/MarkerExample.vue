<script setup lang="ts">
import { GoogleMap, Marker } from '@voomap/map'
import { reactive, ref } from 'vue'
import { createRandomCoordinate } from '../../mock'

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env

const zoom = ref(12)
const center = reactive<google.maps.LatLngLiteral>(createRandomCoordinate())
const markerRef = ref<InstanceType<typeof Marker>>()

function handleClick(e: google.maps.MapMouseEvent) {
  // eslint-disable-next-line no-console
  console.log('click', e.latLng)
}
</script>

<template>
  <GoogleMap
    disable-default-u-i
    in-taiwan
    :clickable-icons="false"
    :api-key="VITE_GOOGLE_MAP_API_KEY"
    :zoom="zoom"
    :center="center"
  >
    <!-- <Marker v-for="key in 10" :key="key" :title="key.toString()" :position="createRandomCoordinate" /> -->
    <Marker
      ref="markerRef"
      title="I'm your first marker!"
      draggable
      :opacity="10"
      :position="createRandomCoordinate()"
      @dblclick="handleClick"
    />
  </GoogleMap>
</template>
