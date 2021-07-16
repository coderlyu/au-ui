import axios from 'axios'
import qs from 'qs'

const request = axios.create({
  baseURL: '/',
  timeout: 10000,
  transformRequest: [function (data) {
    const d = qs.stringify(data)
    return d
  }]
})

request.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response) => {
    const res = response.data
    return res
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default request
