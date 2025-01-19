# InfoWindow

Use the `InfoWindow` to display content in a popup window on the map. It can also be used in conjunction with `Marker`.

## Usage

The following code excerpt demonstrates a basic usage example:

```vue
<script setup lang="ts">
import { GoogleMap, InfoWindow } from '@voomap/map'
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
    :zoom="12"
  >
    <InfoWindow
      content="I'm single qq"
      :position="center"
    />
  </GoogleMap>
</template>
```

### Use with `Marker`

```vue
<script setup lang="ts">
import { GoogleMap, InfoWindow, Marker } from '@voomap/map'
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
    :zoom="12"
  >
    <Marker
      title="I'm your first marker!"
      :position="center"
    >
      <InfoWindow />
    </Marker>
  </GoogleMap>
</template>
```

## Params

### initialState

This is initial state of the infoWinfow(open or close).

- Type `boolean`
- Default `false`

### openEvent

When used in conjunction with `Marker`, the event for opening the window.

- Type `MarkerEvent[number]`

  <details>
    <summary>
      Show Type Detail
    </summary>

  ```ts
  const markerEvents = [
    'animation_changed',
    'click',
    'clickable_changed',
    'contextmenu',
    'cursor_changed',
    'dblclick',
    'drag',
    'dragend',
    'draggable_changed',
    'dragstart',
    'flat_changed',
    'icon_changed',
    'mousedown',
    'mouseout',
    'mouseover',
    'mouseup',
    'position_changed',
    'shape_changed',
    'title_changed',
    'visible_changed',
    'zindex_changed',
    'rightclick'
  ] as const

  type MarkerEvent = typeof markerEvents
  ```

  </details>

- Default: `click`

### closeEvent

When used in conjunction with `Marker`, the event for closing the window.

- Type `MarkerEvent[number]`

  <details>
    <summary>
      Show Type Detail
    </summary>

  ```ts
  const markerEvents = [
    'animation_changed',
    'click',
    'clickable_changed',
    'contextmenu',
    'cursor_changed',
    'dblclick',
    'drag',
    'dragend',
    'draggable_changed',
    'dragstart',
    'flat_changed',
    'icon_changed',
    'mousedown',
    'mouseout',
    'mouseover',
    'mouseup',
    'position_changed',
    'shape_changed',
    'title_changed',
    'visible_changed',
    'zindex_changed',
    'rightclick'
  ] as const

  type MarkerEvent = typeof markerEvents
  ```

  </details>

- Default `undefined`

::: info
If used independently with `InfoWindow`, it defaults to being **open**.
:::

### InfoWindowOptions

`InfoWindow` supports all native parameters, and you can find detailed explanations [here](https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindowOptions).

- Type `google.maps.InfoWindowOptions`

  <details>
    <summary>
      Show Type Detail
    </summary>

  ```ts
  interface InfoWindowOptions {
    ariaLabel?: string
    content?: string | Element | Text
    disableAutoPan?: boolean
    maxWidth?: number
    minWidth?: number
    pixelOffset?: Size
    position?: LatLng | LatLngLiteral | null
    zIndex?: number
  }
  ```

  </details>

- Example

```vue
<script setup lang="ts">
import { GoogleMap, InfoWindow } from '@voomap/map'
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
    :zoom="12"
  >
    <InfoWindow
      content="I'm single qq"
      :position="center"
    />
  </GoogleMap>
</template>
```

::: warning Important
When passing in `InfoWindowOptions`, please avoid directly passing in an `Object`. Instead, use [v-bind](https://vuejs.org/guide/components/props.html#prop-passing-details).
:::

### Content

Content of the `InfoWindow`.

- Type `string | Element | Text`

1. String

```vue
<script setup lang="ts">
import { GoogleMap, InfoWindow } from '@voomap/map'
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
    :zoom="12"
  >
    <InfoWindow
      content="I'm single qq"
      :position="center"
    />
  </GoogleMap>
</template>
```

2. Element

```vue
<script setup lang="ts">
import { GoogleMap, InfoWindow } from '@voomap/map'
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
    :zoom="12"
  >
    <InfoWindow :position="center">
      <div style="padding: 8px;">
        I'm element
      </div>
    </InfoWindow>
  </GoogleMap>
</template>
```

3. Default

```vue
<script setup lang="ts">
import { GoogleMap, InfoWindow, Marker } from '@voomap/map'
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
    :zoom="12"
  >
    <Marker
      title="I'm your first marker!"
      :position="center"
    >
      <InfoWindow
        open-event="mouseover"
        close-event="mouseout"
      />
    </Marker>
  </GoogleMap>
</template>
```

::: info
When `InfoWindow` is used in conjunction with `Marker`, if content is not provided, the default value is set to the **Marker Title**.
:::

## Events

The `InfoWindow` supports event listeners for all native events. You can find detailed explanations [here](https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindow-Events)

- Example

```vue
<script setup lang="ts">
import { GoogleMap, InfoWindow } from '@voomap/map'
import { reactive } from 'vue'

const center = reactive<google.maps.LatLngLiteral>({
  lat: 25.0855388,
  lng: 121.4791004
})

function handleCloseClick() {
  console.log('close')
}
</script>

<template>
  <GoogleMap
    :api-key="VITE_GOOGLE_MAP_API_KEY"
    :center="center"
    :zoom="12"
  >
    <InfoWindow
      content="I'm single qq"
      :position="center"
      @closeclick="handleCloseClick"
    />
  </GoogleMap>
</template>
```

## Expose

If you want to further manipulate the `InfoWindow`, you can use the public instance of the component. For functionality, please refer to the [official documentation](https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindow-Methods).

### infoWindow

- Type `google.maps.InfoWindow`

- Example

```vue
<script setup lang="ts">
import { GoogleMap, InfoWindow } from '@voomap/map'
import { reactive, ref } from 'vue'

const infoWindowRef = ref<InstanceType<typeof InfoWindow>>()

const center = reactive<google.maps.LatLngLiteral>({
  lat: 25.0855388,
  lng: 121.4791004
})

function handleCloseClick() {
  console.log(infoWindowRef.value.infoWindow.getContent())
}
</script>

<template>
  <GoogleMap
    :api-key="VITE_GOOGLE_MAP_API_KEY"
    :center="center"
    :zoom="12"
  >
    <InfoWindow
      ref="infoWindowRef"
      content="I'm single qq"
      :position="center"
      @closeclick="handleCloseClick"
    />
  </GoogleMap>
</template>
```

### open

Opens this `InfoWindow` on the map.

- Type

  ```ts
  function open(opts?: InfoWindowOpenOptions): void | undefined
  ```

### close

Closes this `InfoWindow` on the map.

- Type

  ```ts
  function close(): void
  ```

## Automatic updates

When **dynamically passing parameters**, the `infoWindow` will automatically determine whether an instance already exists to decide whether to **update** or **create** a new one.
