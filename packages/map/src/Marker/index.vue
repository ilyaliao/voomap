<script lang="ts">
import type { MarkerEmits, MarkerEmitType, MarkerOptions } from '@voomap/core'
import { injectGoogleMapContext } from '../GoogleMap/index.vue'

export type { MarkerEmits, MarkerEmitType, MarkerOptions }
</script>

<script setup lang="ts">
import { useMarker } from '@voomap/core'
import { isTextVNode, isVNodeEmpty } from '@voomap/shared'
import { computed, useSlots } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<MarkerOptions>(),
  {
    opacity: 1,
    visible: true,
  },
)

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
</script>

<template>
  <slot />
</template>
