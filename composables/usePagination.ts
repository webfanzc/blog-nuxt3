import type { UnwrapRef } from 'vue'
import type { RequestKeyType } from '~/api'
import { initData } from '~/api'
import type { ResponseType } from '~/api/apiResponseType'

interface PageOptions {
  current?: number
  pageSize?: number
}

export default function usePagination<
  P extends Record<keyof any, any>,
  T extends RequestKeyType,
>(
  url: T,
  pageOpts: PageOptions = {
    current: 1,
    pageSize: 10,
  },
  mainParams: P = {} as P,
) {
  const page = reactive({
    ...pageOpts,
  })

  const total = ref(0)
  const list = ref<ResponseType[T]>([])
  const [loading, toggleLoading] = useToggle(false)

  const getList = async (pageNo = page.current, params: P = {} as P) => {
    if (loading)
      return

    pageNo && (page.current = pageNo)

    const query = {
      ...page,
      ...mainParams,
      ...params,
    }

    toggleLoading(true)
    const { res } = await initData<T>(url, query)
    toggleLoading(false)

    if (!res) {
      list.value = []

      return {
        list: [],
        total: 0,
      }
    }
    else {
      list.value = res.data.list as UnwrapRef<ResponseType[T]>
      total.value = +res.data.total

      return {
        list: res.data.list,
        total: +res.data.total,
      }
    }
  }

  return {
    page,
    total,
    list,
    getList,
    loading,
  }
}
