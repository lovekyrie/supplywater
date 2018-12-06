<template>
    <div class="confirm-mask"  v-show="showValue" @click="hide">
        <transition name="confirmShow">
            <div class="confirm-box" v-show="show" @click.stop="stopUp">
                <p class="confirm-title">提示</p>
                <p class="confirm-msg">{{msg}}</p>
                <div class="confirm-btn">
                    <p @click="cancel">{{leftTxt}}</p>
                    <p @click="confirm">{{rightTxt}}</p>
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
                load:true,
                showValue:false
            }
        },
        props:{
          msg:{
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
    .confirm-mask{
        position: fixed;
        z-index: 502;
        left: 0;
        top:0;
        background-color: rgba(0, 0, 0, 0.6);
        width: 100%;
        height: 100%;
    }
    .confirm-box{
        position: absolute;
        width: 75%;
        background-color: white;
        border-radius: 5px;
        overflow: hidden;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%) scale(1);
        transition: all 0.3s;
        .confirm-title{
            font-weight: 400;
            font-size: 16px;
            line-height: 40px;
            text-align: center;
        }
    }
    .confirm-msg{
        border-bottom: 1px solid #D5D5D6;
        color: red;
        font-size:16px;
        text-align: center;
        padding: 10px 10px 20px 10px;
    }
    .confirm-btn{
        display: flex;
        text-align: center;
        line-height: 40px;
        p{
            font-size: 14px;
            color: #666666;
            flex: 1;
            &:first-child{
                border-right: 1px solid #D5D5D6;
            }
        }
    }
    .confirmShow-enter,.confirmShow-leave-to{
        opacity: 0;
        transform: translate(-50%,-50%) scale(1.2);
    }
    .confirmShow-enter-active,.confirmShow-leave-active{
        transition: all .3s;
    }

</style>
/**
* @premise Vue.use(confirm)
* @param   msg:说明文字 onConfirm(){}确认 onCancel(){}取消
* @mode   this.$hero.confirm.show(param)
*/