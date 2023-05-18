<script setup lang="ts">
import { Starport } from 'vue-starport'
import { getArticleDetail } from '../../api/index'

const route = useRoute()
const { data } = await useAsyncData('detail', () => {
  return getArticleDetail({ id: route.params.id as string })
}, { watch: [route.params] })
</script>

<template>
  <div>
    <div w-full>
      <Starport :port="`${route.params.id}`">
        <span text-lg font-bold c="$bl-title">
          {{ data?.title }}
        </span>
      </Starport>
    </div>
  </div>
</template>
