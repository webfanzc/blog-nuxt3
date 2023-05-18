<script setup lang="ts">
import { Starport } from 'vue-starport'
import { GET_ARTICLES } from '~/api/URLConstants'

const { getList } = usePagination(GET_ARTICLES)
const { data } = await useAsyncData('articles', () => {
  return getList()
})
</script>

<template>
  <div>
    <ul flex flex-col gap-y-4>
      <div
        v-for="item, index in data?.list" :key="item._id" class="slide-enter" :style="{
          '--stage': index,
        }"
      >
        <NuxtLink :to="`/blog/${item._id}`">
          <li c="$bl-main" hover:c="$bl-main-light-6" hover:dark:c="!$bl-main-dark-3">
            <Starport :port="item._id" min-h-6 class="slide-enter">
              <span>
                {{ item.title }}
              </span>
            </Starport>
          </li>
        </NuxtLink>
      </div>
    </ul>
  </div>
</template>

<style scoped>

</style>
