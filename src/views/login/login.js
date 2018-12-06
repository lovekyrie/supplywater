import Vue from 'vue';
import App from './components/App';
import init from 'assets/js/init.js'
Vue.use(init);
require('./css/main.less');


new Vue({
  render: h => h(App)
}).$mount('#container');
setHtmlFontSize();
function setHtmlFontSize() {
  $('html').css('fontSize', $(window).width() / 375 * 18 + 'px');
}
$(window).on('resize', setHtmlFontSize);