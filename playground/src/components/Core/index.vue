<script setup lang="ts">
import { NGrid, NGridItem } from 'naive-ui'
import useSearch from './useSearchExample.vue'
</script>

<template>
  <NGrid :x-gap="12" :y-gap="8" :cols="4">
    <NGridItem>
      <useSearch />
    </NGridItem>
  </ngrid>
</template>
