# Getting Started

## Installation

Install Voomap in your Vue 3 project:

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

You can also install the core package for composable-only usage:

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

:::tip TypeScript Support
For the best development experience, we recommend installing Google Maps type definitions:

```sh
npm install --save-dev @types/google.maps
```
:::

## Prerequisites

### Vue Version

Voomap requires **Vue 3.3** or higher. Make sure your project meets this requirement:

```json [package.json]
{
  "dependencies": {
    "vue": "^3.3.0"
  }
}
```

### Google Maps API Key

You'll need a Google Maps API key to use Voomap. If you don't have one:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Maps JavaScript API**
4. Create credentials to get your API key
5. (Optional) Restrict your API key for security

For detailed instructions, see the [official guide](https://developers.google.com/maps/documentation/javascript/get-api-key).

## Usage Approaches

Voomap provides two ways to integrate Google Maps into your Vue application:

### 1. Component Approach (`@voomap/map`)

Perfect for quick setup and declarative usage. Ideal for most use cases.

### 2. Composable Approach (`@voomap/core`)

Provides maximum flexibility and programmatic control. Great for complex applications.

## Component Approach

### Your First Map

Here's a minimal example using components:

```vue [App.vue]
<script setup lang="ts">
import { GoogleMap } from "@voomap/map"
import { ref } from "vue"

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

### Adding Markers

Add markers with custom content using slots:

```vue [App.vue]
<script setup lang="ts">
import { GoogleMap, Marker } from "@voomap/map"
import { ref } from "vue"

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
        Hello I'm Marker
      </Marker>
    </GoogleMap>
  </div>
</template>
```

### Interactive Controls

Add controls to interact with your map:

```vue [App.vue]
<script setup lang="ts">
import { GoogleMap, Marker } from "@voomap/map"
import { ref } from "vue"

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
    <button @click="zoomIn">Zoom In</button>
    <button @click="zoomOut">Zoom Out</button>
  </div>
  
  <div style="width: 100vw; height: 100dvh">
    <GoogleMap
      :api-key="VITE_GOOGLE_MAP_API_KEY"
      :zoom="zoom"
      @zoom-changed="zoom = $event"
    >
      <Marker :position="{ lat: 25.0855388, lng: 121.4791004 }">
        Hello I'm Marker
      </Marker>
    </GoogleMap>
  </div>
</template>
```

## Composable Approach

### Basic Map Setup

For maximum control, use the composable approach:

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

### Adding Markers and InfoWindows

Combine multiple composables for rich functionality:

```vue [App.vue]
<script setup lang="ts">
import { useGoogleMap, useInfoWindow, useMarker } from '@voomap/core'
import { watchOnce } from '@vueuse/core'
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

const currentMarker = shallowRef<google.maps.Marker>()

const { marker } = useMarker(
  maps,
  map,
  {
    title: 'marker1',
    position: { lat: 25.0337, lng: 121.5636 },
  },
)

watchOnce(marker, () => {
  currentMarker.value = marker.value
})

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
    <button @click="zoomIn">Zoom In</button>
    <button @click="zoomOut">Zoom Out</button>
  </div>
  
  <div ref="el" style="width: 100vw; height: 100dvh" />
</template>
```

:::warning API Key Security
Never commit your API key to version control! Use environment variables instead. Create a `.env.local` file:

```env
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```
:::

## Next Steps

Now that you have a basic map working, you can:

- Explore the [Components Reference](../reference/components/google-map.md) to learn about all available props and events
- Check out the [Composables](../reference/composables/use-google-map.md) for programmatic control
