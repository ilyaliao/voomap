# Marker

The `Marker` component displays a marker on the Google Map.

## Basic Usage

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

All standard [Google Maps Marker options](https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions) are supported as props:

### `position`

- **Type:** `google.maps.LatLngLiteral | google.maps.LatLng`
- **Required:** `true`

The position of the marker on the map.

```vue
<Marker :position="{ lat: 25.0855388, lng: 121.4791004 }" />
```

### `title`

- **Type:** `string`
- **Default:** `undefined`

The title of the marker, displayed as a tooltip on hover.

```vue
<Marker title="Taipei 101" :position="position" />
```

### `icon`

- **Type:** `string | google.maps.Icon | google.maps.Symbol`
- **Default:** `undefined`

Custom icon for the marker.

```vue
<!-- String URL -->
<Marker 
  :position="position"
  icon="/custom-marker.png"
/>

<!-- Icon object -->
<Marker 
  :position="position"
  :icon="{
    url: '/custom-marker.png',
    scaledSize: new google.maps.Size(40, 40)
  }"
/>
```

### `draggable`

- **Type:** `boolean`
- **Default:** `false`

Whether the marker can be dragged.

```vue
<Marker :position="position" :draggable="true" />
```

### `opacity`

- **Type:** `number`
- **Default:** `1`

The opacity of the marker (0.0 to 1.0).

```vue
<Marker :position="position" :opacity="0.5" />
```

### `visible`

- **Type:** `boolean`
- **Default:** `true`

Whether the marker is visible.

```vue
<Marker :position="position" :visible="isVisible" />
```

### `zIndex`

- **Type:** `number`
- **Default:** `undefined`

The z-index of the marker.

### `clickable`

- **Type:** `boolean`
- **Default:** `true`

Whether the marker responds to mouse events.

### `cursor`

- **Type:** `string`
- **Default:** `'pointer'`

The cursor to display when hovering over the marker.

### `label`

- **Type:** `string | google.maps.MarkerLabel`
- **Default:** `undefined`

Label to display on the marker.

```vue
<!-- Simple string label -->
<Marker :position="position" label="A" />

<!-- Label object -->
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

- **Type:** `google.maps.Animation`
- **Default:** `undefined`

Animation for the marker. Options: `google.maps.Animation.DROP`, `google.maps.Animation.BOUNCE`.

```vue
<Marker 
  :position="position"
  :animation="google.maps.Animation.DROP"
/>
```

## Events

The component emits all standard [Google Maps Marker events](https://developers.google.com/maps/documentation/javascript/reference/marker#Marker-Events):

### `@click`

Fired when the marker is clicked.

- **Arguments:** `(event: google.maps.MapMouseEvent)`

```vue
<Marker @click="handleMarkerClick" />
```

### `@dblclick`

Fired when the marker is double-clicked.

- **Arguments:** `(event: google.maps.MapMouseEvent)`

### `@drag`

Fired repeatedly while the user drags the marker.

- **Arguments:** `(event: google.maps.MapMouseEvent)`

### `@dragend`

Fired when the user stops dragging the marker.

- **Arguments:** `(event: google.maps.MapMouseEvent)`

### `@dragstart`

Fired when the user starts dragging the marker.

- **Arguments:** `(event: google.maps.MapMouseEvent)`

### `@mousedown`

Fired for a mousedown event on the marker.

- **Arguments:** `(event: google.maps.MapMouseEvent)`

### `@mouseout`

Fired when the mouse leaves the marker.

- **Arguments:** `(event: google.maps.MapMouseEvent)`

### `@mouseover`

Fired when the mouse enters the marker.

- **Arguments:** `(event: google.maps.MapMouseEvent)`

### `@mouseup`

Fired for a mouseup event on the marker.

- **Arguments:** `(event: google.maps.MapMouseEvent)`

### `@rightclick`

Fired for a right-click event on the marker.

- **Arguments:** `(event: google.maps.MapMouseEvent)`

### Change Events

The following events are fired when properties change:

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

## Exposed Properties

### `marker`

- **Type:** `google.maps.Marker`

The Google Maps Marker instance.

```vue
<script setup>
import { ref, onMounted } from 'vue'

const markerRef = ref()

onMounted(() => {
  // Access the marker instance
  const marker = markerRef.value.marker
  
  // Use any Google Maps Marker method
  marker.setAnimation(google.maps.Animation.BOUNCE)
})
</script>

<template>
  <Marker ref="markerRef" :position="position" />
</template>
```

## Slots

### Default Slot

The default slot can be used to set the marker title using text content. This provides a more Vue-like way to set the title instead of using the `title` prop.

```vue
<Marker :position="position">
  Hello I'm Marker
</Marker>
```

Note: If both the default slot and the `title` prop are provided, the default slot takes precedence.

## Full Example

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { GoogleMap, Marker } from '@voomap/map'

const markers = reactive([
  { 
    id: 1,
    position: { lat: 25.0855388, lng: 121.4791004 },
    title: 'Taipei 101'
  },
  { 
    id: 2,
    position: { lat: 25.0375167, lng: 121.5637 },
    title: 'National Palace Museum'
  }
])

const selectedMarker = ref(null)

function handleMarkerClick(marker, event) {
  selectedMarker.value = marker
  console.log('Clicked marker:', marker.title)
}

function handleDragEnd(marker, event) {
  console.log('New position:', event.latLng.toJSON())
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
