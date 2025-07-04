<script lang="ts">
import type { MarkerEmits, MarkerEmitType, MarkerOptions, UseMarkerReturn } from '@voomap/core'
import { createContext, isTextVNode, isVNodeEmpty } from '@voomap/shared'
import { injectGoogleMapContext } from '../GoogleMap/index.vue'

interface MarkerContext extends UseMarkerReturn {}

export const [injectMarkerContext, provideMarkerContext]
= createContext<MarkerContext>('Marker')

export type { MarkerEmits, MarkerEmitType, MarkerOptions }
</script>

<script setup lang="ts">
import { useMarker } from '@voomap/core'
import { computed, useSlots } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MarkerOptions>(), {
  anchorPoint: undefined,
  animation: null,
  clickable: true,
  collisionBehavior: null,
  crossOnDrag: true,
  cursor: 'pointer',
  draggable: false,
  icon: undefined,
  label: null,
  map: undefined,
  opacity: 1,
  optimized: undefined,
  shape: undefined,
  visible: true,
  zIndex: undefined,
})

defineEmits<MarkerEmits>()

const googleMapContext = injectGoogleMapContext()

const slots = useSlots()
const title = computed(() =>
  slots.default && !isVNodeEmpty(slots.default?.()) && slots.default?.().length === 1 && isTextVNode(slots.default?.()[0])
    ? (slots.default()[0]).children!.toString().trim()
    : props.title,
)

const options = computed(() => ({
  ...props,
  title: title.value,
}))

const { marker } = useMarker(googleMapContext.maps, googleMapContext.map, options)

defineExpose({
  marker,
})

provideMarkerContext({
  marker,
})
</script>

<template>
  <slot />
</template>
