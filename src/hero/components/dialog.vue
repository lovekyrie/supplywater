<template>
    <div class="dialog-mask" v-show="showValue" @click="hide">
        <transition name="dialogShow">
            <div class="dialog-box" v-show="show" @click.stop="stopUp">
                <p class="dialog-title">提示</p>
                <p class="dialog-msg">{{text}}</p>
                <div class="dialog-btn">
                    <div>
                        <button @click="cancel" class="cancel">{{leftTxt}}</button>
                        <button @click="confirm" class="confirm">{{rightTxt}}</button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
  export default {
    data(){
      return{
        show:false,
        load:false,
        // showValue:false
      }
    },
    props:{
      text:{
        type:String,
        default:''
      },
      leftTxt:{
        type:String,
        default:'取消'
      },
      rightTxt:{
        type:String,
        default:'确定'
      },
        showValue:{
          type:Boolean,
          default:false
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
            },10)
          }
        }
      },
    },
    methods:{
      confirm(){
        this.hide();
        this.$emit('on-confirm');
      },
      cancel(){
        this.hide();
        this.$emit('on-cancel');
      },
      hide(){
        if(this.load){
          this.load = false;
          this.show = false;
          setTimeout(()=>{
            this.load = true;
            this.showValue = false;
          },300);
        }
      },
      stopUp(){

      }
    },
  }
</script>
<style lang="less">
    .dialog-mask{
        position: fixed;
        z-index: 502;
        left: 0;
        top:0;
        background-color: rgba(0, 0, 0, 0.6);
        width: 100%;
        height: calc(100%);
    }
    .dialog-box{
        width: 30%;
        margin: 100px auto 0 auto;
        background-color: white;
        border-radius: 5px;
        overflow: hidden;
        transition: all 0.3s;
        .dialog-title{
            font-size: 18px;
            font-weight: 600;
            padding: 15px;
            text-align: center;
        }
    }
    .dialog-msg{
        text-align: center;
        padding: 15px;
        font-size: 14px;
        min-height: 80px;
    }
    .dialog-btn{
        text-align: center;
        padding: 15px;

        &>div{
            text-align: right;

            button{
                display: inline-block;
                cursor: pointer;
                text-align: center;
                font-size: 14px;
                padding: 10px 15px;
                border-radius: 5px;

                &:first-child{
                    margin-right: 10px;
                }
            }
            .cancel{
                border:1px solid #dcdfe6;
                background-color: #fff;
                color: #606266;

                &:hover{
                    color: #409eff;
                    border-color: #c6e2ff;
                    background-color: #ecf5ff;
                }
            }
            .confirm{
                color: #fff;
                background-color: #409eff;
                border: 1px solid #409eff;
            }

            p{
                float: right;
                font-size: 14px;
                color: #666666;
                &:first-child{
                    border-right: 1px solid #D5D5D6;
                }
            }
        }
    }
    .dialogShow-enter,.dialogShow-leave-to{
        opacity: 0;
        margin: 50px auto 0 auto;
    }
    .dialogShow-enter-active,.dialogShow-leave-active{
        transition: all .3s;
    }
</style>