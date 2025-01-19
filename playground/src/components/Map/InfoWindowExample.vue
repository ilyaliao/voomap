<script setup lang="ts">
import { GoogleMap, InfoWindow, Marker } from '@voomap/map'
import { reactive, ref } from 'vue'
import { createRandomCoordinate } from '../../mock'

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env

const zoom = ref(12)
const center = reactive<google.maps.LatLngLiteral>(createRandomCoordinate())
const singleRef = ref<InstanceType<typeof InfoWindow>>()
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
    <Marker
      v-for="item in 2"
      :key="item"
      :title="`I'm your ${item} marker!`"
      :position="createRandomCoordinate()"
    >
      <InfoWindow
        open-event="mouseover"
        close-event="mouseout"
        initial-state
      />
    </Marker>
    <InfoWindow
      ref="singleRef"
      content="I'm single qq"
      :position="createRandomCoordinate()"
    />
  </GoogleMap>
</template>
