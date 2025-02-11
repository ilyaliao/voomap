<script setup lang="ts">
import { GoogleMap } from '@voomap/map'

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env
</script>

<template>
  <GoogleMap
    style="width: 100vw; height: 100dvh"
    :api-key="VITE_GOOGLE_MAP_API_KEY"
    :zoom="100"
    :disable-default-ui="true"
  />
</template>
