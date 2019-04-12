require('assets/css/common.css');
import 'assets/js/ScreenAdaptive.js';
import 'assets/js/vconsole.js';

import "babel-polyfill"; // 解决 IE11 Promise对象未定义
import './vueFilter'; //全局过滤器F
import {
  until,
  reg,
  postImgUrl,
  app,
  hostUrl
} from 'assets/js/until'
import {
  msg
} from 'hero'
import 'assets/js/wconfig.js';
import './iconfont' //字体库
import './wconfig.js'
// import $ from 'vue-touch'
import {
  Query
} from 'assets/js/query'

/* import {
  Lunar
} from 'assets/js/time'
 */
//引入安卓 苹果
// import 'assets/js/Ios';
import 'assets/js/WebViewJavascriptBridge';

import {
  LoadingPlugin
} from 'vux';

// var VueTouch = require('vue-touch')

import iView from 'iview';
import 'iview/dist/styles/iview.css';

export default {
  install(Vue) {
    Vue.use(iView)
    Vue.prototype.until = new until();
    Vue.prototype.reg = new reg();
    Vue.prototype.app = new app();
    Vue.prototype.postImgUrl = postImgUrl;
    Vue.prototype.hostUrl = hostUrl;
    Vue.prototype.Query = Query;
    /*   Vue.prototype.lunar = Lunar; */

    Vue.use(LoadingPlugin);
    Vue.use(msg)
    // Vue.use(VueTouch, {name: 'v-touch'})
    Vue.prototype.$dialog = {
      // confirm: Confirm,
      // alert: Alert,
      // toast: Toast,
      // notify: Notify,
      // loading: Loading,
    };
    /* ===调用=== */
    // this.$dialog.confirm({ /* 参数 */ });
    // this.$dialog.alert({ /* 参数 */ });
    // this.$dialog.toast({ /* 参数 */ });
    // this.$dialog.notify({ /* 参数 */ });
    // this.$dialog.loading({ /* 参数 */ });
  }
}