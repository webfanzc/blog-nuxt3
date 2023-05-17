import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  /**
   * Current named of the user.
   */
  const site = ref({
    appearanceTransition: true,
    appearance: 'dark',
  })

  return {
    site,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
