# Marker

`Marker` 元件在 Google 地圖上顯示標記。

## 基本用法

```vue
<script setup lang="ts">
import { GoogleMap, Marker } from '@voomap/map'

const apiKey = 'YOUR_API_KEY'
const position = { lat: 25.0855388, lng: 121.4791004 }
</script>

<template>
  <GoogleMap :api-key="apiKey">
    <Marker :position="position" title="My Location" />
  </GoogleMap>
</template>
```

## Props

支援所有標準的 [Google Maps MarkerOptions](https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions) 作為 props。標記的內容可以透過預設插槽或 `title` prop 來設定。

## 事件

該元件會發出所有標準的 [Google Maps Marker 事件](https://developers.google.com/maps/documentation/javascript/reference/marker#Marker-Events)。只需為所需的事件在元件上添加事件監聽器即可。

## 插槽

預設插槽可以用來透過文字內容設定標記標題。這提供了一種更類似 Vue 的方式來設定標題，而不是使用 `title` prop。

```vue
<Marker :position="position">
  Hello I'm Marker
</Marker>
```

::: tip NOTE
如果同時提供預設插槽和 `title` prop，預設插槽優先。
:::

## 完整範例

```vue
<script setup lang="ts">
import { GoogleMap, Marker } from '@voomap/map'
import { reactive } from 'vue'

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env

const markers = reactive([
  {
    id: 1,
    position: { lat: 25.0855388, lng: 121.4791004 },
    title: '台北 101',
  },
  {
    id: 2,
    position: { lat: 25.0375167, lng: 121.5637 },
    title: '國立故宮博物院',
  },
])

function handleMarkerClick(event: google.maps.MapMouseEvent) {
  console.log('Clicked marker:', event.latLng?.toJSON())
}

function handleDragEnd(event: google.maps.MapMouseEvent) {
  console.log('New position:', event.latLng?.toJSON())
}
</script>

<template>
  <GoogleMap
    style="width: 100vw; height: 100dvh"
    :api-key="VITE_GOOGLE_MAP_API_KEY"
    :zoom="10"
    :center="{ lat: 25.0855388, lng: 121.4791004 }"
  >
    <Marker
      v-for="marker in markers"
      :key="marker.id"
      :position="marker.position"
      :title="marker.title"
      :draggable="true"
      @click="(e) => handleMarkerClick(e)"
      @dragend="(e) => handleDragEnd(e)"
    />
  </GoogleMap>
</template>
```
