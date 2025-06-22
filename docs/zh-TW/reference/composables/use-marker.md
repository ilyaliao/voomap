# useMarker

`useMarker` composable 提供程式化存取來建立和管理 Google Maps 標記。

## 基本用法

```typescript
import { useGoogleMap, useMarker } from '@voomap/core'
import { ref } from 'vue'

const mapElement = ref<HTMLElement>()
const { maps, map } = useGoogleMap('YOUR_API_KEY', mapElement)

// 建立一個標記
const { marker } = useMarker(maps, map, {
  position: { lat: 25.0855388, lng: 121.4791004 },
  title: 'My Marker',
  draggable: true
})

// 標記現在顯示在地圖上
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

- **`maps`**：對 Google Maps API 命名空間的參考
- **`map`**：對 Google Maps 實例的參考
- **`options`**：標記配置。支援所有 [Google Maps MarkerOptions](https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions)
- **`emit`**：Vue 元件的 emit 函式，用於事件處理（可選）

## 回傳值

- **`marker`**：Google Maps Marker 實例
