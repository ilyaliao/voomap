<script setup lang="ts">
import type {
  FullscreenControlOptions,
  IconMouseEvent,
  LatLng,
  LatLngLiteral,
  Map,
  MapMouseEvent,
  MapRestriction,
  MapTypeControlOptions,
  MapTypeStyle,
  PanControlOptions,
  RotateControlOptions,
  ScaleControlOptions,
  StreetViewControlOptions,
  StreetViewPanorama,
  ZoomControlOptions,
} from '@/types'
import { hasChanged, transformCenter } from '@/utlis'
import { mapEvents } from '@/utlis/events'
import { taiwanRestriction } from '@/utlis/mapUtlis'
import { apiSymbol, mapSymbol } from '@/utlis/symbol'
import { useMap } from '@voomap/core'
import { computed, markRaw, onBeforeUnmount, onMounted, provide, reactive, ref, toRef, unref, watch } from 'vue'

interface CofMap {
  cGoogle: typeof google | undefined
  cApi: typeof google.maps | undefined
  cMap: Map | undefined
}

// FIXME: Cannot use betterDefine, need detailed testing.
interface MapOptions {
  backgroundColor?: string
  center?: LatLng | null | LatLngLiteral
  clickableIcons?: boolean
  controlSize?: number
  disableDefaultUI?: boolean
  disableDoubleClickZoom?: boolean
  draggable?: boolean
  draggableCursor?: string
  draggingCursor?: string
  fullscreenControl?: boolean
  fullscreenControlOptions?: FullscreenControlOptions | null
  gestureHandling?: string
  heading?: number
  isFractionalZoomEnabled?: boolean
  keyboardShortcuts?: boolean
  mapId?: string
  mapTypeControl?: boolean
  mapTypeControlOptions?: MapTypeControlOptions | null
  mapTypeId?: string
  maxZoom?: number
  minZoom?: number
  noClear?: boolean
  panControl?: boolean
  panControlOptions?: PanControlOptions
  restriction?: MapRestriction
  rotateControl?: boolean
  rotateControlOptions?: RotateControlOptions
  scaleControl?: boolean
  scaleControlOptions?: ScaleControlOptions
  scrollwheel?: boolean
  streetView?: StreetViewPanorama
  streetViewControl?: boolean
  streetViewControlOptions?: StreetViewControlOptions
  styles?: MapTypeStyle[]
  tilt?: number
  zoom?: number
  zoomControl?: boolean
  zoomControlOptions?: ZoomControlOptions
  language?: string
}

interface Props extends MapOptions {
  apiKey: string
  inTaiwan?: boolean
}

const props = withDefaults(defineProps<Props>(), {
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
})

const emit = defineEmits<{
  (e: 'bounds_changed'): void
  (e: 'center_changed'): void
  (e: 'click', event: MapMouseEvent | IconMouseEvent): void
  (e: 'contextmenu', event: MapMouseEvent): void
  (e: 'dblclick', event: MapMouseEvent): void
  (e: 'drag'): void
  (e: 'dragend'): void
  (e: 'dragstart'): void
  (e: 'heading_changed'): void
  (e: 'idle'): void
  (e: 'isfractionalzoomenabled_changed'): void
  (e: 'mapcapabilities_changed'): void
  (e: 'maptypeid_changed'): void
  (e: 'mousemove', event: MapMouseEvent): void
  (e: 'mouseout', event: MapMouseEvent): void
  (e: 'mouseover', event: MapMouseEvent): void
  (e: 'projection_changed'): void
  (e: 'renderingtype_changed'): void
  (e: 'tilesloaded'): void
  (e: 'tilt_changed'): void
  (e: 'zoom_changed'): void
  (e: 'rightclick'): void
}>()

const mapRef = ref<HTMLElement>()
const cofMap: CofMap = reactive({
  cGoogle: undefined,
  cApi: undefined,
  cMap: undefined,
})

provide(apiSymbol, toRef(() => cofMap.cApi))
provide(mapSymbol, toRef(() => cofMap.cMap))

const getMapOption = computed<MapOptions>(() => {
  const {

    apiKey,
    inTaiwan,
    restriction,
    disableDefaultUI,
    zoomControl,
    mapTypeControl,
    scaleControl,
    streetViewControl,
    rotateControl,
    fullscreenControl,
    ...mapOptions
  } = unref(props)

  const mapRestriction = inTaiwan
    ? taiwanRestriction
    : restriction

  return {
    ...unref(mapOptions),
    restriction: mapRestriction,
    disableDefaultUI,
    zoomControl: disableDefaultUI ? false : zoomControl,
    mapTypeControl: disableDefaultUI ? false : mapTypeControl,
    scaleControl: disableDefaultUI ? false : scaleControl,
    streetViewControl: disableDefaultUI ? false : streetViewControl,
    rotateControl: disableDefaultUI ? false : rotateControl,
    fullscreenControl: disableDefaultUI ? false : fullscreenControl,
  }
})

async function initMap() {
  const { loader } = useMap(props.apiKey, props.language)
  cofMap.cGoogle = markRaw(await loader.load())
  cofMap.cApi = markRaw(cofMap.cGoogle.maps)

  if (mapRef.value)
    cofMap.cMap = markRaw(new cofMap.cApi.Map(mapRef.value, getMapOption.value))

  mapEvents.forEach((event: any) => {
    cofMap.cMap?.addListener(event, (e: any) => emit(event, e))
  })

  watch(
    [() => unref(props.center), () => props.zoom],
    ([center, zoom], [_oldCenter, oldZoom]) => {
      const oldCenter = transformCenter(cofMap.cMap?.getCenter())

      if (zoom && zoom !== oldZoom)
        cofMap.cMap?.setZoom(zoom)

      if (center && hasChanged(center, oldCenter))
        cofMap.cMap?.panTo(center)

      // FIXME: setOptions
      // cofMap.cMap?.setOptions(getMapOption.value);
    },
    {
      deep: true,
    },
  )
}

onMounted(() => {
  initMap()
})

onBeforeUnmount(() => {
  if (cofMap.cMap)
    cofMap.cApi?.event.clearInstanceListeners(cofMap.cMap)
})

defineExpose({
  map: toRef(cofMap, 'cMap'),
})
</script>

<template>
  <div class="map-container">
    <div id="map" ref="mapRef" />
    <slot :map="cofMap.cMap" :api="cofMap.cApi" />
  </div>
</template>

<style scoped>
/* FIXME: error css */
.map-container,
#map {
  width: 100%;
  height: 100%;
  color: rgb(82, 82, 91);
}
</style>
