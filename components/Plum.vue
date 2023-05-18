<script setup lang='ts'>
import type { Fn } from '@vueuse/core'

const deg180 = Math.PI
const deg90 = Math.PI / 2
const deg15 = Math.PI / 12
const color = '#00000020'

const el = ref<HTMLCanvasElement | null>(null)

const { random } = Math
const size = reactive(useWindowSize())

const start = ref (() => {})
const MIN_BRANCH = 30
const len = ref(6)
const stopped = ref(false)

function initCanvas(canvas: HTMLCanvasElement, width = 400, height = 400, _dpi?: number) {
  const ctx = canvas.getContext('2d')!

  const dpr = window.devicePixelRatio || 1
  // @ts-expect-error vendor
  const bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1

  const dpi = _dpi || dpr / bsr

  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  canvas.width = dpi * width
  canvas.height = dpi * height
  ctx.scale(dpi, dpi)

  return { ctx, dpi }
}

function polar2cart(x = 0, y = 0, r = 0, theta = 0) {
  const dx = r * Math.cos(theta)
  const dy = r * Math.sin(theta)
  return [x + dx, y + dy]
}

onMounted(async () => {
  const canvas = el.value! as HTMLCanvasElement
  const { ctx } = initCanvas(canvas, size.width, size.height)
  const { width, height } = canvas

  let steps: Fn[] = []
  let prevSteps: Fn[] = []

  const step = (x: number, y: number, rad: number, counter: { value: number } = { value: 0 }) => {
    const length = random() * len.value
    counter.value += 1

    const [nx, ny] = polar2cart(x, y, length, rad)

    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(nx, ny)
    ctx.stroke()

    const rad1 = rad + random() * deg15
    const rad2 = rad - random() * deg15

    // out of bounds
    if (nx < -100 || nx > size.width + 100 || ny < -100 || ny > size.height + 100)
      return

    const rate = counter.value <= MIN_BRANCH
      ? 0.8
      : 0.5

    // left branch
    if (random() < rate)
      steps.push(() => step(nx, ny, rad1, counter))

    // right branch
    if (random() < rate)
      steps.push(() => step(nx, ny, rad2, counter))
  }

  let lastTime = performance.now()
  const interval = 1000 / 40 // 50fps

  let pauseableController: ReturnType<typeof useRafFn>

  const frame = () => {
    if (performance.now() - lastTime < interval)
      return

    prevSteps = steps
    steps = []
    lastTime = performance.now()

    if (!prevSteps.length) {
      pauseableController.pause()
      stopped.value = true
    }

    prevSteps.forEach((i) => {
      if (random() < 0.5)
        steps.push(i)
      else
        i()
    })
  }

  pauseableController = useRafFn(frame, { immediate: false })

  // 生成0.2 - 0.8之间的随机数
  const getRandomPos = () => random() * 0.6 + 0.2

  start.value = () => {
    pauseableController.pause()

    ctx.clearRect(0, 0, width, height)
    ctx.lineWidth = 1
    ctx.strokeStyle = color
    prevSteps = []
    steps = [
      () => step(getRandomPos() * size.width, -5, deg90),
      () => step(getRandomPos() * size.width, size.height + 5, -deg90),
      () => step(-5, getRandomPos() * size.height, 0),
      () => step(size.width + 5, getRandomPos() * size.height, deg180),
    ]

    pauseableController.resume()
    stopped.value = false
  }

  start.value()
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
