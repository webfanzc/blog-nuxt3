<script setup lang='ts'>
import { Plum } from '~/utils/plum'

const el = ref<HTMLCanvasElement | null>(null)
const plumInstance = ref(new Plum())
const { width, height } = useWindowSize()
onMounted(() => {
  plumInstance.value.start(el.value as HTMLCanvasElement, { width: width.value, height: height.value })
})

const mask = computed(() => 'radial-gradient(circle, transparent, black);')
</script>

<template>
  <div
    class="pointer-events-none fixed bottom-0 left-0 right-0 top-0"
    style="z-index: -1"
    :style="`mask-image: ${mask};--webkit-mask-image: ${mask};`"
  >
    <canvas ref="el" width="400" height="400" />
  </div>
</template>
