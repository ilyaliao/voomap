<script setup lang="ts">
import { GridAlgorithm } from '@googlemaps/markerclusterer'
import { GoogleMap, Marker, MarkerClusterer } from '@voomap/map'
import { reactive, ref } from 'vue'
import { createRandomCoordinate } from '../../mock'

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env

const zoom = ref(12)
const center = reactive<google.maps.LatLngLiteral>({
  lat: 25.0855388,
  lng: 121.4791004,
})

const algorithm = new GridAlgorithm({
  gridSize: 60,
})
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
    <MarkerClusterer :algorithm="algorithm">
      <Marker
        v-for="marker in 500"
        :key="marker"
        :title="`I'm your ${marker} marker!`"
        :position="createRandomCoordinate()"
        :opacity="10"
      />
    </MarkerClusterer>
  </GoogleMap>
</template>
