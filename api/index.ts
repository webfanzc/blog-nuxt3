import type { UseFetchOptions } from 'nuxt/app'
import type { UnwrapRef } from 'vue'
import type * as URLKEYS from './URLConstants'
import type { ResponseType } from './apiResponseType'
import { GET_ARTICLES, GET_ARTICLE_DETAIL, GET_TAGS } from './URLConstants'
import type { DeepExpand, ObjectValues } from '~/types/utils'
import service from '~/utils/request'

type IResponse<T> =
  | {
    err: Error
    res: null
  }
  | {
    err: null
    res: DeepExpand<T>
  }

export type RequestKeyType = ObjectValues<typeof URLKEYS>

function request<T extends RequestKeyType>(
  url: T,
  config: UseFetchOptions<ResponseType[T]>,
) {
  return new Promise<ResponseType[T]>((resolve, reject) => {
    /*
    传递泛型给http中的拦截器
    */
    service<ResponseType[T]>(url, {
      body: config.body || '',
      params: config.params,
      method: config.method as unknown as 'get' | 'post',
      headers: config.headers as UnwrapRef<typeof config['headers']>,
    })
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * get请求错误捕获函数包装
 * @param url 请求的地址
 * @param params 请求参数
 * @returns Promise
 */
async function getCaptured<T extends RequestKeyType>(url: T,
  params: Object = {},
  config: UseFetchOptions<ResponseType[T]> = {}) {
  return request<T>(url, {
    ...config,
    method: 'get',
    params,
  })
}

/**
 * post请求错误捕获函数包装
 * @param url 请求的地址
 * @param data 请求参数
 * @param config
 * @returns Promise
 */

async function postCaptured<T extends RequestKeyType>(url: T,
  data: Object = {},
  config: UseFetchOptions<ResponseType[T]> = {}) {
  return request<T>(url, {
    ...config,
    method: 'post',
    body: data,
  })
}
export interface PaginationData<T> {
  current: number
  list: T[]
  pageSize: number
  total: number
}
// 分页获取数据
export function initData<T>(
  url: RequestKeyType,
  params: any,
): Promise<PaginationData<T>> {
  return getCaptured(url, params) as unknown as Promise<
  PaginationData<T>
  >
}
export function getArticles() {
  return getCaptured(GET_ARTICLES)
}
export interface GetArticleDetailParams {
  id: string
}
export function getArticleDetail(params: GetArticleDetailParams) {
  return getCaptured(GET_ARTICLE_DETAIL, params)
}

export function getTags() {
  return getCaptured(GET_TAGS)
}
