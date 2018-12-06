// require ('assets/css/index.less');
require ('assets/css/common.css');
// var VueTouch = require('vue-touch')
// require ('assets/css/reset.css');
// require ('assets/css/help.css');
// require ('assets/css/mobile.less');
// require ('assets/css/project.less');
import 'assets/js/ScreenAdaptive.js';
import 'assets/js/vconsole.js';
// import 'element-ui/lib/theme-default/index.css'
// import ElementUI from 'element-ui'

import "babel-polyfill";// 解决 IE11 Promise对象未定义
import axios from 'axios';
import './vueFilter';  	//全局过滤器F
import {until,reg,postImgUrl,app,hostUrl} from 'assets/js/until'
import {msg,confirm,loading,dialog} from 'hero'
import 'assets/js/wconfig.js';
import './iconfont'  //字体库
import './wconfig.js'
// import $ from 'vue-touch'
import {Query} from 'assets/js/query'

import {Lunar} from 'assets/js/time'

//引入安卓 苹果
import 'assets/js/Ios';
import 'assets/js/WebViewJavascriptBridge';


import  { LoadingPlugin } from 'vux';

// var VueTouch = require('vue-touch')

import iView from 'iview';
import 'iview/dist/styles/iview.css';

/*YDUI*/
// import YDUI from 'vue-ydui';
// import 'vue-ydui/dist/ydui.rem.css';
// import {Icons} from 'vue-ydui/dist/lib.rem/icons';
// import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
// import {Slider, SliderItem} from 'vue-ydui/dist/lib.rem/slider';
// import {Popup} from 'vue-ydui/dist/lib.rem/popup';
// import {InfiniteScroll} from 'vue-ydui/dist/lib.rem/infinitescroll';
// import {Spinner} from 'vue-ydui/dist/lib.rem/spinner';
// import {Badge} from 'vue-ydui/dist/lib.rem/badge';
// import {CellGroup, CellItem} from 'vue-ydui/dist/lib.rem/cell';
// import {TextArea} from 'vue-ydui/dist/lib.rem/textarea';
// import {CitySelect} from 'vue-ydui/dist/lib.rem/cityselect';
// import {Tab, TabPanel} from 'vue-ydui/dist/lib.rem/tab';


export default{
  install(Vue){
    Vue.use(iView)
      // Vue.use(YDUI)

      Vue.prototype.axios = axios;
    Vue.prototype.until = new until();
    Vue.prototype.reg = new reg();
    Vue.prototype.app = new app();
    Vue.prototype.postImgUrl = postImgUrl;
    Vue.prototype.hostUrl = hostUrl;
    // Vue.use(msg);
    // Vue.use(confirm);
    // Vue.use(loading);
    // Vue.use(dialog);
    Vue.prototype.Query = Query;
    Vue.prototype.lunar = Lunar;

    // Vue.component(Slider.name, Slider);
    // Vue.component(SliderItem.name, SliderItem);
    // Vue.component(Popup.name, Popup);
    // Vue.component(InfiniteScroll.name, InfiniteScroll);
    // Vue.component(Spinner.name, Spinner);
    // Vue.component(Icons.name, Icons);
    // Vue.component(Badge.name, Badge);
    // Vue.component(CellGroup.name, CellGroup);
    // Vue.component(CellItem.name, CellItem);
    // Vue.component(TextArea.name, TextArea);
    // Vue.component(CitySelect.name, CitySelect);
    // Vue.component(Tab.name, Tab);
    // Vue.component(TabPanel.name, TabPanel);

    Vue.use(LoadingPlugin);
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


