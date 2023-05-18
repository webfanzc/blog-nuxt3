import { acceptHMRUpdate, defineStore } from 'pinia'
import { DEFAULT_THEME } from '~/constants'

export const useAppStore = defineStore('app', () => {
  const isDark = ref(false)
  const themes = ref(DEFAULT_THEME)

  const currentTheme = computed(() => {
    return isDark.value ? themes.value.dark : themes.value.light
  })

  return {
    isDark,
    currentTheme,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
