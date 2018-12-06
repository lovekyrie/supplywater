<template>
  <div class="key-mask"  v-show="showValue" @click.stop="hide()">
    <div class="key-module" :class="{boardshow:show}" @click.stop="mask">
      <div class="board-title">
        <p class="board-val">{{total}}</p>
        <p class="board-sure" @click="submit">完成</p>
      </div>
      <div class="board-number">
        <p @click="inputs(1)">1</p>
        <p @click="inputs(2)">2</p>
        <p @click="inputs(3)">3</p>
      </div>
      <div class="board-number">
        <p @click="inputs(4)">4</p>
        <p @click="inputs(5)">5</p>
        <p @click="inputs(6)">6</p>
      </div>
      <div class="board-number">
        <p @click="inputs(7)">7</p>
        <p @click="inputs(8)">8</p>
        <p @click="inputs(9)">9</p>
      </div>
      <div class="board-number board-more">
        <p></p>
        <p @click="inputs(0)">0</p>
        <p @click="reduce" class="borad-delet"><i class="icon iconfont">&#xe76a;</i></p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
      data(){
        return{
          total:'0',
          show:false,
          load:true,
          showValue:false
        }
      },
      watch:{
        showValue(val){
          if(val){
            if(this.load){
                this.load = false;
                setTimeout(()=>{
                    this.load = true;
                    this.show = true;
                },50)
            }
          }
        },
      },
      methods:{
        inputs(val){
          if(this.total.length>7){
            return;
          }
          this.total = this.total == 0 ? val :'' + this.total + val ;
        },
        submit(){
          this.$emit('on-finish',parseInt(this.total),this.hide);
        },
        hide(){
          if(this.load){
              this.load = false;
              this.total=0;
              this.show = false;
              setTimeout(()=>{
                  this.load = true ;
                  this.showValue = false;
                  this.$emit('on-cancel');
              },300);
          }

        },
        reduce(){
          let str = this.total.toString();
          this.total= str.length==1 ? 0 : str.substring(0,str.length-1)
        },
        mask(){

        }
      },
  }
</script>
<style lang="less">
  @base: 18rem;
  .key-mask{
    position: fixed;
    z-index: 999;
    left: 0;
    top:0;
    background-color: transparent;
    width: 100%;
    height: 100%;
  }
  .key-module{
    font-size: 16px;
    width: 100%;
    position: absolute;
    z-index: 1000;
    left: 0;
    bottom:0;
    transform: translateY(100%);
    transition: all 0.3s;
    .board-title{
      width: 100%;
      padding: 0 10px;
      height: 50px;
      line-height: 50px;
      display: flex;
      background-color: #D3D3DB;
      p{
        flex: 1;
      }
      .board-val{
        font-weight: bold;
        color: #fe3001;
      }
      .board-sure{
        text-align: right;
      }
    }
    .board-number{
      background-color: white;
      width: 100%;
      display: flex;
      border-bottom: 1px solid #d5d5d5;

      p{
        height: 55px;
        font-weight: 600;
        text-align: center;
        flex: 1;
        line-height: 55px;
        &:nth-child(even){
          border-left: 1px solid #d5d5d5;
          border-right:1px solid #d5d5d5;
        }
      }
    }
    .board-more p:nth-child(odd){
      background-color: #D3D3DB;
    }
    .borad-delet{
      i{
        display: inline-block;
        transform: rotate(90deg);
        font-size: 25px;
      }
    }
  }
  .boardshow{
    transform: translateY(0);
  }

</style>
/**
* @premise Vue.use(keyboard)
* @param   onFinish:完成之后 传出一个已选择数字 onCancel:隐藏
* @mode   this.$hero.KeyBoard.show
*/