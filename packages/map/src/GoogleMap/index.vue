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

const { apiKey, ...options } = defineProps<{ apiKey: string } & MapOptions>()

defineEmits<GoogleMapEmits>()

const mapRef = shallowRef<HTMLDivElement>()

const { google, maps, map } = useGoogleMap(apiKey, mapRef, options)

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
