import BoardComponent from '../components/callPop.vue' ;

let $vm;

const plugin = {
    install (vue, options) {
        const Loading = vue.extend(BoardComponent);

        if (!$vm) {
            $vm = new Loading({
                el: document.createElement('div')
            });
            document.body.appendChild($vm.$el)
        }
        const pop = {
            show () {
                $vm.showValue=true;
            }
        }
        if (!vue.$hero) {
            vue.$hero = {
                callPop:pop
            }
        } else {
            vue.$hero.callPop = pop
        }

        vue.mixin({
            created: function () {
                this.$hero = vue.$hero
            }
        })
    }
};
export default plugin;
export const install = plugin.install;
