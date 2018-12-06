import KeyBoard from '../components/keyboard.vue'
import { mergeOptions } from '../libs/plugin_helper'

let $vm

const plugin = {
    install (vue, options = {}) {
        const Board = vue.extend(KeyBoard)

        if (!$vm) {
            $vm = new Board({
                el: document.createElement('div'),
            })
            document.body.appendChild($vm.$el)
        }

        const board = {
            show (options) {
                if (typeof options === 'object') {
                    mergeOptions($vm, options)
                }
                $vm.$off('on-finish');
                $vm.$off('on-cancel');
                $vm.$on('on-cancel', () => {
                    options && options.onCancel && options.onCancel()
                });
                $vm.$on('on-finish', (e,cb) => {
                    options && options.onFinish && options.onFinish(e,cb)
                });
                $vm.showValue = true
            },
        };

        if (!vue.$hero) {
            vue.$hero = {
                KeyBoard:board
            }
        } else {
            vue.$hero.KeyBoard = board
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

