<script setup lang="ts">
import type { GoogleMapEmits, MapOptions } from '@voomap/core'
import { useGoogleMap } from '@voomap/core'
import { reactiveOmit } from '@vueuse/core'
import { shallowRef } from 'vue'

const props = withDefaults(
  defineProps<{ apiKey: string } & MapOptions>(),
  {
    center: () => ({ lat: 25.0855388, lng: 121.4791004 }),
    clickableIcons: true,
    draggable: true,
    fullscreenControl: true,
    gestureHandling: 'auto',
    isFractionalZoomEnabled: true,
    maxZoom: 15,
    minZoom: 8,
    scaleControl: true,
    scrollwheel: true,
    zoom: 11,
    zoomControl: true,
    language: 'en',
  },
)

defineEmits<GoogleMapEmits>()

// support vue <= 3.5
const mapRef = shallowRef<HTMLDivElement>()

const defaultOptions = reactiveOmit(props, (val, key) => val == null || key === 'apiKey')
useGoogleMap(props.apiKey, mapRef, defaultOptions)
</script>

<template>
  <div ref="mapRef" />
</template>
