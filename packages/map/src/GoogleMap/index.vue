<script setup lang="ts">
import { type MapOptions, useGoogleMap } from '@voomap/core'
import { toRefs, useAttrs, useTemplateRef, watchEffect } from 'vue'

const props = defineProps<{ apiKey: string } & MapOptions>()
const attr = useAttrs()
const { apiKey, ...options } = toRefs(props)

const mapRef = useTemplateRef<HTMLDivElement>('map')

const { map } = useGoogleMap(apiKey.value, mapRef)

watchEffect(() => {
  console.log(props)
  console.log(options)
  console.log(attr)
})
</script>

<template>
  <div ref="map" />
</template>
