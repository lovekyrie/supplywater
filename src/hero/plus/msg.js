import Msg from '../components/msg.vue'
import { mergeOptions } from '../libs/plugin_helper'

let $vm;

const plugin = {
    install (vue, options = {}) {
        const myMsg = vue.extend(Msg)

        if (!$vm) {
            $vm = new myMsg({
                el: document.createElement('div'),
            })
            document.body.appendChild($vm.$el)
        }

        const msg = {
            show (options) {
                if (typeof options === 'object') {
                    mergeOptions($vm, options)
                }
                $vm.showValue = true;
                if(!options.times){
                    options.times = 1000;
                }
                setTimeout(()=>{
                    $vm.hide();
                },options.times);

            },
        };

        if (!vue.$hero) {
            vue.$hero = {
                msg
            }
        } else {
            vue.$hero.msg = msg;
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

