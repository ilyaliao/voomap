# Marker

`Marker` 組件在 Google Map 上顯示標記。

## 基本用法

```vue
<script setup lang="ts">
import { GoogleMap, Marker } from '@voomap/map'

const apiKey = 'YOUR_API_KEY'
const position = { lat: 25.0855388, lng: 121.4791004 }
</script>

<template>
  <GoogleMap :api-key="apiKey">
    <Marker :position="position" title="我的位置" />
  </GoogleMap>
</template>
```

## Props

支援所有標準的 [Google Maps Marker 選項](https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions) 作為 props：

### `position`

- **類型：** `google.maps.LatLngLiteral | google.maps.LatLng`
- **必填：** `true`

標記在地圖上的位置。

```vue
<Marker :position="{ lat: 25.0855388, lng: 121.4791004 }" />
```

### `title`

- **類型：** `string`
- **預設值：** `undefined`

標記的標題，懸停時顯示為工具提示。

```vue
<Marker title="台北 101" :position="position" />
```

### `icon`

- **類型：** `string | google.maps.Icon | google.maps.Symbol`
- **預設值：** `undefined`

標記的自訂圖示。

```vue
<!-- 字串 URL -->
<Marker 
  :position="position"
  icon="/custom-marker.png"
/>

<!-- Icon 物件 -->
<Marker 
  :position="position"
  :icon="{
    url: '/custom-marker.png',
    scaledSize: new google.maps.Size(40, 40)
  }"
/>
```

### `draggable`

- **類型：** `boolean`
- **預設值：** `false`

標記是否可以拖曳。

```vue
<Marker :position="position" :draggable="true" />
```

### `opacity`

- **類型：** `number`
- **預設值：** `1`

標記的不透明度（0.0 到 1.0）。

```vue
<Marker :position="position" :opacity="0.5" />
```

### `visible`

- **類型：** `boolean`
- **預設值：** `true`

標記是否可見。

```vue
<Marker :position="position" :visible="isVisible" />
```

### `zIndex`

- **類型：** `number`
- **預設值：** `undefined`

標記的 z-index。

### `clickable`

- **類型：** `boolean`
- **預設值：** `true`

標記是否回應滑鼠事件。

### `cursor`

- **類型：** `string`
- **預設值：** `'pointer'`

懸停在標記上時顯示的游標。

### `label`

- **類型：** `string | google.maps.MarkerLabel`
- **預設值：** `undefined`

要在標記上顯示的標籤。

```vue
<!-- 簡單字串標籤 -->
<Marker :position="position" label="A" />

<!-- 標籤物件 -->
<Marker 
  :position="position"
  :label="{
    text: 'A',
    color: 'white',
    fontSize: '16px'
  }"
/>
```

### `animation`

- **類型：** `google.maps.Animation`
- **預設值：** `undefined`

標記的動畫。選項：`google.maps.Animation.DROP`、`google.maps.Animation.BOUNCE`。

```vue
<Marker 
  :position="position"
  :animation="google.maps.Animation.DROP"
/>
```

## 事件

組件會發出所有標準的 [Google Maps Marker 事件](https://developers.google.com/maps/documentation/javascript/reference/marker#Marker-Events)：

### `@click`

當標記被點擊時觸發。

- **參數：** `(event: google.maps.MapMouseEvent)`

```vue
<Marker @click="handleMarkerClick" />
```

### `@dblclick`

當標記被雙擊時觸發。

- **參數：** `(event: google.maps.MapMouseEvent)`

### `@drag`

當使用者拖曳標記時重複觸發。

- **參數：** `(event: google.maps.MapMouseEvent)`

### `@dragend`

當使用者停止拖曳標記時觸發。

- **參數：** `(event: google.maps.MapMouseEvent)`

### `@dragstart`

當使用者開始拖曳標記時觸發。

- **參數：** `(event: google.maps.MapMouseEvent)`

### `@mousedown`

當標記上發生 mousedown 事件時觸發。

- **參數：** `(event: google.maps.MapMouseEvent)`

### `@mouseout`

當滑鼠離開標記時觸發。

- **參數：** `(event: google.maps.MapMouseEvent)`

### `@mouseover`

當滑鼠進入標記時觸發。

- **參數：** `(event: google.maps.MapMouseEvent)`

### `@mouseup`

當標記上發生 mouseup 事件時觸發。

- **參數：** `(event: google.maps.MapMouseEvent)`

### `@rightclick`

當標記上發生右鍵點擊事件時觸發。

- **參數：** `(event: google.maps.MapMouseEvent)`

### 變更事件

當屬性變更時會觸發以下事件：

- `@animation-changed`
- `@clickable-changed`
- `@cursor-changed`
- `@draggable-changed`
- `@flat-changed`
- `@icon-changed`
- `@position-changed`
- `@shape-changed`
- `@title-changed`
- `@visible-changed`
- `@zindex-changed`

## 公開屬性

### `marker`

- **類型：** `google.maps.Marker`

Google Maps Marker 實例。

```vue
<script setup>
import { ref, onMounted } from 'vue'

const markerRef = ref()

onMounted(() => {
  // 存取標記實例
  const marker = markerRef.value.marker
  
  // 使用任何 Google Maps Marker 方法
  marker.setAnimation(google.maps.Animation.BOUNCE)
})
</script>

<template>
  <Marker ref="markerRef" :position="position" />
</template>
```

## 插槽

### 預設插槽

預設插槽可用於使用文字內容設定標記標題。這提供了一種更符合 Vue 風格的方式來設定標題，而不是使用 `title` 屬性。

```vue
<Marker :position="position">
  你好，我是標記
</Marker>
```

注意：如果同時提供預設插槽和 `title` 屬性，預設插槽會優先使用。

## 完整範例

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { GoogleMap, Marker } from '@voomap/map'

const markers = reactive([
  { 
    id: 1,
    position: { lat: 25.0855388, lng: 121.4791004 },
    title: '台北 101'
  },
  { 
    id: 2,
    position: { lat: 25.0375167, lng: 121.5637 },
    title: '國立故宮博物院'
  }
])

const selectedMarker = ref(null)

function handleMarkerClick(marker, event) {
  selectedMarker.value = marker
  console.log('點擊標記:', marker.title)
}

function handleDragEnd(marker, event) {
  console.log('新位置:', event.latLng.toJSON())
  marker.position = event.latLng.toJSON()
}
</script>

<template>
  <GoogleMap
    :api-key="API_KEY"
    :center="{ lat: 25.0855388, lng: 121.4791004 }"
    :zoom="12"
  >
    <Marker
      v-for="marker in markers"
      :key="marker.id"
      :position="marker.position"
      :title="marker.title"
      :draggable="true"
      :animation="selectedMarker?.id === marker.id 
        ? google.maps.Animation.BOUNCE 
        : null"
      @click="(e) => handleMarkerClick(marker, e)"
      @dragend="(e) => handleDragEnd(marker, e)"
    />
  </GoogleMap>
</template>
``` 
