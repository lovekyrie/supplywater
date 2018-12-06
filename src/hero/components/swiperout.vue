<template>
    <div class="swiperout-wrap" @touchstart="touchStart($event)"
         @touchmove="touchMove($event)"
         @touchend="touchEnd($event)"
         :class="{scroll_touch:touching}"
         :style="{ transform: 'translate3d(-'+left+'px, 0, 0)' }">
        <slot name="s-content"></slot>
        <div class="swiperout-btn" @touchstart.stop="" @touchmove.stop="" @touchend.stop="">
            <div @touchend.stop="cb" class="s-event">
                <slot name="s-btn"></slot>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
      data(){
        return{
          left: 0,//移动坐标
          startX: 0,//起始X
          startY: 0,//起始Y
          scrolled:false,//是否已经有滑动方向
          direction:null,//滑动方向  3,4 左右
          touching:false,//移动中
          txtColor:false,//小键盘提示数字
          endX:'',//结束位置
          position:'r',//移动方向
          btnWidth:0
        }
      },
      mounted(){
        this.btnWidth = document.querySelector('.swiperout-btn').offsetWidth;
      },
      methods:{
        cb(){
          this.$emit('confirm');
        },
        touchStart(e){
          this.touching = true;
          this.startX = e.targetTouches[0].pageX;
          this.startY = e.targetTouches[0].pageY;
        },
        touchMove(e){
          let Touches = e.targetTouches[0];
          let pageX =  this.startX-Touches.pageX;
          if(!this.scrolled){
            this.scrolled = true;
            this.direction = this.getDirection(this.startX, this.startY, Touches.pageX, Touches.pageY);
          }
          if(this.direction == 3 || this.direction == 4){
            if(this.touching){
              //pageX +向左移动  -向右移动
              if (pageX != 0) e.preventDefault();
              let deletedW = this.btnWidth;
              if(pageX>0&&pageX<deletedW){
                if(this.position == 'l'){
                  return;
                }
                this.endX = pageX;
                this.left = pageX;
                return;
              }
              if(pageX>deletedW){
                if(this.position == 'l'){
                  return;
                }
                this.endX = deletedW;
                this.left = deletedW;
                return;
              }
              if(pageX<0&&pageX>-deletedW){
                if(this.position == 'r'){
                  return;
                }
                this.endX = -(deletedW-Math.abs(pageX));
                this.left = deletedW-Math.abs(pageX);
                return;
              }
              if(pageX<-deletedW){
                if(this.position == 'r'){
                  return;
                }
                this.endX = 0;
                this.left = 0;
                return;
              }
            }
          }
        },
        touchEnd(e){
          this.touching = false;
          this.scrolled = false;
          if(this.direction == 3 || this.direction == 4){
            let deletedW = this.btnWidth;
            if(this.endX == 0){
              this.position = 'r';
              return;
            }
            if(this.endX>0){
              this.position = 'l';
              this.left = deletedW;
            }
            if(this.endX<0){
              this.position = 'r';
              this.left = 0;
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
        }
      }

    }
</script>
<style lang="less">
.swiperout-wrap{
    width: 100%;
    position: relative;
    transition-duration:.3s;
}
.s-event{
    width: 100%;
    height: 100%;
}
.swiperout-btn{
    height: 100%;
    position: absolute;
    left: 100%;
    top: 0;
}
.scroll_touch{
    transition-duration: 0ms !important;
}
</style>
/**
* @premise 引入组件
* @param   @confirm 点击右侧滑动按钮事件
*/