import { Tooltip, Button, Scrollbar, Backtop, Icon } from 'element-ui'

const components = [
  Tooltip,
  Button,
  Scrollbar,
  Backtop,
  Icon
]
export default {
  install(Vue) {
    components.forEach((ele) => {
      Vue.component(ele.name, ele)
    })
  }
}
