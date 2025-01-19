<script setup lang="ts">
import type { InfoWindow, InfoWindowOpenOptions, InfoWindowOptions } from '@/types'
import { infoWindowEvents, type MarkerEvent } from '@/utlis/events'
import { apiSymbol, mapSymbol, markerSymbol } from '@/utlis/symbol'
import { inject, markRaw, onBeforeMount, onMounted, ref, unref, useSlots, watch } from 'vue'

interface Props extends InfoWindowOptions {
  initialState?: boolean
  openEvent?: MarkerEvent[number]
  closeEvent?: MarkerEvent[number]
}

const props = withDefaults(defineProps<Props>(), {
  openEvent: 'click',
})

const emit = defineEmits<{
  (e: 'closeclick'): void
  (e: 'content_changed'): void
  (e: 'domready'): void
  (e: 'position_changed'): void
  (e: 'visible'): void
  (e: 'zindex_changed'): void
}>()

const infoWindow = ref<InfoWindow>()
const infoWindowRef = ref<HTMLElement>()

const map = inject(mapSymbol, ref())
const api = inject(apiSymbol, ref())
const marker = inject(markerSymbol, ref())

const hasSlotDefault = !!useSlots().default

function open(opts?: InfoWindowOpenOptions) {
  return infoWindow.value?.open({ map: map.value, anchor: marker.value, ...opts })
}

function close() {
  infoWindow.value?.close()
}

onMounted(() => {
  watch(map, () => {
    if (map.value && api.value) {
      if (infoWindow.value) {
        infoWindow.value.setOptions({
          ...unref(props),
          content: hasSlotDefault ? infoWindowRef.value : props.content ? props.content : marker.value ? marker.value.getTitle() : '',
        })
      }
      else {
        infoWindow.value = markRaw(
          new api.value.InfoWindow({
            ...unref(props),
            content: hasSlotDefault ? infoWindowRef.value : props.content ? props.content : marker.value ? marker.value.getTitle() : '',
          }),
        )

        if (marker.value) {
          if (props.openEvent)
            marker.value.addListener(props.openEvent, open)

          if (props.closeEvent)
            marker.value.addListener(props.closeEvent, close)
        }

        if (!marker.value || props.initialState)
          open()

        infoWindowEvents.forEach((event: any) => {
          infoWindow.value?.addListener(event, () => emit(event))
        })
      }
    }
  }, {
    immediate: true,
  })
})

onBeforeMount(() => {
  if (infoWindow.value) {
    api.value?.event.clearInstanceListeners(infoWindow.value)
    close()
  }
})

defineExpose({
  infoWindow,
  open,
  close,
})
</script>

<template>
  <div v-if="hasSlotDefault" class="info-window-container">
    <div ref="infoWindowRef" v-bind="$attrs">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.info-window-container {
  display: none;
}
</style>
