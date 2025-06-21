# useInfoWindow

`useInfoWindow` 組合式函數提供對 Google Maps InfoWindow 實例的程式化存取，用於在彈出視窗中顯示內容。

## 基本使用

```typescript
import { useGoogleMap, useMarker, useInfoWindow } from '@voomap/core'
import { ref } from 'vue'

const mapElement = ref<HTMLElement>()
const { maps, map } = useGoogleMap('YOUR_API_KEY', mapElement)

// 建立標記
const { marker } = useMarker(maps, map, {
  position: { lat: 25.0855388, lng: 121.4791004 },
  title: '我的標記'
})

// 建立附加到標記的 InfoWindow
const { infoWindow, open, close } = useInfoWindow(
  maps,
  map,
  {
    content: '<div><h3>你好世界！</h3><p>這是一個資訊視窗。</p></div>',
    position: { lat: 25.0855388, lng: 121.4791004 }
  },
  marker // 點擊標記時 InfoWindow 會開啟
)
```

## 類型定義

```typescript
function useInfoWindow(
  maps: ShallowRef<typeof globalThis.google.maps | undefined>,
  map: ShallowRef<google.maps.Map | undefined>,
  options: MaybeRefOrGetter<google.maps.InfoWindowOptions>,
  marker?: MaybeRefOrGetter<google.maps.Marker | undefined>,
  emit?: ComponentInternalInstance['emit']
): UseInfoWindowReturn

interface UseInfoWindowReturn {
  infoWindow: ShallowRef<google.maps.InfoWindow | undefined>
  open: (
    options?: google.maps.InfoWindowOpenOptions | null | google.maps.Map | google.maps.StreetViewPanorama,
    anchor?: google.maps.MVCObject | null | google.maps.marker.AdvancedMarkerElement
  ) => void
  close: () => void
}
```

## 參數

### `maps`

- **類型：** `ShallowRef<typeof globalThis.google.maps | undefined>`
- **必需：** `true`

對 Google Maps API 命名空間的引用，通常從 `useGoogleMap` 返回。

### `map`

- **類型：** `ShallowRef<google.maps.Map | undefined>`
- **必需：** `true`

對 Google Maps 實例的引用，通常從 `useGoogleMap` 返回。

### `options`

- **類型：** `MaybeRefOrGetter<google.maps.InfoWindowOptions>`
- **必需：** `true`

InfoWindow 配置選項。支援所有標準的 Google Maps InfoWindow 選項。

### `marker`

- **類型：** `MaybeRefOrGetter<google.maps.Marker | undefined>`
- **預設：** `undefined`

可選的標記，用於與 InfoWindow 關聯。當提供時，InfoWindow 會在點擊標記時自動開啟。

### `emit`

- **類型：** `ComponentInternalInstance['emit']`
- **預設：** `getCurrentInstance()?.emit`

Vue 組件的 emit 函數，用於事件處理。

## 返回值

### `infoWindow`

- **類型：** `ShallowRef<google.maps.InfoWindow | undefined>`

InfoWindow 實例。在 InfoWindow 創建之前將為 `undefined`。

### `open`

- **類型：** `(
  options?: google.maps.InfoWindowOpenOptions | null | google.maps.Map | google.maps.StreetViewPanorama,
  anchor?: google.maps.MVCObject | null | google.maps.marker.AdvancedMarkerElement
) => void`

開啟 InfoWindow 的函數。

### `close`

- **類型：** `() => void`

關閉 InfoWindow 的函數。

## 特性

### 自動標記整合

當提供標記時，InfoWindow 會自動：
- 在點擊標記時開啟
- 當標記標題變更時更新內容
- 相對於標記定位

### 事件處理

組合式函數會自動將 InfoWindow 事件綁定到 Vue 事件：

```typescript
// 在您的組件中
const emit = defineEmits<{
  'close': []
  'closeclick': []
  'content-changed': []
  'domready': []
  'position-changed': []
  // ... 所有其他 InfoWindow 事件
}>()
```

### 內容管理

InfoWindow 內容可以是動態和反應式的：

```typescript
const content = ref('<h3>初始內容</h3>')

const { infoWindow } = useInfoWindow(maps, map, {
  content: content.value
})

// 動態更新內容
content.value = '<h3>更新後的內容</h3>'
```

## 範例：基本 InfoWindow

```vue
<script setup lang="ts">
import { useGoogleMap, useInfoWindow } from '@voomap/core'
import { ref } from 'vue'

const mapElement = ref<HTMLElement>()
const { maps, map } = useGoogleMap('YOUR_API_KEY', mapElement)

const { infoWindow, open, close } = useInfoWindow(maps, map, {
  content: `
    <div style="padding: 10px;">
      <h3>歡迎來到台北！</h3>
      <p>這是台灣的首都城市。</p>
    </div>
  `,
  position: { lat: 25.0855388, lng: 121.4791004 }
})

// 2 秒後開啟 InfoWindow
setTimeout(() => {
  open()
}, 2000)
</script>

<template>
  <div>
    <button @click="open">開啟 InfoWindow</button>
    <button @click="close">關閉 InfoWindow</button>
    <div ref="mapElement" style="height: 400px;" />
  </div>
</template>
```

## 範例：帶標記的 InfoWindow

```vue
<script setup lang="ts">
import { useGoogleMap, useMarker, useInfoWindow } from '@voomap/core'
import { ref, watchOnce } from 'vue'

const mapElement = ref<HTMLElement>()
const { maps, map } = useGoogleMap('YOUR_API_KEY', mapElement)

const currentMarker = ref<google.maps.Marker>()

const { marker } = useMarker(maps, map, {
  position: { lat: 25.0855388, lng: 121.4791004 },
  title: '點擊我！'
})

watchOnce(marker, () => {
  currentMarker.value = marker.value
})

const { infoWindow } = useInfoWindow(
  maps,
  map,
  {
    content: `
      <div style="padding: 15px; max-width: 300px;">
        <h3>標記資訊</h3>
        <p>當您點擊標記時，此 InfoWindow 會開啟。</p>
        <button onclick="alert('來自 InfoWindow 的問候！')">點擊我</button>
      </div>
    `
  },
  currentMarker
)
</script>

<template>
  <div ref="mapElement" style="height: 400px;" />
</template>
```

## 範例：動態內容

```vue
<script setup lang="ts">
import { useGoogleMap, useMarker, useInfoWindow } from '@voomap/core'
import { ref, computed, watchOnce } from 'vue'

const mapElement = ref<HTMLElement>()
const { maps, map } = useGoogleMap('YOUR_API_KEY', mapElement)

const markerTitle = ref('動態標記')
const timestamp = ref(new Date().toLocaleTimeString())

const { marker } = useMarker(maps, map, {
  position: { lat: 25.0855388, lng: 121.4791004 },
  title: markerTitle.value
})

const currentMarker = ref<google.maps.Marker>()
watchOnce(marker, () => {
  currentMarker.value = marker.value
})

const content = computed(() => `
  <div style="padding: 15px;">
    <h3>${markerTitle.value}</h3>
    <p>最後更新：${timestamp.value}</p>
  </div>
`)

const { infoWindow } = useInfoWindow(
  maps,
  map,
  { content: content.value },
  currentMarker
)

function updateContent() {
  timestamp.value = new Date().toLocaleTimeString()
  markerTitle.value = `更新於 ${timestamp.value}`
}
</script>

<template>
  <div>
    <button @click="updateContent">更新內容</button>
    <div ref="mapElement" style="height: 400px;" />
  </div>
</template>
``` 
