import { Tooltip, Button, Scrollbar, Backtop, Icon, Dialog, Form, FormItem, Input, Select, Option, Switch } from 'element-ui'

const components = [
  Tooltip,
  Button,
  Scrollbar,
  Backtop,
  Icon,
  Dialog,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Switch
]
export default {
  install(Vue) {
    components.forEach((ele) => {
      Vue.component(ele.name, ele)
    })
  }
}
