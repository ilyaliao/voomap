<script setup lang="ts">
import { darkTheme, NConfigProvider, NTabPane, NTabs } from 'naive-ui'
import Core from './components/Core'
import { Basic, Embed, InfoWindow, Marker, MarkerClusterer } from './components/Map'

const elementMap = new Map<string, any>()
  .set('Core', Core)
  .set('Basic', Basic)
  .set('Marker', Marker)
  .set('InfoWindow', InfoWindow)
  .set('MarkerClusterer', MarkerClusterer)
  .set('Embed', Embed)
</script>

<template>
  <NConfigProvider :theme="darkTheme">
    <NTabs style="height: 100vh;" type="line" :default-value="[...elementMap.keys()].at(1)">
      <NTabPane
        v-for="[key, components] in elementMap"
        :key="key"
        style="height: 90vh"
        display-directive="show:lazy"
        animated
        :tab="key"
        :name="key"
      >
        <component :is="components" />
      </NTabPane>
    </NTabs>
  </NConfigProvider>
</template>
