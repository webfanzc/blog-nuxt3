<script setup lang="ts">
import { ElScrollbar } from 'element-plus'
import { getDemos } from '../../api/index'

definePageMeta({
  layout: 'demos',
})
const { data, pending } = await useLazyAsyncData('demos', async () => await getDemos())
</script>

<template>
  <div h-full w-full>
    <ElScrollbar>
      <div m-8 columns-5 gap-4>
        <div
          v-for="demo, index in data" :key="demo._id" class="slide-enter mb-4 rounded transition duration-300 hover:scale-105" b="~ solid $bl-title" :style="{
            '--stage': index,
          }"
        >
          <NuxtLink :to="demo.link" target="_blank" inline-block divide="y current" w-full>
            <div p-2>
              <img :src="demo.poster" min-h-10 w-full rounded>
            </div>
            <div p-2 text-center>
              {{ demo.desc }}
            </div>
          </NuxtLink>
        </div>
      </div>
    </ElScrollbar>
  </div>
</template>

<style scoped lang="scss">

</style>
