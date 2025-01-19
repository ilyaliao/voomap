<script setup lang="ts">
import { Embed } from '@voomap/map'

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env
</script>

<template>
  <Embed
    width="100%"
    height="100%"
    :api-key="VITE_GOOGLE_MAP_API_KEY"
    address="Dreamers Coffee Roasters 忠孝復興店"
  />
</template>
