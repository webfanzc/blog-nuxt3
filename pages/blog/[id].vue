<script setup lang="ts">
import { Starport } from 'vue-starport'
import dayjs from 'dayjs'
import { getArticleDetail } from '../../api/index'

const route = useRoute()
const { data } = await useAsyncData('detail', () => {
  return getArticleDetail({ id: route.params.id as string })
}, { watch: [route.params] })
</script>

<template>
  <div>
    <div>
      <Starport :port="`${route.params.id}`" h-7>
        <span c="$bl-main" text-lg font-bold>
          {{ data?.title }}
        </span>
      </Starport>
      <Starport :port="`${data?.createdAt}`">
        <span text-xs>
          {{ dayjs(data?.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
        </span>
      </Starport>
    </div>
  </div>
</template>
