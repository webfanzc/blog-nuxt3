import { ElMessage } from 'element-plus'
import { ResponseErrorCode } from '~/types/enums'

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
const service = $fetch.create({
  baseURL: '/api',
  onRequest({ options }) {
    if (options.method?.toLowerCase() === 'get')
      delete options.body

    // console.log('onRequest', options)
  },
  onRequestError({ error }) {
    // console.log('onRequestError', error)
    errorCreate(`${error.message}`)
  },
  onResponse(response) {
    const { code, msg, data } = response.response._data as IResponse

    if (code === ResponseErrorCode.Error) {
      errorCreate(msg)
      response.response._data = Promise.reject(data)
    }
    else {
      response.response._data = data
    }
  },
  onResponseError(error) {
    // console.log('onResponseError', error)
    errorCreate(`${error.error?.message}`)
  },
})

export interface IResponse<T = null> {
  code: ResponseErrorCode
  msg: string
  data: T
}

export default service
