<script lang="ts">
import type { InfoWindowEmits, InfoWindowEmitType, InfoWindowOptions } from '@voomap/core'
import { injectGoogleMapContext } from '../GoogleMap/index.vue'
import { injectMarkerContext } from '../Marker/index.vue'

export type { InfoWindowEmits, InfoWindowEmitType }
</script>

<script setup lang="ts">
import { useInfoWindow } from '@voomap/core'
import { isTextVNode, isVNodeEmpty } from '@voomap/shared'
import { computed, useSlots } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<InfoWindowOptions>(),
  {
    content: '',
  },
)

defineEmits<InfoWindowEmits>()

const googleMapContext = injectGoogleMapContext()
const markerContext = injectMarkerContext()

const slots = useSlots()

const content = computed(() =>
  slots.default && !isVNodeEmpty(slots.default?.()) && slots.default?.().length === 1 && isTextVNode(slots.default?.()[0])
    ? (slots.default()[0]).children!.toString().trim()
    : props.content,
)

const infoWindowOptions = computed(() => ({
  ...props,
  content: content.value,
}))

const { infoWindow, open, close } = useInfoWindow(
  googleMapContext.maps,
  googleMapContext.map,
  infoWindowOptions,
  markerContext.marker,
)

defineExpose({
  infoWindow,
  open,
  close,
})
</script>

<template>
  <slot />
</template>
