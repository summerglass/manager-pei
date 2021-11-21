import axios from 'axios'
import router from '../router'
import config from '../config'
import { ElMessage } from 'element-plus'
const TOKEN_ERROR = 'Token认证失败,请重新登录'
const NETWORK_ERROR = '网路请求异常,请稍后重试'
//创建axios实例，添加全局配置
const service = axios.create({
  baseURL: config.baseApi,
  timemout: 8000,
})
//请求封装
service.interceptors.request.use((req) => {
  //jwt的token验证
  const headers = req.headers
  if (!headers.Authorization) headers.Authorization = 'Jason'
  return req
})
//返回封装
service.interceptors.response.use((res) => {
  const { code, data, msg } = res.data
  if (code === 200) {
    return data
  } else if (code === 50001) {
    ElMessage.error(TOKEN_ERROR)
    setTimeout(() => {
      router.push('/login')
    }, 1500)
    return Promise.reject(TOKEN_ERROR)
  } else {
    ElMessage.error(msg || NETWORK_ERROR)
    return Promise.reject(msg || NETWORK_ERROR)
  }
})
//请求核心函数 options 请求配置
function request(options) {
  console.log('让我康看options是什么')
  console.log(options)
  options.method = options.method || 'get'
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
  }
  if (typeof options.mock !== 'undefined') {
    config.mock = options.mock
  }
  if (config.env === 'prod') {
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi
  }
  return service(options)
}

;['get', 'post', 'put', 'delete', 'patch'].forEach((item) => {
  request[item] = (url, data, options) => {
    return request({
      url,
      data,
      method: item,
      ...options,
    })
  }
})
export default request
