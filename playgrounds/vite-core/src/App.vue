<script setup lang="ts">
import { useGoogleMap } from '@voomap/core'
import { useTemplateRef } from 'vue'

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env

const el = useTemplateRef('el')

useGoogleMap(VITE_GOOGLE_MAP_API_KEY, el)
</script>

<template>
  <div ref="el" style="width: 100vw; height: 100dvh" />
</template>
