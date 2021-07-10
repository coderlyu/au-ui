import { Tooltip, Button, Scrollbar, Backtop } from 'element-ui'

const components = [
  Tooltip,
  Button,
  Scrollbar,
  Backtop
]
export default {
  install(Vue) {
    components.forEach((ele) => {
      Vue.component(ele.name, ele)
    })
  }
}
