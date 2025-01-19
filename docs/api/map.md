# Map

`Map` is the core of the entire Google Map, and all map elements must be built upon it.

## Usage

The following code excerpt demonstrates a basic usage example:

```vue
<script setup lang="ts">
import { GoogleMap } from '@voomap/map'
import { reactive } from 'vue'

const center = reactive<google.maps.LatLngLiteral>({
  lat: 25.0855388,
  lng: 121.4791004
})
</script>

<template>
  <GoogleMap
    :api-key="YOUR_GOOGLE_MAPS_API_KEY"
    :center="center"
    :zoom="11"
  />
</template>
```

## Params

### apiKey (Required)

The source of everything, please remember to [apply for it](https://developers.google.com/maps/documentation/javascript/get-api-key)！

- Type `string`
- Default: `undefined`

### inTaiwan

Limit the map scope of Google Maps. Once this feature is enabled, you will be unable to move beyond areas outside of **Taiwan**.

- Type `boolean`
- Default `false`

::: info
Currently, the coordinates for Taiwan are hardcoded, and in the future, we may consider incorporating a national database or expanding access to additional regions.
:::

### MapOptions

`Map` supports all native parameters, and you can find detailed explanations [here](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions).

- Type `google.maps.MapOptions`

  <details>
    <summary>
      Show Type Detail
    </summary>

  ```ts
  interface MapOptions {
    backgroundColor?: string
    center?: LatLng | null | LatLngLiteral
    clickableIcons?: boolean
    controlSize?: number
    disableDefaultUI?: boolean
    disableDoubleClickZoom?: boolean
    draggable?: boolean
    draggableCursor?: string
    draggingCursor?: string
    fullscreenControl?: boolean
    fullscreenControlOptions?: FullscreenControlOptions | null
    gestureHandling?: string
    heading?: number
    isFractionalZoomEnabled?: boolean
    keyboardShortcuts?: boolean
    mapId?: string
    mapTypeControl?: boolean
    mapTypeControlOptions?: MapTypeControlOptions | null
    mapTypeId?: string
    maxZoom?: number
    minZoom?: number
    noClear?: boolean
    panControl?: boolean
    panControlOptions?: PanControlOptions
    restriction?: MapRestriction
    rotateControl?: boolean
    rotateControlOptions?: RotateControlOptions
    scaleControl?: boolean
    scaleControlOptions?: ScaleControlOptions
    scrollwheel?: boolean
    streetView?: StreetViewPanorama
    streetViewControl?: boolean
    streetViewControlOptions?: StreetViewControlOptions
    styles?: MapTypeStyle[]
    tilt?: number
    zoom?: number
    zoomControl?: boolean
    zoomControlOptions?: ZoomControlOptions
    language?: string
  }
  ```

  </details>

- Example

```vue
<script setup lang="ts">
import { GoogleMap } from '@voomap/map'
import { reactive } from 'vue'

const center = reactive<google.maps.LatLngLiteral>({
  lat: 25.0855388,
  lng: 121.4791004
})
</script>

<template>
  <GoogleMap
    :api-key="YOUR_GOOGLE_MAPS_API_KEY"
    :center="center"
    :zoom="11"
    :max-zoom="20"
    :min-zoom="10"
    language="zh-TW
  />
</template>
```

::: warning Important
When passing in `MapOptions`, please avoid directly passing in an `Object`. Instead, use [v-bind](https://vuejs.org/guide/components/props.html#prop-passing-details).
:::

## Events

The `Map` supports event listeners for all native events. You can find detailed explanations [here](https://developers.google.com/maps/documentation/javascript/reference/map#Map-Events).

- Example

```vue
<script setup lang="ts">
import { GoogleMap } from '@voomap/map'
import { reactive } from 'vue'

const center = reactive<google.maps.LatLngLiteral>({
  lat: 25.0855388,
  lng: 121.4791004
})

function handleClick(e: google.maps.MapMouseEvent) {
  console.log('click', e.latLng)
}
</script>

<template>
  <GoogleMap
    :api-key="YOUR_GOOGLE_MAPS_API_KEY"
    :center="center"
    :zoom="11"
    :max-zoom="20"
    :min-zoom="10"
    @click="handleClick"
    @dblclick="handleClick"
  />
</template>
```

## Expose

If you want to further manipulate the `Map`, you can use the public instance of the component. please refer to the [official documentation](https://developers.google.com/maps/documentation/javascript/reference/map#Map-Methods).

### map

- Type `google.maps.Map`

- Example

```vue
<script setup lang="ts">
import { GoogleMap } from '@voomap/map'
import { reactive, ref } from 'vue'

const center = reactive<google.maps.LatLngLiteral>({
  lat: 25.0855388,
  lng: 121.4791004
})

const mapRef = ref<InstanceType<typeof GoogleMap>>()

function handleClick() {
  console.log(mapRef.value?.map.getCenter())
}
</script>

<template>
  <GoogleMap
    ref="mapRef"
    :api-key="YOUR_GOOGLE_MAPS_API_KEY"
    :center="center"
    :zoom="11"
    :max-zoom="20"
    :min-zoom="10"
    @click="handleClick"
  />
</template>
```

## Automatic updates

The `Map` listens to the props you provide. When you pass in `center` and `zoom`, the map will automatically update.

::: warning Important
This feature is currently under experimentation and may potentially result in incorrect map displays.
:::
