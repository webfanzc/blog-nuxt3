<script setup lang="ts">
import { Starport } from 'vue-starport'
import dayjs from 'dayjs'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import '@/assets/css/markdown.css'
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'
import markedIt from 'markdown-it'
import { getArticleDetail } from '~/api/index'

const route = useRoute()
const { data } = await useAsyncData('detail', () => {
  return getArticleDetail({ id: route.params.id as string })
})

const theme = computed(() => {
  const themeArr = ['', 'success', 'info', 'warning', 'danger']
  return themeArr[Math.floor(themeArr.length * Math.random())] as any
})

const mark = markedIt({
  html: true,
  breaks: true,
  langPrefix: 'language-',
  linkify: true,
  typographer: true,
  highlight(code: string, lang: string) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext'
    return hljs.highlight(code, { language }).value
  },
})
mark.renderer.rules.html_block = function (token, idx, options, env, self) {
  console.log(token, idx, options, env)
  return token[idx].content
}
mark.renderer.rules.my_token = function (token, idx, options, env, self) {
  return token[idx].content
}
const content = computed(() => {
  if (!data.value)
    return ''

  return mark.render(data.value?.content)
})

onMounted(() => {
  setTimeout(() => {
    const viewer = new Viewer(document.querySelector('.marked-body')!)
  }, 1000)
})
</script>

<template>
  <clientOnly>
    <div mx-auto h-full w-80ch flex flex-col>
      <div h-20>
        <Starport :port="`${route.params.id}`" h-7>
          <div>
            <span c="$bl-main" text-lg font-bold>
              {{ data?.title }}
            </span>
          </div>
        </Starport>
        <Starport v-for="item in data?.tags" :key="item._id" inline-block h-6 :port="item._id" :duration="800">
          <div w-max>
            <ElTag w-max :type="theme">
              {{ item.tagName }}
            </ElTag>
          </div>
        </Starport>
        <Starport h-5 :port="`${data?.createdAt}`">
          <span text-xs>
            {{ dayjs(data?.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
          </span>
        </Starport>
      </div>
      <ElScrollbar flex-1 shrink-0>
        <div>
          <div>
            <div class="marked-body markdown-body" v-html="content" />
            <!-- {{ content }} -->
          </div>
        </div>
      </ElScrollbar>
    </div>
  </clientOnly>
</template>

<style scoped lang="scss">
:deep(.marked-body){
  > * {
  --step: 60ms;
  --initial: 0ms;
  --stage: 1;
  animation: fade-enter 1s both 1;
  animation-delay: calc(var(--initial) + var(--stage) * var(--step))
  }
}
</style>
