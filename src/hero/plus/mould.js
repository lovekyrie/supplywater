import BoardComponent from '../components/keyboard.vue' ;

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
    const board = {
      show () {},
      hide () {}
    }
    if (!vue.$hero) {
      vue.$hero = {
        keyboard:board
      }
    } else {
      vue.$hero.keyboard = board
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
