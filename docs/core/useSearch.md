# useSearch

By inputting a location, you will obtain the coordinates of that address.

> Before using this feature, you must enable the `Geocoding API`

## Usage

```vue
<script setup lang="ts">
import { useSearch } from '@voomap/core'

const { isLoading, coordinates, getCoordinates } = useSearch(YOUR_GOOGLE_MAPS_API_KEY)
</script>

<template>
  <input
    type="text"
    @blur="(e) => getCoordinates(e.target.value)"
  >
  You will get Coordinates : {{ coordinates }}
</template>
```

## Params

### apiKey (Required)

- Type `string`
- Default: `undefined`

::: warning Important
Please remember to enable the `Geocoding API`
:::

### language

[list of supported languages](https://developers.google.com/maps/faq#languagesupport)

- Type `string`
- Default: `en`
