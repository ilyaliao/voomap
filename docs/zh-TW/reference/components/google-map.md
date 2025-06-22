# GoogleMap

`GoogleMap` 元件是在 Vue 應用程式中顯示 Google 地圖的主要容器。

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

### 必要 Props

#### `api-key`

- **類型：** `string`
- **必填：** `true`

您的 Google Maps API 金鑰。這是載入和顯示地圖所必需的。

```vue
<GoogleMap :api-key="YOUR_GOOGLE_MAPS_API_KEY" />
```

### 地圖選項

支援所有標準的 [Google Maps MapOptions](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions) 作為 props，以及用於 API 載入的額外 `language` 選項。

## 事件

該元件會發出所有標準的 [Google Maps 事件](https://developers.google.com/maps/documentation/javascript/reference/map#Map-Events)。只需為所需的事件在元件上添加事件監聽器即可。

## 插槽

預設插槽用於添加子元件，如 `Marker`、`InfoWindow` 等。

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
  console.log('Clicked at:', event.latLng?.toJSON())
}

function handleZoomChange(zoom: number) {
  console.log('Zoom changed to:', zoom)
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
