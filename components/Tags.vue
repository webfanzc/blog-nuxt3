<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Starport } from 'vue-starport'
import { getTags } from '../api/index'

const { tag: currentTag } = storeToRefs(useBlogStore())
const { data, pending } = await useAsyncData('tags', () => {
  return getTags()
})

const allTags = computed(() => {
  return [{ _id: '-1', tagName: '全部' }, ...data.value || []]
})
</script>

<template>
  <div h-full>
    <ElScrollbar v-loading="pending" h-full pr-3>
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
            <ClientOnly>
              <Starport :port="tag._id">
                <div w-37>
                  <ElCheckTag :checked="currentTag._id === tag._id" w-full c="$bl-main" @change="currentTag = tag">
                    {{ tag.tagName }}
                  </ElCheckTag>
                </div>
              </Starport>
              <template #fallback>
                <div class="hidden">
                  <div w-37>
                    <ElCheckTag :checked="currentTag._id === tag._id" w-full c="$bl-main" @change="currentTag = tag">
                      {{ tag.tagName }}
                    </ElCheckTag>
                  </div>
                </div>
              </template>
            </ClientOnly>
          </li>
        </div>
      </ul>
    </ElScrollbar>
  </div>
</template>
