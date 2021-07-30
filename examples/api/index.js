import axios from '../plugins/axios'

// 获取组件分类列表
export function getCompCategories() {
  return axios({
    method: 'get',
    url: '/local/comp/category'
  })
}

// 新增组件
export function putComp(data) {
  return axios({
    method: 'put',
    url: '/local/comp',
    data
  })
}

// 新增分类
export function putCompCategories(data) {
  return axios({
    method: 'put',
    url: '/local/comp/category',
    data
  })
}
