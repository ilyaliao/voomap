# GoogleMap

`GoogleMap` 組件是在您的 Vue 應用程式中顯示 Google Maps 的主要容器。

## 基本用法

```vue
<script setup lang="ts">
import { GoogleMap } from '@voomap/map'

const apiKey = 'YOUR_API_KEY'
</script>

<template>
  <GoogleMap
    :api-key="apiKey"
    :center="{ lat: 25.0855388, lng: 121.4791004 }"
    :zoom="11"
    style="width: 100%; height: 400px;"
  />
</template>
```

## Props

### 必要屬性

#### `api-key`

- **類型：** `string`
- **必填：** `true`

您的 Google Maps API 金鑰。這是載入和顯示地圖所必需的。

```vue
<GoogleMap :api-key="YOUR_GOOGLE_MAPS_API_KEY" />
```

### 地圖選項

支援所有標準的 [Google Maps 選項](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions) 作為 props：

#### `center`

- **類型：** `google.maps.LatLngLiteral | google.maps.LatLng`
- **預設值：** `{ lat: 25.0855388, lng: 121.4791004 }`

地圖的初始中心位置。

```vue
<GoogleMap :center="{ lat: 37.7749, lng: -122.4194 }" />
```

#### `zoom`

- **類型：** `number`
- **預設值：** `11`

地圖的初始縮放層級。

```vue
<GoogleMap :zoom="15" />
```

#### `map-type-id`

- **類型：** `string`
- **預設值：** `'roadmap'`

要顯示的地圖類型。選項：`'roadmap'`、`'satellite'`、`'hybrid'`、`'terrain'`。

```vue
<GoogleMap :map-type-id="'satellite'" />
```

#### `clickable-icons`

- **類型：** `boolean`
- **預設值：** `true`

地圖圖示是否可點擊。

#### `disable-default-ui`

- **類型：** `boolean`
- **預設值：** `false`

停用所有預設 UI 按鈕。

#### `disable-double-click-zoom`

- **類型：** `boolean`
- **預設值：** `false`

停用雙擊縮放。

#### `draggable`

- **類型：** `boolean`
- **預設值：** `true`

地圖是否可拖曳。

#### `fullscreen-control`

- **類型：** `boolean`
- **預設值：** `true`

是否顯示全螢幕控制按鈕。

#### `gesture-handling`

- **類型：** `string`
- **預設值：** `'auto'`

地圖如何處理手勢。選項：`'cooperative'`、`'greedy'`、`'none'`、`'auto'`。

#### `max-zoom`

- **類型：** `number`
- **預設值：** `15`

地圖的最大縮放層級。

#### `min-zoom`

- **類型：** `number`
- **預設值：** `8`

地圖的最小縮放層級。

#### `scale-control`

- **類型：** `boolean`
- **預設值：** `true`

是否顯示比例尺控制。

#### `scrollwheel`

- **類型：** `boolean`
- **預設值：** `true`

是否允許使用滑鼠滾輪縮放。

#### `zoom-control`

- **類型：** `boolean`
- **預設值：** `true`

是否顯示縮放控制按鈕。

#### `language`

- **類型：** `string`
- **預設值：** `'en'`

地圖使用的語言。例如：`'zh-TW'`、`'ja'`、`'ko'`。

## 事件

組件會發出所有標準的 [Google Maps 事件](https://developers.google.com/maps/documentation/javascript/reference/map#Map-Events)：

### `@bounds-changed`

當視窗邊界改變時觸發。

```vue
<GoogleMap @bounds-changed="handleBoundsChange" />
```

### `@center-changed`

當地圖中心屬性改變時觸發。

- **參數：** `(lat: number, lng: number)`

```vue
<GoogleMap @center-changed="(lat, lng) => console.log(lat, lng)" />
```

### `@click`

當使用者點擊地圖時觸發。

- **參數：** `(event: google.maps.MapMouseEvent)`

```vue
<GoogleMap @click="handleMapClick" />
```

### `@dblclick`

當使用者雙擊地圖時觸發。

- **參數：** `(event: google.maps.MapMouseEvent)`

### `@drag`

當使用者拖曳地圖時重複觸發。

### `@dragend`

當使用者停止拖曳地圖時觸發。

### `@dragstart`

當使用者開始拖曳地圖時觸發。

### `@idle`

當地圖在平移或縮放後變為閒置狀態時觸發。

### `@mousemove`

當使用者的滑鼠在地圖上移動時觸發。

- **參數：** `(event: google.maps.MapMouseEvent)`

### `@mouseout`

當使用者的滑鼠離開地圖時觸發。

### `@mouseover`

當使用者的滑鼠進入地圖時觸發。

### `@zoom-changed`

當地圖縮放屬性改變時觸發。

- **參數：** `(zoom: number)`

```vue
<GoogleMap @zoom-changed="(zoom) => console.log('新的縮放層級:', zoom)" />
```

## 公開屬性

組件透過模板引用公開以下屬性：

### `google`

- **類型：** `typeof google`

全域 Google Maps 命名空間。

### `maps`

- **類型：** `typeof google.maps`

Google Maps API 命名空間。

### `map`

- **類型：** `google.maps.Map`

Google Maps 實例。

```vue
<script setup>
import { onMounted, ref } from 'vue'

const mapRef = ref()

onMounted(() => {
  // 存取地圖實例
  const map = mapRef.value.map

  // 使用任何 Google Maps API 方法
  map.panTo({ lat: 40.7128, lng: -74.0060 })
})
</script>

<template>
  <GoogleMap ref="mapRef" :api-key="API_KEY" />
</template>
```

## 插槽

### 預設插槽

預設插槽用於添加子組件，如 `Marker`、`InfoWindow` 等。

```vue
<GoogleMap :api-key="API_KEY">
  <Marker :position="markerPosition" />
  <InfoWindow :position="infoPosition" />
</GoogleMap>
```

## 完整範例

```vue
<script setup lang="ts">
import { GoogleMap, Marker } from '@voomap/map'
import { reactive, ref } from 'vue'

const center = reactive({
  lat: 25.0855388,
  lng: 121.4791004
})

const mapRef = ref()

function handleMapClick(event: google.maps.MapMouseEvent) {
  console.log('點擊位置:', event.latLng?.toJSON())
}

function handleZoomChange(zoom: number) {
  console.log('縮放改變為:', zoom)
}
</script>

<template>
  <GoogleMap
    ref="mapRef"
    :api-key="YOUR_API_KEY"
    :center="center"
    :zoom="12"
    :max-zoom="18"
    :min-zoom="5"
    map-type-id="roadmap"
    :clickable-icons="false"
    :fullscreen-control="true"
    language="zh-TW"
    @click="handleMapClick"
    @zoom-changed="handleZoomChange"
  >
    <Marker
      :position="center"
      title="台北 101"
    />
  </GoogleMap>
</template>
```
