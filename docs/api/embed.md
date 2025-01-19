# Embed

Use `Embed` to embed `Google Maps`, which can be used to showcase a single location

> Before using this feature, you must enable the `Maps Embed API`

## Usage

The following code excerpt demonstrates a basic usage example:

```vue
<script setup lang="ts">
import { Embed } from '@voomap/map'
</script>

<template>
  <Embed
    :api-key="YOUR_GOOGLE_MAPS_API_KEY"
    address="SomeWhere..."
  />
</template>
```

## Params

### apiKey (Required)

- Type `string`
- Default: `undefined`

::: warning Important
Please remember to enable the `Maps Embed API`
:::

### mapMode

Choosing map modes

- Type `'place' | 'view' | 'directions' | 'streetview' | 'search'`
- Default `place`

### address

Defines map marker location.

- Type `string`
- Default: `Eiffel+Tower,Paris+France`

::: tip
You can input URL-escaped place name, address, plus code, or place ID.
:::

### width

Controls the width.

- Type `'numbe' | 'string'`
- Default: `450`

### height

Controls the height.

- Type `'numbe' | 'string'`
- Default: `250`

### style

controls the style.

- type `string`
- default: `border:0`

### allowfullscreen

Allow certain map parts to go full screen.

- Type `boolean`
- Default: `true`

### center

Defines center of the map view.

- Type `string`
- Default: `undefined`
- Example: `-33.8569,151.2152`

### zoom

Sets initial zoom level of the map.

- Type `number`
- Default: `undefined`

### maptype

Defines type of map tiles to load.

- Type `'roadmap' | 'satellite'`
- Default: `roadmap`
