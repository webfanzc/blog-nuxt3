import { ElMessage } from 'element-plus'
import type { AxiosResponse } from 'axios'
import axios from 'axios'

// 创建一个错误
function errorCreate(msg: string) {
  const error = new Error(msg)
  errorLog(error)
  // throw error
}
// 记录和显示错误
function errorLog(error: Error) {
  // 显示提示
  ElMessage({
    message: error.message,
    type: 'error',
    duration: 5 * 1000,
  })
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: '/api',
  timeout: 20000, // 请求超时时间
  withCredentials: true,
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    // 发送失败
    return Promise.reject(error)
  },
)
export interface ServerResponse<T = any> {
  data: T
}
export interface IAxios<D = null> {
  code: number
  msg: string
  data: D
}
// 响应拦截器
service.interceptors.response.use(
  <T>(response: AxiosResponse<IAxios<T>>) => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // 这个状态码是和后端约定的
    const { code, data, msg } = dataAxios

    // 根据 code 进行判断
    if (response.status < 200 || response.status > 502) {
      errorCreate(`${response.statusText}`)
      return Promise.reject(response.statusText)
    }
    else {
      if (code !== 0)
        return Promise.reject(dataAxios)

      return {
        data,
      } as AxiosResponse
    }
  },
  (error) => {
    const { response, status } = error

    if (status < 200 || status > 502) {
      errorCreate(`${response?.data?.msg ?? response?.statusText}`)
      return Promise.reject(error)
    }

    return Promise.reject(error)
  },
)

export default service
