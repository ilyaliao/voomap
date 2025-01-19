<script setup lang="ts">
import type { MarkerClustererOptions } from '@googlemaps/markerclusterer'
import { apiSymbol, mapSymbol, markerClustererSymbol } from '@/utlis/symbol'
import { MarkerClusterer, MarkerClustererEvents } from '@googlemaps/markerclusterer'
import { inject, markRaw, onBeforeUnmount, onMounted, provide, ref, unref, watch } from 'vue'

const props = defineProps<MarkerClustererOptions>()

const emit = defineEmits<{
  (e: 'clusteringbegin'): void
  (e: 'clusteringend'): void
  (e: 'click'): void
}>()

const map = inject(mapSymbol, ref())
const api = inject(apiSymbol, ref())
const markerClusterer = ref<MarkerClusterer>()

const markerClustererEvents = Object.values(MarkerClustererEvents)

provide(markerClustererSymbol, markerClusterer)

onMounted(() => {
  watch(map, () => {
    if (map.value)
      markerClusterer.value = markRaw(new MarkerClusterer({ ...unref(props), map: map.value }))

    markerClustererEvents.forEach((event: any) => {
      markerClusterer.value?.addListener(event, () => emit(event))
    })

    markerClusterer.value?.render()
  }, {
    immediate: true,
  })
})

onBeforeUnmount(() => {
  if (markerClusterer.value) {
    api.value?.event.clearInstanceListeners(markerClusterer.value)
    markerClusterer.value.clearMarkers()
  }
})

defineExpose({
  markerClusterer,
})
</script>

<template>
  <div class="marker-clusterer">
    <slot />
  </div>
</template>
