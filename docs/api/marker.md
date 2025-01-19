# Marker

Use the `Marker` to place markers on the map.

## Usage

The following code excerpt demonstrates a basic usage example:

```vue
<script setup lang="ts">
import { GoogleMap, Marker } from '@voomap/map'
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
  >
    <Marker :position="center" />
  </GoogleMap>
</template>
```

## Params

### MarkerOptions

`Marker` supports all native parameters, and you can find detailed explanations [here](https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions).

- Type `google.maps.MarkerOptions`

  <details>
    <summary>
      Show Type Detail
    </summary>

  ```ts
  interface MarkerOptions {
    anchorPoint?: Point
    animation?: Animation
    clickable?: boolean
    collisionBehavior?: string
    crossOnDrag?: boolean
    cursor?: string
    draggable?: boolean
    icon?: string | Icon | null | symbol
    label?: string | MarkerLabel
    opacity?: number
    optimized?: boolean
    position?: LatLng | null | LatLngLiteral
    shape?: MarkerShape
    title?: string
    visible?: boolean
    zIndex?: number
  }
  ```

  </details>

- Example

```vue
<script setup lang="ts">
import { GoogleMap, Marker } from '@voomap/map'
import { reactive } from 'vue'

const center = reactive<google.maps.LatLngLiteral>({
  lat: 25.0855388,
  lng: 121.4791004
})
</script>

<template>
  <GoogleMap
    :api-key="VITE_GOOGLE_MAP_API_KEY"
    :center="center"
    :zoom="11"
  >
    <Marker
      title="I'm your first marker!"
      draggable
      :position="center"
    />
  </GoogleMap>
</template>
```

::: warning Important
When passing in `MarkerOptions`, please avoid directly passing in an `Object`. Instead, use [v-bind](https://vuejs.org/guide/components/props.html#prop-passing-details).
:::

## Events

The `Marker` supports event listeners for all native events. You can find detailed explanations [here](https://developers.google.com/maps/documentation/javascript/reference/marker#Marker-Events).

- Example

```vue
<script setup lang="ts">
import { GoogleMap, Marker } from '@voomap/map'
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
    :api-key="VITE_GOOGLE_MAP_API_KEY"
    :center="center"
    :zoom="11"
  >
    <Marker
      title="I'm your first marker!"
      draggable
      :position="center"
      @dblclick="handleClick"
    />
  </GoogleMap>
</template>
```

## Expose

If you want to further manipulate the `Marker`, you can use the public instance of the component. For functionality, please refer to the [official documentation](https://developers.google.com/maps/documentation/javascript/reference/marker#Marker-Methods).

### marker

- Type `google.maps.Marker`

- Example

```vue
<script setup lang="ts">
import { GoogleMap, Marker } from '@voomap/map'
import { reactive, ref } from 'vue'

const center = reactive<google.maps.LatLngLiteral>({
  lat: 25.0855388,
  lng: 121.4791004
})
const markerRef = ref<InstanceType<typeof Marker>>()

function handleClick() {
  console.log(markerRef.value?.marker.getTitle())
}
</script>

<template>
  <GoogleMap
    :api-key="VITE_GOOGLE_MAP_API_KEY"
    :center="center"
    :zoom="11"
  >
    <Marker
      ref="markerRef"
      title="I'm your first marker!"
      draggable
      :position="center"
      @dblclick="handleClick"
    />
  </GoogleMap>
</template>
```

## Automatic updates

When **dynamically passing parameters**, the `marker` will automatically determine whether an instance already exists to decide whether to **update** or **create** a new one.
