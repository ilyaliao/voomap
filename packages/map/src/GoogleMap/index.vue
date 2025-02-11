<script setup lang="ts">
import { type GoogleMapEmits, googleMapsEmits, type MapOptions, useGoogleMap } from '@voomap/core'
import { useCleanEvents } from '@voomap/shared'
import { invoke, reactiveOmit, until } from '@vueuse/core'
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

const emit = defineEmits<GoogleMapEmits>()

const { collect } = useCleanEvents()

// support vue <= 3.5
const mapRef = shallowRef<HTMLDivElement>()

const defaultOptions = reactiveOmit(props, (val, key) => val == null || key === 'apiKey')
const { map } = useGoogleMap(props.apiKey, mapRef, defaultOptions)

invoke(async () => {
  await until(map).toBeTruthy()

  for (const event of googleMapsEmits) {
    collect(
      () => map.value!.addListener(event, ((...args: unknown[]) => {
        const kebabEvent = event.replace(/_([a-z])/g, (_, c) => c.toUpperCase())
        console.log(123)
        ;(emit as any)(kebabEvent, ...(args as any[]))
      }) as any),
    )
  }
})
</script>

<template>
  <div ref="mapRef" />
</template>
