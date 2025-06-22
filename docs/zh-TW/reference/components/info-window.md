# InfoWindow

`InfoWindow` 元件在 Google 地圖上顯示資訊視窗。

## 基本用法

```vue
<script setup lang="ts">
import { GoogleMap, InfoWindow, Marker } from '@voomap/map'

const apiKey = 'YOUR_API_KEY'
const position = { lat: 25.0855388, lng: 121.4791004 }
</script>

<template>
  <GoogleMap :api-key="apiKey">
    <Marker :position="position" title="My Location">
      <InfoWindow>
        歡迎來到台北！
      </InfoWindow>
    </Marker>
  </GoogleMap>
</template>
```

## 獨立使用

```vue
<script setup lang="ts">
import { GoogleMap, InfoWindow } from '@voomap/map'

const apiKey = 'YOUR_API_KEY'
const position = { lat: 25.0855388, lng: 121.4791004 }
</script>

<template>
  <GoogleMap :api-key="apiKey">
    <InfoWindow
      :position="position"
      content="Hello World!"
    />
  </GoogleMap>
</template>
```

## Props

支援所有標準的 [Google Maps InfoWindowOptions](https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindowOptions) 作為 props。InfoWindow 的內容可以透過預設插槽或 `content` prop 來設定。

## 事件

該元件會發出所有標準的 [Google Maps InfoWindow 事件](https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindow-Events)。只需為所需的事件在元件上添加事件監聽器即可。

## 插槽

預設插槽提供 InfoWindow 的內容。

```vue
<InfoWindow>
  自定義內容
</InfoWindow>
```

::: tip NOTE
預設插槽會優先於 `content` prop。
:::

## 與 Marker 一起使用

當放置在 `Marker` 元件內時，InfoWindow 會自動：

- 當標記被點擊時開啟
- 如果未指定位置，則使用標記的位置
- 當標記的標題更改時更新（如果未提供自定義內容）

```vue
<Marker :position="position" title="My Marker">
  <InfoWindow>
    <!-- 自定義內容在這裡 -->
  </InfoWindow>
</Marker>
```

## 完整範例

```vue
<script setup lang="ts">
import { GoogleMap, InfoWindow, Marker } from '@voomap/map'

const apiKey = 'YOUR_API_KEY'
const position = { lat: 25.0855388, lng: 121.4791004 }

function handleClose() {
  console.log('InfoWindow closed')
}
</script>

<template>
  <GoogleMap :api-key="apiKey">
    <Marker :position="position">
      <InfoWindow @close="handleClose">
        Hello Google Map
      </InfoWindow>
    </Marker>
  </GoogleMap>
</template>
```
