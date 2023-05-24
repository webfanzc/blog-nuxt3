<script setup lang="ts">
import { Starport } from 'vue-starport'
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'
import { ElScrollbar } from 'element-plus'
import { GET_ARTICLES } from '~/api/URLConstants'

const { getList, page, total } = usePagination(GET_ARTICLES)
const { tag: currentTag } = storeToRefs(useBlogStore())
const dataNuxt = useNuxtData<Awaited<ReturnType<typeof getList>>>('articles')
const scrollRef = ref<InstanceType<typeof ElScrollbar> | null>(null)

watch(currentTag, () => {
  page.pageNo = 1
  clearNuxtData('articles')
}, {
  flush: 'pre',
})
const { data, pending } = await useLazyAsyncData('articles',
  async (app): ReturnType<typeof getList> => {
    const params: {
      tagId?: string
    } = {
    }

    if (currentTag.value._id !== '-1')
      params.tagId = currentTag.value._id
    // debugger
    if ((dataNuxt.data.value?.list?.length ?? 0) > (page.pageNo - 1) * page.pageSize)
      return dataNuxt.data.value ?? { list: [], total: 0 }

    const res = await getList(page.pageNo, params)
    res.list.forEach((item, idx) => item.stage = idx)

    return {
      list: useArrayUnique([...dataNuxt?.data?.value?.list || [], ...res.list], (a, b) => a._id === b._id).value,
      total: res.total,
    }
  },
  {
    watch: [() => page.pageNo, () => page.pageSize, currentTag],
  },
)

const infiniteScrollDisable = computed(() => {
  return pending.value || page.pageNo * page.pageSize > (data.value?.total || 0)
})

const element = $computed(() => {
  if (!scrollRef.value)
    return null

  return scrollRef.value?.$el.querySelector('.el-scrollbar__wrap')
})

onMounted(() => {
  useInfiniteScroll(element, () => {
    if (infiniteScrollDisable.value)
      return

    page.pageNo++
  },
  { interval: 600, distance: 200 })
})
</script>

<template>
  <div h-full w-full flex>
    <div basis="40">
      <Tags />
    </div>
    <div
      h-full
      w-full
      shrink-0
      flex-grow-3
    >
      <ElScrollbar ref="scrollRef">
        <ul ml-4 flex flex-col gap-y-4>
          <div
            v-for="item in data?.list" :key="item._id" class="slide-enter" :style="{
              '--stage': item.stage,
            }"
          >
            <NuxtLink :to="`/blog/${item._id}`">
              <li c="$bl-main" opacity-75 hover:opacity-100>
                <ClientOnly>
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
                  <template #fallback>
                    <div class="slide-enter hidden h-6">
                      <span>
                        {{ item.title }}
                      </span>
                    </div>
                    <div h-6 class="hidden">
                      <span text-xs>
                        {{ dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
                      </span>
                    </div>
                  </template>
                </ClientOnly>
              </li>
            </NuxtLink>
          </div>

          <li v-loading="pending" h-10 />
        </ul>
      </ElScrollbar>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
