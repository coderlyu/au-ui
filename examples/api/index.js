import axios from '../plugins/axios'

export function getCompCategories() {
  return axios({
    method: 'get',
    url: '/local/comp/category'
  })
}
