# useInfoWindow

`useInfoWindow` composable 提供對 Google Maps InfoWindow 實例的程式化存取，用於在彈出視窗中顯示內容。

## 基本用法

```typescript
import { useGoogleMap, useInfoWindow, useMarker } from '@voomap/core'
import { ref } from 'vue'

const mapElement = ref<HTMLElement>()
const { maps, map } = useGoogleMap('YOUR_API_KEY', mapElement)

// 建立一個標記
const { marker } = useMarker(maps, map, {
  position: { lat: 25.0855388, lng: 121.4791004 },
  title: 'My Marker'
})

// 建立一個附加到標記的 InfoWindow
const { infoWindow, open, close } = useInfoWindow(
  maps,
  map,
  {
    content: '<div><h3>Hello World!</h3><p>這是一個資訊視窗。</p></div>',
    position: { lat: 25.0855388, lng: 121.4791004 }
  },
  marker // InfoWindow 將在標記被點擊時開啟
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

- **`maps`**：對 Google Maps API 命名空間的參考
- **`map`**：對 Google Maps 實例的參考
- **`options`**：InfoWindow 配置。支援所有 [Google Maps InfoWindowOptions](https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindowOptions)
- **`marker`**：要與 InfoWindow 關聯的可選標記（可選）
- **`emit`**：Vue 元件的 emit 函式，用於事件處理（可選）

## 回傳值

- **`infoWindow`**：InfoWindow 實例
- **`open`**：開啟 InfoWindow 的函式
- **`close`**：關閉 InfoWindow 的函式
