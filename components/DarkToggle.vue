<script setup lang="ts">
import { useAppStore } from '../composables/app'

const color = useColorMode()
useHead({
  meta: [{
    id: 'theme-color',
    name: 'theme-color',
    content: () => color.value === 'dark' ? '#222222' : '#ffffff',
  }],
})

const checked = ref(false)
const toggle = ref((e: MouseEvent) => {})
const store = useAppStore()

onMounted(() => {
  checked.value = document.documentElement.classList.contains('dark')
  // @ts-expect-error: Transition API
  const isAppearanceTransition = document.startViewTransition
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function useAppearance() {
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    const classList = document.documentElement.classList
    let userPreference = color.value
    let isDark
      = (color.preference === 'dark' && userPreference == null)
      || ((userPreference === 'auto' || userPreference == null) ? query.matches : userPreference === 'dark')

    query.onchange = (e) => {
      if (userPreference === 'auto')
        setClass((isDark = e.matches))
    }
    function toggle(event: MouseEvent) {
      if (!isAppearanceTransition) {
        setClass((isDark = !isDark))
        userPreference = isDark
          ? query.matches ? 'auto' : 'dark'
          : query.matches ? 'light' : 'auto'
        color.preference = userPreference
        return
      }
      const x = event.clientX
      const y = event.clientY
      const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y),
      )
      // @ts-expect-error: Transition API
      const transition = document.startViewTransition(() => {
        setClass((isDark = !isDark))

        userPreference = isDark
          ? query.matches ? 'auto' : 'dark'
          : query.matches ? 'light' : 'auto'

        color.preference = userPreference
      })

      transition.ready.then(() => {
        const clipPath = [
          // 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
          // 'polygon(-50% 50%, 50% -50%, 150% 50%, 50% 150%',
          // 'polygon(0 0, 50% 50%, 100% 100%, 50% 50%)',
          // 'polygon(0 0, 0 100%, 100% 100%, 100% 0)',
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ]
        document.documentElement.animate(
          {
            clipPath: isDark ? clipPath : [...clipPath].reverse(),
          },
          {
            duration: 500,
            easing: 'ease-in-out',
            pseudoElement: isDark ? '::view-transition-new(root)' : '::view-transition-old(root)',
          },
        )
      })
    }
    function setClass(dark: boolean): void {
      const css = document.createElement('style')
      css.appendChild(
        document.createTextNode(
          `:not(.VPSwitchAppearance):not(.VPSwitchAppearance *) {
    -webkit-transition: none !important;
    -moz-transition: none !important;
    -o-transition: none !important;
    -ms-transition: none !important;
    transition: none !important;
  }`,
        ),
      )

      document.head.appendChild(css)
      checked.value = dark
      classList[dark ? 'add' : 'remove']('dark')
      const _ = window.getComputedStyle(css).opacity
      document.head.removeChild(css)
    }
    return toggle
  }
  toggle.value = useAppearance()
})
watch(checked, (isNewDark) => {
  color.preference = !isNewDark ? 'light' : 'dark'
  store.isDark = isNewDark
})
function toggleDark(e: MouseEvent) {
  toggle.value?.(e)
}
</script>

<template>
  <button class="!outline-none" @click="toggleDark">
    <div class="i-carbon-sun dark:i-carbon-moon" />
  </button>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
::view-transition-old(root) {
  z-index: 9999;
}
::view-transition-new(root) {
  z-index: 1;
}
.dark::view-transition-old(root) {
  z-index: 1;
}
.dark::view-transition-new(root) {
  z-index: 9999;
}
</style>
