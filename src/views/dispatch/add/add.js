import Vue from 'vue';
import init from 'assets/js/init.js'
import {
  Select,
  Option
} from 'element-ui'
Vue.use(init);
Vue.use(Select)
Vue.use(Option)
import App from './App';

new Vue({
  render: h => h(App)
}).$mount('#container')