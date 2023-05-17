import type { AxiosRequestConfig } from 'axios'

import type * as URLKEYS from './URLConstants'
import type { ResponseType } from './apiResponseType'
import { GET_ARTICLES } from './URLConstants'
import type { ServerResponse } from '~/utils/request'
import axios from '~/utils/request'
import type { DeepExpand, ObjectValues } from '~/types/utils'

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
type AxiosRequestConfigWithURL<T extends RequestKeyType> =
  AxiosRequestConfig & { url: T }

function request<T extends RequestKeyType>(
  config: AxiosRequestConfigWithURL<T>,
) {
  return new Promise<ServerResponse<ResponseType[T]>>((resolve, reject) => {
    /*
    传递泛型给http中的拦截器
    */
    axios
      .request<ResponseType[T]>({
        url: config.url,
        data: config.data || '',
        params: config.params || '',
        method: config.method || 'get',
        headers: config.headers || {},
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
 * @description 错误捕获函数
 * @author 张聪
 * @param {AxiosRequestConfigWithURL} config axios配置
 */
async function errCaptured<T extends RequestKeyType>(
  config: AxiosRequestConfigWithURL<T>,
): Promise<IResponse<ServerResponse<ResponseType[T]>>> {
  try {
    const res = await request(config)

    return {
      res,
      err: null,
    }
  }
  catch (err: any) {
    return { res: null, err }
  }
}

/**
 * get请求错误捕获函数包装
 * @param url 请求的地址
 * @param params 请求参数
 * @returns Promise
 */
async function getCaptured<T extends RequestKeyType>(url: T,
  params: Object = {},
  config: AxiosRequestConfig = {}) {
  return errCaptured<T>({
    ...config,
    method: 'get',
    url,
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
  config: AxiosRequestConfig = {}) {
  return errCaptured<T>({
    ...config,
    method: 'post',
    url,
    data,
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
): Promise<IResponse<ServerResponse<PaginationData<T>>>> {
  return getCaptured(url, params) as unknown as Promise<
  IResponse<ServerResponse<PaginationData<T>>>
  >
}
export function getArticles(preview = false) {
  return getCaptured(GET_ARTICLES, { preview })
}
