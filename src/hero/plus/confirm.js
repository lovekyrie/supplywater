import Confirm from '../components/confirm.vue'
import { mergeOptions } from '../libs/plugin_helper'

let $vm;

const plugin = {
    install (vue, options = {}) {
        const con = vue.extend(Confirm)

        if (!$vm) {
            $vm = new con({
                el: document.createElement('div'),
            })
            document.body.appendChild($vm.$el)
        }

        const confirm = {
            show (options) {
                if (typeof options === 'object') {
                    mergeOptions($vm, options)
                }
                $vm.$off('on-confirm');
                $vm.$on('on-confirm', () => {
                    options && options.onConfirm && options.onConfirm()
                });

                $vm.$off('on-cancel');
                $vm.$on('on-cancel', () => {
                    options && options.onCancel && options.onCancel()
                });

                $vm.showValue = true
            },
        };

        if (!vue.$hero) {
            vue.$hero = {
              confirm
            }
        } else {
            vue.$hero.confirm = confirm
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

