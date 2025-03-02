<script lang="ts">
import type { GoogleMapEmits, GoogleMapEmitType, MapOptions, UseGoogleMapReturn } from '@voomap/core'
import { createContext } from '@voomap/shared'

interface GoogleMapContext extends UseGoogleMapReturn {}

export const [injectGoogleMapContext, provideGoogleMapContext]
= createContext<GoogleMapContext>('GoogleMap')

export type { GoogleMapEmits, GoogleMapEmitType, MapOptions }
</script>

<script setup lang="ts">
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

const mapRef = shallowRef<HTMLDivElement>()

const defaultOptions = reactiveOmit(props, (val, key) => val == null || key === 'apiKey')
const { google, maps, map } = useGoogleMap(props.apiKey, mapRef, defaultOptions)

defineExpose({
  google,
  maps,
  map,
})

provideGoogleMapContext({
  google,
  maps,
  map,
})
</script>

<template>
  <div ref="mapRef">
    <slot />
  </div>
</template>
