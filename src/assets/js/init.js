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

  }
}