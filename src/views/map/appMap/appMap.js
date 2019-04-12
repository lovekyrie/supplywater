import Vue from 'vue';
import init from 'assets/js/init.js'
import {
  Table,
  TableColumn,
  Dialog,
  Row,
  Col,
  Button,
  Tooltip,
  DatePicker,
} from 'element-ui'
Vue.use(init);
Vue.use(Dialog)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Tooltip)
Vue.use(DatePicker)
import App from './App';
new Vue({
  render: h => h(App)
}).$mount('#container')