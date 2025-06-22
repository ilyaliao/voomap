# 開始使用

## 安裝

在您的 Vue 3 專案中安裝 Voomap：

::: code-group

```sh [npm]
npm install --save @voomap/map
```

```sh [pnpm]
pnpm add @voomap/map
```

```sh [yarn]
yarn add @voomap/map
```

```sh [bun]
bun add @voomap/map
```

:::

您也可以安裝核心套件以僅使用組合式函數：

::: code-group

```sh [npm]
npm install --save @voomap/core
```

```sh [pnpm]
pnpm add @voomap/core
```

```sh [yarn]
yarn add @voomap/core
```

```sh [bun]
bun add @voomap/core
```

:::

:::tip TypeScript 支援
為了獲得最佳的開發體驗，我們建議安裝 Google Maps 類型定義：

```sh
npm install --save-dev @types/google.maps
```
:::

## 先決條件

### Vue 版本

Voomap 需要 **Vue 3.3** 或更高版本。請確保您的專案符合此要求：

```json [package.json]
{
  "dependencies": {
    "vue": "^3.3.0"
  }
}
```

### Google Maps API 金鑰

您需要 Google Maps API 金鑰才能使用 Voomap。如果您還沒有金鑰：

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 建立新專案或選擇現有專案
3. 啟用 **Maps JavaScript API**
4. 建立憑證以取得您的 API 金鑰
5. （可選）為了安全性，限制您的 API 金鑰

詳細說明請參閱[官方指南](https://developers.google.com/maps/documentation/javascript/get-api-key)。

## 使用方法

Voomap 提供兩種將 Google Maps 整合到您的 Vue 應用程式中的方式：

### 1. 組件方式 (`@voomap/map`)

適合快速設置和宣告式使用。適合大多數使用情況。

### 2. 組合式函數方式 (`@voomap/core`)

提供最大的靈活性和程式化控制。適合複雜的應用程式。

## 組件方式

### 您的第一個地圖

這是使用組件的最小範例：

```vue [App.vue]
<script setup lang="ts">
import { GoogleMap } from '@voomap/map'
import { ref } from 'vue'

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env
const zoom = ref(10)
</script>

<template>
  <div style="width: 100vw; height: 100dvh">
    <GoogleMap
      :api-key="VITE_GOOGLE_MAP_API_KEY"
      :zoom="zoom"
      @zoom-changed="zoom = $event"
    />
  </div>
</template>
```

### 添加標記

使用插槽添加具有自訂內容的標記：

```vue [App.vue]
<script setup lang="ts">
import { GoogleMap, Marker } from '@voomap/map'
import { ref } from 'vue'

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env
const zoom = ref(10)
</script>

<template>
  <div style="width: 100vw; height: 100dvh">
    <GoogleMap
      :api-key="VITE_GOOGLE_MAP_API_KEY"
      :zoom="zoom"
      @zoom-changed="zoom = $event"
    >
      <Marker :position="{ lat: 25.0855388, lng: 121.4791004 }">
        你好，我是標記
      </Marker>
    </GoogleMap>
  </div>
</template>
```

### 互動控制

添加控制項來與地圖互動：

```vue [App.vue]
<script setup lang="ts">
import { GoogleMap, Marker } from '@voomap/map'
import { ref } from 'vue'

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env
const zoom = ref(10)

function zoomIn() {
  zoom.value++
}

function zoomOut() {
  zoom.value--
}
</script>

<template>
  <div style="position: absolute; top: 0; left: 0; z-index: 1000">
    <button @click="zoomIn">
      放大
    </button>
    <button @click="zoomOut">
      縮小
    </button>
  </div>

  <div style="width: 100vw; height: 100dvh">
    <GoogleMap
      :api-key="VITE_GOOGLE_MAP_API_KEY"
      :zoom="zoom"
      @zoom-changed="zoom = $event"
    >
      <Marker :position="{ lat: 25.0855388, lng: 121.4791004 }">
        你好，我是標記
      </Marker>
    </GoogleMap>
  </div>
</template>
```

## 組合式函數方式

### 基本地圖設置

若要獲得最大控制權，請使用組合式函數方式：

```vue [App.vue]
<script setup lang="ts">
import { useGoogleMap } from '@voomap/core'
import { reactive, shallowRef, useTemplateRef } from 'vue'

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env

const el = useTemplateRef('el')

const options = reactive({
  zoom: 10,
  center: { lat: 25.0855388, lng: 121.4791004 },
})

const { maps, map } = useGoogleMap(
  VITE_GOOGLE_MAP_API_KEY,
  el,
  options,
)
</script>

<template>
  <div ref="el" style="width: 100vw; height: 100dvh" />
</template>
```

### 添加標記和資訊視窗

結合多個組合式函數以獲得豐富的功能：

```vue [App.vue]
<script setup lang="ts">
import { useGoogleMap, useInfoWindow, useMarker } from '@voomap/core'
import { reactive, shallowRef, useTemplateRef, watch } from 'vue'

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env

const el = useTemplateRef('el')

const options = reactive({
  zoom: 10,
  center: { lat: 25.0855388, lng: 121.4791004 },
})

const { maps, map } = useGoogleMap(
  VITE_GOOGLE_MAP_API_KEY,
  el,
  options,
)

const currentMarker = shallowRef<google.maps.Marker>()

const { marker } = useMarker(
  maps,
  map,
  {
    title: 'marker1',
    position: { lat: 25.0337, lng: 121.5636 },
  },
)

watch(marker, (newMarker) => {
  if (newMarker) {
    currentMarker.value = newMarker
  }
}, { once: true })

useInfoWindow(
  maps,
  map,
  {
    position: { lat: 25.0337, lng: 121.5636 },
  },
  currentMarker,
)

function zoomIn() {
  if (options.zoom)
    options.zoom++
}

function zoomOut() {
  if (options.zoom)
    options.zoom--
}
</script>

<template>
  <div style="position: absolute; top: 0; left: 0; z-index: 1000">
    <button @click="zoomIn">
      放大
    </button>
    <button @click="zoomOut">
      縮小
    </button>
  </div>

  <div ref="el" style="width: 100vw; height: 100dvh" />
</template>
```

:::warning API 金鑰安全性
永遠不要將您的 API 金鑰提交到版本控制！請改用環境變數。建立一個 `.env.local` 檔案：

```env
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```
:::

## 下一步

現在您已經有了一個基本的地圖，您可以：

- 探索[組件參考](../reference/components/google-map.md)以了解所有可用的屬性和事件
- 查看[組合式函數](../reference/composables/use-google-map.md)以進行程式化控制
