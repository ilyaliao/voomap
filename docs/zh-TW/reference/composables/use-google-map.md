# useGoogleMap

`useGoogleMap` composable 提供對 Google Maps 實例和 API 的程式化存取。

## 基本用法

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

- **`apiKey`**：您的 Google Maps API 金鑰
- **`target`**：地圖將渲染的 HTML 元素
- **`defaultOptions`**：地圖配置選項。支援所有 [Google Maps MapOptions](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions) 加上 `language`
- **`emit`**：Vue 元件的 emit 函式，用於事件處理（可選）

## 回傳值

- **`google`**：對全域 Google 命名空間的參考
- **`maps`**：對 Google Maps API 命名空間的參考
- **`map`**：Google Maps 實例
