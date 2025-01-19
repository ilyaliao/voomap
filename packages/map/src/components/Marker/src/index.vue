<script setup lang="ts">
import type { Icon, LatLng, LatLngLiteral, MapMouseEvent, MarkerLabel, MarkerShape, Point } from '@/types'
import type { Ref } from 'vue'
import { useMap } from '@/composables/index'
import { markerEvents } from '@/utlis/events'
import { markerSymbol } from '@/utlis/symbol'
import { provide, ref } from 'vue'

// FIXME: Cannot use betterDefine, need detailed testing.
interface MarkerOptions {
  anchorPoint?: Point
  animation?: Animation
  clickable?: boolean
  collisionBehavior?: string
  crossOnDrag?: boolean
  cursor?: string
  draggable?: boolean
  icon?: string | Icon | null | symbol
  label?: string | MarkerLabel
  opacity?: number
  optimized?: boolean
  position?: LatLng | null | LatLngLiteral
  shape?: MarkerShape
  title?: string
  visible?: boolean
  zIndex?: number
}

// NOTE: not support import props
const props = withDefaults(defineProps<MarkerOptions>(), {
  clickable: true,
  crossOnDrag: true,
  cousor: 'pointer',
  draggable: false,
  visible: true,
})

const emit = defineEmits<{
  (e: 'animation_changed'): void
  (e: 'click', event: MapMouseEvent): void
  (e: 'clickable_changed'): void
  (e: 'contextmenu', event: MapMouseEvent): void
  (e: 'cursor_changed'): void
  (e: 'dblclick', event: MapMouseEvent): void
  (e: 'drag', event: MapMouseEvent): void
  (e: 'dragend', event: MapMouseEvent): void
  (e: 'draggable_changed'): void
  (e: 'dragstart', event: MapMouseEvent): void
  (e: 'flat_changed'): void
  (e: 'icon_changed'): void
  (e: 'mousedown', event: MapMouseEvent): void
  (e: 'mouseout', event: MapMouseEvent): void
  (e: 'mouseover', event: MapMouseEvent): void
  (e: 'mouseup', event: MapMouseEvent): void
  (e: 'position_changed'): void
  (e: 'shape_changed'): void
  (e: 'title_changed'): void
  (e: 'visible_changed'): void
  (e: 'zindex_changed'): void
  (e: 'rightclick'): void
}>()

const marker = useMap('Marker', markerEvents, ref(props) as Ref<google.maps.MarkerOptions>, emit as any)

provide(markerSymbol, marker)

defineExpose({
  marker,
})
</script>

<template>
  <div class="marker">
    <slot />
  </div>
</template>
