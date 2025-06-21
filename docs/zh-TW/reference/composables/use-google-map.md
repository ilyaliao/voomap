# useGoogleMap

`useGoogleMap` 組合式函數提供程式化方式存取 Google Maps 實例和 API。

## 基本使用

```typescript
import { useGoogleMap } from '@voomap/core'
import { ref } from 'vue'

const mapElement = ref<HTMLElement>()
const { google, maps, map } = useGoogleMap(
  'YOUR_API_KEY',
  mapElement,
  {
    center: { lat: 25.0855388, lng: 121.4791004 },
    zoom: 11
  }
)
```

## 類型定義

```typescript
function useGoogleMap(
  apiKey: string,
  target: MaybeComputedElementRef,
  defaultOptions?: MaybeRefOrGetter<MapOptions>,
  emit?: ComponentInternalInstance['emit']
): UseGoogleMapReturn

interface UseGoogleMapReturn {
  google: ShallowRef<typeof globalThis.google | undefined>
  maps: ShallowRef<typeof globalThis.google.maps | undefined>
  map: ShallowRef<google.maps.Map | undefined>
}

interface MapOptions extends google.maps.MapOptions {
  language?: string
}
```

## 參數

### `apiKey`

- **類型：** `string`
- **必填：** `true`

您的 Google Maps API 金鑰。

### `target`

- **類型：** `MaybeComputedElementRef`
- **必填：** `true`

地圖將渲染的 HTML 元素。可以是 ref、computed 或 getter 函數。

### `defaultOptions`

- **類型：** `MaybeRefOrGetter<MapOptions>`
- **預設值：** `{}`

地圖配置選項。支援所有標準 Google Maps 選項，另外還有 `language` 選項。

### `emit`

- **類型：** `ComponentInternalInstance['emit']`
- **預設值：** `getCurrentInstance()?.emit`

Vue 組件的 emit 函數，用於事件處理。如果未提供，會自動使用當前組件的 emit。

## 返回值

### `google`

- **類型：** `ShallowRef<typeof globalThis.google | undefined>`

全域 Google 命名空間的引用。在 Google Maps API 載入之前會是 `undefined`。

### `maps`

- **類型：** `ShallowRef<typeof globalThis.google.maps | undefined>`

Google Maps API 命名空間的引用。

### `map`

- **類型：** `ShallowRef<google.maps.Map | undefined>`

Google Maps 實例。在地圖初始化之前會是 `undefined`。

## 功能

### 響應式選項

組合式函數會監聽選項的變化並自動更新地圖：

```typescript
const zoom = ref(11)
const center = ref({ lat: 25.0855388, lng: 121.4791004 })

const { map } = useGoogleMap(apiKey, mapElement, {
  zoom: zoom.value,
  center: center.value
})

// 當這些值改變時，地圖會自動更新
zoom.value = 15
center.value = { lat: 25.033, lng: 121.565 }
```

### 事件處理

組合式函數會自動將 Google Maps 事件綁定到 Vue 事件：

```typescript
// 在您的組件中
const emit = defineEmits<{
  'bounds-changed': []
  'center-changed': [lat: number, lng: number]
  'click': [event: google.maps.MapMouseEvent]
  'zoom-changed': [zoom: number]
  // ... 所有其他 Google Maps 事件
}>()

const { map } = useGoogleMap(apiKey, mapElement, options, emit)
```

### 清理

組合式函數會在組件卸載時自動清理事件監聽器。

## 範例：自訂地圖控制

```vue
<script setup lang="ts">
import { useGoogleMap } from '@voomap/core'
import { onMounted, ref } from 'vue'

const mapElement = ref<HTMLElement>()
const apiKey = 'YOUR_API_KEY'

const { google, maps, map } = useGoogleMap(apiKey, mapElement, {
  center: { lat: 25.0855388, lng: 121.4791004 },
  zoom: 11,
  disableDefaultUI: true
})

onMounted(() => {
  // 等待地圖準備就緒
  watchEffect(() => {
    if (!map.value || !maps.value)
      return

    // 添加自訂控制
    const controlDiv = document.createElement('div')
    const control = new CustomControl(controlDiv, map.value)

    controlDiv.index = 1
    map.value.controls[maps.value.ControlPosition.TOP_RIGHT].push(controlDiv)
  })
})

function CustomControl(controlDiv: HTMLElement, map: google.maps.Map) {
  const controlUI = document.createElement('div')
  controlUI.style.backgroundColor = '#fff'
  controlUI.style.cursor = 'pointer'
  controlUI.style.padding = '10px'
  controlUI.textContent = '置中地圖'
  controlDiv.appendChild(controlUI)

  controlUI.addEventListener('click', () => {
    map.setCenter({ lat: 25.0855388, lng: 121.4791004 })
  })
}
</script>

<template>
  <div ref="mapElement" style="height: 400px;" />
</template>
```

## 範例：在地圖上繪圖

```vue
<script setup lang="ts">
import { useGoogleMap } from '@voomap/core'
import { ref, watchEffect } from 'vue'

const mapElement = ref<HTMLElement>()
const { maps, map } = useGoogleMap('YOUR_API_KEY', mapElement)

const drawingManager = ref<google.maps.drawing.DrawingManager>()

watchEffect(() => {
  if (!maps.value || !map.value)
    return

  drawingManager.value = new maps.value.drawing.DrawingManager({
    drawingMode: maps.value.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: maps.value.ControlPosition.TOP_CENTER,
      drawingModes: [
        maps.value.drawing.OverlayType.MARKER,
        maps.value.drawing.OverlayType.CIRCLE,
        maps.value.drawing.OverlayType.POLYGON,
        maps.value.drawing.OverlayType.POLYLINE,
        maps.value.drawing.OverlayType.RECTANGLE
      ]
    }
  })

  drawingManager.value.setMap(map.value)
})
</script>

<template>
  <div ref="mapElement" style="height: 400px;" />
</template>
```
