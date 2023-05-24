import type { UnwrapRef } from 'vue'
import type { RequestKeyType } from '~/api'
import { initData } from '~/api'
import type { ResponseType } from '~/api/apiResponseType'

interface PageOptions {
  pageNo: number
  pageSize: number
}

export default function usePagination<
  P extends Record<keyof any, any>,
  T extends RequestKeyType,
>(
  url: T,
  pageOpts: PageOptions = {
    pageNo: 1,
    pageSize: 10,
  },
  mainParams: P = {} as P,
) {
  const page = reactive({
    ...pageOpts,
  })

  const total = ref(0)
  const list = ref<ResponseType[T]>([] as unknown as ResponseType[T])
  const pageCount = computed(() => {
    return Math.ceil(total.value / (page.pageSize ?? 10))
  })

  const getList = async (pageNo = page.pageNo, params: P = {} as P) => {
    pageNo && (page.pageNo = pageNo)

    const query = {
      ...page,
      ...mainParams,
      ...params,
    }
    try {
      const res = await initData<T>(url, query)
      list.value.push(...res.list)
      total.value = res.total

      return {
        list: res.list as UnwrapRef<ResponseType[T]>,
        total: res.total,
      }
    }
    catch (e) {
      return Promise.reject(e)
    }
  }

  const clearList = () => {
    list.value = []
  }

  return {
    page,
    total,
    pageCount,
    list,
    getList,
    clearList,
  }
}
