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
import { shallowRef } from 'vue'

const props = withDefaults(defineProps<{ apiKey: string } & MapOptions>(), {
  cameraControl: undefined,
  clickableIcons: true,
  disableDefaultUI: undefined,
  disableDoubleClickZoom: undefined,
  draggable: undefined,
  fullscreenControl: undefined,
  headingInteractionEnabled: false,
  isFractionalZoomEnabled: true,
  keyboardShortcuts: undefined,
  mapTypeControl: undefined,
  noClear: undefined,
  panControl: undefined,
  rotateControl: undefined,
  scaleControl: undefined,
  scrollwheel: undefined,
  streetViewControl: undefined,
  tiltInteractionEnabled: false,
  zoomControl: undefined,
  mapTypeId: undefined,
})

defineEmits<GoogleMapEmits>()

const mapRef = shallowRef<HTMLDivElement>()

const { google, maps, map } = useGoogleMap(props.apiKey, mapRef, props)

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
