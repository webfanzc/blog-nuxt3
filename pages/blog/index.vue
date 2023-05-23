<script setup lang="ts">
import { Starport } from 'vue-starport'
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'
import { GET_ARTICLES } from '~/api/URLConstants'

const { getList, page, total } = usePagination(GET_ARTICLES)
const { tag: currentTag } = storeToRefs(useBlogStore())
const { data, execute } = await useAsyncData('articles',
  () => {
    const params: {
      tagId?: string
    } = {
    }

    if (currentTag.value._id !== '-1')
      params.tagId = currentTag.value._id

    return getList(page.pageNo, params)
  },
  {
    watch: [() => page.pageNo, () => page.pageSize],
  },
)

watch(currentTag, () => {
  execute()
})
</script>

<template>
  <div h-full w-full flex>
    <div basis="40">
      <Tags />
    </div>
    <ElScrollbar h-full shrink-0 flex-grow-3>
      <ul ml-4 flex flex-col gap-y-4>
        <div
          v-for="item, index in data?.list" :key="item._id" class="slide-enter" :style="{
            '--stage': index,
          }"
        >
          <NuxtLink :to="`/blog/${item._id}`">
            <li c="$bl-main" opacity-75 hover:opacity-100>
              <Starport :port="item._id" class="slide-enter" h-6>
                <span>
                  {{ item.title }}
                </span>
              </Starport>
              <Starport :port="`${item.createdAt}`" h-6>
                <span text-xs>
                  {{ dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
                </span>
              </Starport>
            </li>
          </NuxtLink>
        </div>
      </ul>
    </ElScrollbar>
  </div>
</template>

<style scoped lang="scss">

</style>
