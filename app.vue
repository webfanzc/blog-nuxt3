<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { StarportCarrier } from 'vue-starport'
import { useAppStore } from './composables/app'
import { setCSSVariable } from './utils/browserUtils'
import { appName } from '~/constants'

useHead({
  title: appName,
})
const appStore = useAppStore()
const { currentTheme } = storeToRefs(appStore)

watch(
  currentTheme,
  (theme) => {
    if (!isBrowser())
      return

    setCSSVariable('--el-color-primary', theme.primary)
    Object.entries(genThemeColor(theme.primary)).forEach(([key, value]) => {
      setCSSVariable(key, value)
    })

    genElementColor('--el-color-danger', theme.error)
    genElementColor('--el-color-error', theme.error)
    genElementColor('--el-color-success', theme.success)

    setCSSVariable('--el-bg-color', theme.background)
    setCSSVariable('--el-color-primary', theme.primary)
    setCSSVariable('--el-input-text-color', theme.main)
    setCSSVariable('--el-input-placeholder-color', theme.sub)
    setCSSVariable('--el-dialog-bg-color', theme.background)
    setCSSVariable('--el-bg-color-overlay', theme.background)
    setCSSVariable('--el-text-color-regular', theme.sub)
    setCSSVariable('--el-text-color-regular', theme.main)
    setCSSVariable('--el-input-bg-color', theme.background)

    Object.entries(theme).forEach(([key, value]) => {
      setCSSVariable(`--bl-${key}`, value)
      for (let i = 1; i < 10; i += 1) {
        setCSSVariable(
          `--bl-${key}-light-${10 - i}`,
          colorMix('#ffffff', value, i * 0.1),
        )
        setCSSVariable(
          `--bl-${key}-dark-${10 - i}`,
          colorMix('#000000', value, i * 0.1),
        )
      }

      // document.body.style.setProperty(key, value)
    })
  },
  { immediate: true },
)
</script>

<template>
  <StarportCarrier>
    <VitePwaManifest />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </StarportCarrier>
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}
*{
  /* transition: .3s ease; */
}

html.dark {
  background: var(--bl-background);
  color: var(--bl-title);
}
</style>
