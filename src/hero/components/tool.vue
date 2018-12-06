<template>
    <div class="tool-mask" v-show="showValue">
        <transition name="toolfade">
            <div v-show="show" class="tool-box">{{text}}</div>
        </transition>
    </div>
</template>
<script>
    export default {
      data(){
        return{
          showValue:false,
          show:false
        }
      },
      props:{
        text:{
          type:String,
          default:''
        },
        times:{
          type:Number,
          default:3000
        }
      },
      watch:{
        showValue(val){
          if(val){
            setTimeout(()=>{
              this.show = true;
            },50);
          }
        }
      },
      methods:{
        hide(){
          this.show = false;
          setTimeout(()=>{
            this.showValue = false;
          },400);
        }
      }
    }
</script>
<style lang="less">
    .tool-mask{
        position: fixed;
        left: 0;
        top:0;
        z-index: 501;
        background-color:transparent;
        width: 100%;
        height: calc(100%);
        text-align: center;

        .tool-box{
            left: 50%;
            top:50px;
            transform: translate(-50%,0);
            position: absolute;
            text-align: left;
            min-width: 150px;
            max-width: 300px;
            line-height: 1.3;
            font-size: 14px;
            padding: 20px;
            background-color: white;
            border-radius: 5px;
            box-shadow:0 2px 12px 0 rgba(0,0,0,.2);
        }
    }
    .toolfade-enter,.toolfade-leave-to{
        transform: translate(-50%,-100%-50px) !important;
        opacity: 0;
    }
    .toolfade-enter-active,.toolfade-leave-active{
        transition: all .4s;
    }
</style>