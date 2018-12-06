<template>
    <div id="hero_scroll_inner" class="scroll_wrap" :class="{'s_down':(state===0),'s_up':(state==1),refresh:(state===2),scroll_touch:touching}"
         @touchstart="touchStart($event)"
         @touchmove="touchMove($event)"
         @touchend="touchEnd($event)"
         @scroll="(onScrollBottom || infiniteLoading) ? onScroll($event) : undefined">
        <div class="scroll_inner" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)' }" :class="{scroll_touch:touching}">
            <div class="scroll-pull-refresh">
                <span class="down-tip">下拉更新</span>
                <span class="up-tip">松开更新</span>
                <span class="refresh-tip">更新中</span>
            </div>
            <slot></slot>
            <div class="scroll-load-more">
                <span>{{msg}}</span>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    props: {
      offset: {
        type: Number,
        default: 40
      },
      enableInfinite: {
        type: Boolean,
        default: true
      },
      enableRefresh: {
        type: Boolean,
        default: true
      },
      onScrollTop: {
        type: Function,
        default: undefined,
        required: false
      },
      onScrollBottom: {
        type: Function,
        default: undefined,
        require: false
      }
    },
    data() {
      return {
        top: 0,
        state: 0,
        startX:0,
        startY: 0,
        touching: false,
        infiniteLoading: false,
        msg:'加载更多',
        scrolled:false,
        direction:null
      }
    },
    methods: {
      touchStart(e) {
        this.startX = e.targetTouches[0].pageX;
        this.startY = e.targetTouches[0].pageY;
        this.startScroll = this.$el.scrollTop || 0;
        if(this.startScroll <=0){
          this.touching = true
        }
      },
      touchMove(e) {
        if (!this.enableRefresh || this.startScroll > 0 || !this.touching) {
          return
        }
        let Touches = e.targetTouches[0];
        let diff = e.targetTouches[0].pageY - this.startY - this.startScroll
        if(!this.scrolled){
          this.scrolled = true;
          this.direction = this.getDirection(this.startX, this.startY, Touches.pageX, Touches.pageY);
        }
        if(this.direction == 1 || this.direction == 2){
          if (diff > 0) e.preventDefault()
          this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0)
          if (this.state === 2) { // in refreshing
            return
          }
          if (this.top >= this.offset) {
            this.state = 1
          } else {
            this.state = 0
          }
        }
      },
      touchEnd(e) {
        if (!this.enableRefresh) return
        this.touching = false
        this.scrolled = false;
        if(this.direction == 1 || this.direction == 2){
          if (this.state === 2) { // in refreshing
            this.state = 2
            this.top = this.offset
            return
          }
          if (this.top >= this.offset) { // do refresh
            this.refresh()
          } else { // cancel refresh
            this.state = 0
            this.top = 0
          }
        }
      },
      getDirection(startx, starty, endx, endy){
        let angx = endx - startx;
        let angy = endy - starty;
        let result = 0;
        var angle = this.getAngle(angx, angy);
        if (angle >= -135 && angle <= -45) {
          result = 1;
        } else if (angle > 45 && angle < 135) {
          result = 2;
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
          result = 3;
        } else if (angle >= -45 && angle <= 45 ) {
          result = 4;
        }
        return result;
      },
      getAngle(angx, angy){
        return Math.atan2(angy, angx) * 180 / Math.PI;
      },
      refresh() {
        this.state = 2
        this.top = this.offset
        this.onScrollTop(this.refreshDone)
      },
      refreshDone() {
        this.state = 0
        this.top = 0
      },

      infinite() {
        this.infiniteLoading = true
        this.msg = '加载中'
        this.onScrollBottom(this.infiniteDone)
      },
      setMsg(e){
        this.msg = e;
      },
      infiniteDone() {
        this.infiniteLoading = false
      },
      onScroll(e) {
        if (!this.enableInfinite || this.infiniteLoading) {
          return
        }
        let outerHeight = this.$el.clientHeight;
        let innerHeight = this.$el.querySelector('.scroll_inner').clientHeight;
        let scrollTop = this.$el.scrollTop;
        let ptrHeight = this.onScrollTop ? this.$el.querySelector('.scroll-pull-refresh').clientHeight : 0
        let infiniteHeight = this.$el.querySelector('.scroll-load-more').clientHeight
        let bottom = innerHeight - outerHeight - scrollTop - ptrHeight;
        if (innerHeight>outerHeight && bottom <= infiniteHeight) this.infinite()
      }
    }
  }
</script>
<style>
    .scroll_wrap {
        width: 100%;
        position: relative;
        flex: 1;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
    }
    .scroll_inner {
        position: absolute;
        top:-40px;
        width: 100%;
        transition-duration: 300ms;
    }
    .scroll_touch{
        transition-duration: 0ms;
    }
    .scroll-pull-refresh span,.scroll-load-more span{
        font-size: 16px;
    }
    .scroll-pull-refresh{
        text-align: center;
        line-height: 40px;
    }
    .scroll_wrap.s_down .down-tip {
        display: block;
    }
    .scroll_wrap.s_up .up-tip {
        display: block;
    }
    .scroll_wrap.refresh .refresh-tip {
        display: block;
    }
    .scroll_wrap .down-tip,
    .scroll_wrap .refresh-tip,
    .scroll_wrap .up-tip {
        display: none;
    }
    .scroll-load-more{
        text-align: center;
        line-height: 40px;
    }
</style>