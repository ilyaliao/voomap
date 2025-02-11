<script setup lang="ts">
import { _defaultOptions, type MapOptions, useGoogleMap } from '@voomap/core'
import { reactiveOmit } from '@vueuse/core'
import { useTemplateRef } from 'vue'

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

const mapRef = useTemplateRef<HTMLDivElement>('map')

const options = reactiveOmit(props, (val, key) => val == null || key === 'apiKey')
const { map } = useGoogleMap(props.apiKey, mapRef, options)
</script>

<template>
  <div ref="map" />
</template>
