// axios.js
import axios from 'axios'
import Cookies from 'js-cookie'

const baseURL = import.meta.env.VITE_GLOB_API_URL // 从环境变量中获取 API base URL
const request = axios.create({
  baseURL,
  timeout: 10000, // 请求超时时间
  headers: {
    // 'Content-Type': 'application/json'
    'Content-Type': 'multipart/form-data',
  }
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在请求发送之前可以做一些处理，例如添加认证信息、token等
    const token = Cookies.get('Authorization')
    if (token) {
      config.headers.Authorization = `${token}` // 将 token 添加到请求头
      config.headers.stdId = `${token}` // 暂时不知道有没有用 后续询问
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 对响应数据做些处理，可以在这里统一处理错误码、格式化数据等
    return response.data
  },
  (error) => {
    // 对响应错误做些处理
    if (error.response) {
      // 请求已发出，但服务器返回状态码不在 2xx 范围内
      // console.error('Error status:', error.response.status);
      // console.error('Error message:', error.response.data);
    }
 else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error('No response received:', error.request)
    }
 else {
      // 其他错误
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  },
)

export default request
