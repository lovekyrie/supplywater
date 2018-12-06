import Tool from '../components/tool.vue'
import { mergeOptions } from '../libs/plugin_helper'

let $vm;

const plugin = {
  install (vue, options = {}) {
    const myTool = vue.extend(Tool)

    if (!$vm) {
      $vm = new myTool({
        el: document.createElement('div'),
      })
      document.body.appendChild($vm.$el)
    }

    const tool = {
      show (options) {
        if (typeof options === 'object') {
          mergeOptions($vm, options)
        }
        $vm.showValue = true;
        if(!options.times){
          options.times = 3000;
        }
        setTimeout(()=>{
          $vm.hide();
        },options.times);

      },
    };

    if (!vue.$hero) {
      vue.$hero = {
        tool
      }
    } else {
      vue.$hero.tool = tool;
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

