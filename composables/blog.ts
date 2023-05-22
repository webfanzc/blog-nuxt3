import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Tag } from '~/api/responseEntity'

export const useBlogStore = defineStore('blog', () => {
  const tag = ref({ _id: '-1', tagName: '全部' } as Tag)

  return {
    tag,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useBlogStore, import.meta.hot))
