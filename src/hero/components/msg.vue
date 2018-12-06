<template>
    <div class="msg-mask" v-show="showValue">
        <transition name="msgfade">
            <div v-show="show" class="mgs-box">{{text}}</div>
        </transition>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                showValue:false,
                show:false,
            }
        },
        props:{
            text:{
                type:String,
                default:''
            },
            times:{
                type:Number,
                default:1000
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
                },300);
            }
        }

    }
</script>
<style lang="less">
    .msg-mask{
        position: fixed;
        left: 0;
        top: 0;
        z-index: 5001;
        width: 100%;
        height: 100%;
        background-color: transparent;
    }
    .mgs-box{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: rgba(0,0,0,.7);
        color: white;
        line-height: 1.2;
        text-align: center;
        padding: 15px;
        max-width: 80%;
        min-width: 20%;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 500;
    }
    .msgfade-enter,.msgfade-leave-to{
        opacity: 0;
    }
    .msgfade-enter-active,.msgfade-leave-active{
        transition: all .3s;
    }
</style>
/**
* @premise Vue.use(msg)
* @param   text:说明文字 times:显示时间
* @mode   this.$hero.msg.show(param)
*/