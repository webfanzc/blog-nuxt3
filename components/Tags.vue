<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { getTags } from '../api/index'

const { tag: currentTag } = storeToRefs(useBlogStore())
const { data } = await useAsyncData('tags', () => {
  return getTags()
})

const allTags = computed(() => {
  return [{ _id: '-1', tagName: '全部' }, ...data.value || []]
})
</script>

<template>
  <div>
    <ClientOnly>
      <ElScrollbar max-height="400px" pr-3>
        <ul flex flex-col gap-y-2>
          <div
            v-for="tag, idx in allTags"
            :key="tag._id"
            :class="tag._id === currentTag._id ? '' : ''"
            class="slide-enter"
            :style="{ '--stage': idx }"
            w-full
          >
            <li>
              <ElCheckTag :checked="currentTag._id === tag._id" w-full c="$bl-main" @change="currentTag = tag">
                {{ tag.tagName }}
              </ElCheckTag>
            </li>
          </div>
        </ul>
      </ElScrollbar>
    </ClientOnly>
  </div>
</template>
