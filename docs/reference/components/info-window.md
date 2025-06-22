# InfoWindow

The `InfoWindow` component displays an information window on the Google Map.

## Basic Usage

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
        Welcome to Taipei!
      </InfoWindow>
    </Marker>
  </GoogleMap>
</template>
```

## Standalone Usage

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

All standard [Google Maps InfoWindowOptions](https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindowOptions) are supported as props. The InfoWindow's content can be set via the default slot or the `content` prop.

## Events

The component emits all standard [Google Maps InfoWindow events](https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindow-Events). Simply add event listeners to the component for the events you need.

## Slots

The default slot provides the content for the InfoWindow.

```vue
<InfoWindow>
  Custom content
</InfoWindow>
```

::: tip NOTE
The default slot takes precedence over the `content` prop.
:::

## Usage with Marker

When placed inside a `Marker` component, the InfoWindow automatically:

- Opens when the marker is clicked
- Uses the marker's position if no position is specified
- Updates when the marker's title changes (if no custom content is provided)

```vue
<Marker :position="position" title="My Marker">
  <InfoWindow>
    <!-- Custom content here -->
  </InfoWindow>
</Marker>
```

## Full Example

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

## Example: Multiple InfoWindows

```vue
<script setup lang="ts">
import { GoogleMap, InfoWindow, Marker } from '@voomap/map'

const apiKey = 'YOUR_API_KEY'

const locations = [
  {
    id: 1,
    position: { lat: 25.0855388, lng: 121.4791004 },
    title: 'Taipei 101',
    info: 'Famous skyscraper in Taipei'
  },
  {
    id: 2,
    position: { lat: 25.0375167, lng: 121.5637 },
    title: 'National Palace Museum',
    info: 'World-class museum of Chinese artifacts'
  },
]
</script>

<template>
  <GoogleMap :api-key="apiKey">
    <Marker
      v-for="location in locations"
      :key="location.id"
      :position="location.position"
      :title="location.title"
    >
      <InfoWindow>
        <div style="padding: 10px;">
          <h4>{{ location.title }}</h4>
          <p>{{ location.info }}</p>
        </div>
      </InfoWindow>
    </Marker>
  </GoogleMap>
</template>
```

## Advanced Usage

### Custom Styling

```vue
<InfoWindow>
  <div class="custom-info-window">
    <div class="header">
      <h3>Custom Styled Window</h3>
    </div>
    <div class="content">
      <p>This InfoWindow has custom styling.</p>
    </div>
  </div>
</InfoWindow>

<style scoped>
.custom-info-window {
  font-family: Arial, sans-serif;
  max-width: 300px;
}

.header {
  background: #4285f4;
  color: white;
  padding: 10px;
  margin: -10px -10px 10px -10px;
  border-radius: 4px 4px 0 0;
}

.header h3 {
  margin: 0;
  font-size: 16px;
}

.content {
  padding: 0 10px 10px 10px;
}
</style>
```

## API Reference

For complete API documentation, see the [useInfoWindow](/reference/composables/use-info-window) composable that powers this component.
