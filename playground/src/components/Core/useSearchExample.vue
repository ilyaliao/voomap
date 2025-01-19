<script setup lang="ts">
import { useSearch } from '@voomap/core'

import { NCard, NInput, NTooltip } from 'naive-ui'
import { ref } from 'vue'

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env

const searchText = ref('')

const { isLoading, coordinates, getCoordinates } = useSearch(VITE_GOOGLE_MAP_API_KEY)

function test() {
  getCoordinates(searchText)
}
</script>

<template>
  <NCard bordered title="useSearch">
    <NTooltip trigger="hover">
      <template #trigger>
        <NInput
          v-model:value="searchText"
          placeholder="輸入地址"
          :loading="isLoading"
          @blur="test"
        />
      </template>
      請輸入一個地址，在input blur 時，你將獲得地址座標！
    </NTooltip>
    <template #footer>
      結果 : {{ coordinates }}
    </template>
  </NCard>
</template>
