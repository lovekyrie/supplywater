import Loading from '../components/loading.vue'
import { mergeOptions } from '../libs/plugin_helper'

let $vm;

const plugin = {
  install (vue, options = {}) {
    const myLoad = vue.extend(Loading)

    if (!$vm) {
      $vm = new myLoad({
        el: document.createElement('div'),
      })
      document.body.appendChild($vm.$el)
    }

    const loading = {
      show (options) {
        if (typeof options === 'object') {
          mergeOptions($vm, options)
        }
        $vm.show = true;
      },
      hide(){
        $vm.show = false;
      }
    };

    if (!vue.$hero) {
      vue.$hero = {
        loading
      }
    } else {
      vue.$hero.loading = loading;
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

