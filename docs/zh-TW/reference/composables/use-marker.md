# useMarker

`useMarker` 組合式函數提供程式化方式來建立和管理 Google Maps 標記。

## 基本使用

```typescript
import { useGoogleMap, useMarker } from '@voomap/core'
import { ref } from 'vue'

const mapElement = ref<HTMLElement>()
const { maps, map } = useGoogleMap('YOUR_API_KEY', mapElement)

// 建立標記
const { marker } = useMarker(maps, map, {
  position: { lat: 25.0855388, lng: 121.4791004 },
  title: '我的標記',
  draggable: true
})

// 標記現在已顯示在地圖上
```

## 類型定義

```typescript
function useMarker(
  maps: ShallowRef<typeof globalThis.google.maps | undefined>,
  map: ShallowRef<google.maps.Map | undefined>,
  options: MaybeRefOrGetter<google.maps.MarkerOptions>,
  emit?: ComponentInternalInstance['emit']
): UseMarkerReturn

interface UseMarkerReturn {
  marker: ShallowRef<google.maps.Marker | undefined>
}
```

## 參數

### `maps`

- **類型：** `ShallowRef<typeof google.maps | undefined>`
- **必填：** `true`

Google Maps API 命名空間的引用。

### `map`

- **類型：** `ShallowRef<google.maps.Map | undefined>`
- **必填：** `true`

將放置標記的 Google Maps 實例引用。

### `options`

- **類型：** `MaybeRefOrGetter<google.maps.MarkerOptions>`
- **必填：** `true`

標記配置選項。支援所有標準 Google Maps 標記選項。

### `emit`

- **類型：** `ComponentInternalInstance['emit']`
- **預設值：** `getCurrentInstance()?.emit`

Vue 組件的 emit 函數，用於事件處理。

## 返回值

### `marker`

- **類型：** `ShallowRef<google.maps.Marker | undefined>`

Google Maps Marker 實例。在標記建立之前會是 `undefined`。

## 功能

### 響應式選項

組合式函數會監聽選項的變化並自動更新標記：

```typescript
const position = ref({ lat: 25.0855388, lng: 121.4791004 })
const draggable = ref(false)

const { marker } = useMarker(maps, map, {
  position: position.value,
  draggable: draggable.value
})

// 當這些值改變時，標記會自動更新
position.value = { lat: 25.033, lng: 121.565 }
draggable.value = true
```

### 事件處理

當與 emit 一起使用時，組合式函數會自動將 Google Maps 標記事件綁定到 Vue 事件：

```typescript
// 在您的組件中
const emit = defineEmits<{
  'click': [event: google.maps.MapMouseEvent]
  'dragend': [event: google.maps.MapMouseEvent]
  'position-changed': []
  // ... 所有其他 Google Maps 標記事件
}>()

const { marker } = useMarker(maps, map, options, emit)
```

### 清理

組合式函數會在組件卸載時自動從地圖中移除標記並清理資源。

## 範例：動態標記管理

```vue
<script setup lang="ts">
import { useGoogleMap, useMarker } from '@voomap/core'
import { ref, reactive, computed } from 'vue'

const mapElement = ref<HTMLElement>()
const { maps, map } = useGoogleMap('YOUR_API_KEY', mapElement)

const markers = reactive([
  { id: 1, lat: 25.0855388, lng: 121.4791004, title: '台北 101' },
  { id: 2, lat: 25.0375167, lng: 121.5637, title: '故宮博物院' }
])

const markerInstances = computed(() => 
  markers.map(markerData => {
    const { marker } = useMarker(maps, map, {
      position: { lat: markerData.lat, lng: markerData.lng },
      title: markerData.title,
      draggable: true
    })
    return { ...markerData, marker }
  })
)

function addMarker(lat: number, lng: number, title: string) {
  const id = Math.max(...markers.map(m => m.id)) + 1
  markers.push({ id, lat, lng, title })
}

function removeMarker(id: number) {
  const index = markers.findIndex(m => m.id === id)
  if (index > -1) {
    markers.splice(index, 1)
  }
}
</script>

<template>
  <div>
    <div ref="mapElement" style="height: 400px;" />
    <button @click="addMarker(25.047, 121.517, '新標記')">
      新增標記
    </button>
  </div>
</template>
```

## 範例：自訂標記與事件

```vue
<script setup lang="ts">
import { useGoogleMap, useMarker } from '@voomap/core'
import { ref } from 'vue'

const mapElement = ref<HTMLElement>()
const { maps, map } = useGoogleMap('YOUR_API_KEY', mapElement)

const markerPosition = ref({ lat: 25.0855388, lng: 121.4791004 })

const emit = defineEmits<{
  'marker-click': [position: google.maps.LatLngLiteral]
  'marker-moved': [newPosition: google.maps.LatLngLiteral]
}>()

const { marker } = useMarker(maps, map, {
  position: markerPosition,
  draggable: true,
  title: '可拖曳標記',
  icon: {
    url: '/custom-marker.png',
    scaledSize: new google.maps.Size(40, 40)
  }
}, emit)

function handleMarkerClick(event: google.maps.MapMouseEvent) {
  const position = event.latLng?.toJSON()
  if (position) {
    emit('marker-click', position)
  }
}

function handleMarkerMoved(event: google.maps.MapMouseEvent) {
  const newPosition = event.latLng?.toJSON()
  if (newPosition) {
    markerPosition.value = newPosition
    emit('marker-moved', newPosition)
  }
}
</script>

<template>
  <div 
    ref="mapElement" 
    style="height: 400px;"
    @marker-click="handleMarkerClick"
    @marker-moved="handleMarkerMoved"
  />
</template>
``` 
