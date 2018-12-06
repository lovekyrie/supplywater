import upLoad from '../components/imgUpLoad.vue'
import { mergeOptions } from '../libs/plugin_helper'

let $vm;

const plugin = {
  install (vue, options = {}) {
    const UpLoad = vue.extend(upLoad)

    if (!$vm) {
      $vm = new UpLoad({
        el: document.createElement('div'),
      })
      document.body.appendChild($vm.$el)
    }

    const imgUpLoad = {
      _init (options) {

        if (typeof options === 'object') {
          mergeOptions($vm, options)
        }
        $vm._initListen();
        $vm.$off('on-finish');
        $vm.$on('on-finish', (e) => {
          options && options.onFinish && options.onFinish(e)
        });
      },
    };

    if (!vue.$hero) {
      vue.$hero = {
        imgUpLoad
      }
    } else {
      vue.$hero.imgUpLoad = imgUpLoad
    }

    vue.mixin({
      created: function () {
        this.$hero = vue.$hero
      }
    })
  }
}

export default plugin
export const install = plugin.install

