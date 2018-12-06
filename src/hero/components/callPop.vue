<template>
    <div class="pop-mask"  v-show="showValue" @click="hide">
        <transition name="popShow">
            <div class="pop-box" v-show="show" @click.stop="stopUp">
                <p class="pop-title">预约电话</p>
                <p class="pop-call" >400-0574-1111</p>
                <div class="pop-btn">
                    <p @click="hide">取消</p>
                    <a @click="hide" href="tel:400-8610177">呼叫</a>
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
    .pop-mask{
        position: fixed;
        z-index: 999;
        left: 0;
        top:0;
        background-color: rgba(0, 0, 0, 0.6);
        width: 100%;
        height: 100%;
    }
    .pop-box{
        position: absolute;
        width: 75%;
        background-color: white;
        border-radius: 5px;
        overflow: hidden;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%) scale(1);
        transition: all 0.3s;
        .pop-title{
            font-weight: 400;
            font-size: .28rem;
            line-height: .8rem;
            text-align: center;
        }
    }
    .pop-call{
        border-bottom: 1px solid #D5D5D6;
        color: red;
        font-size:.28rem;
        text-align: center;
        padding: 10px 10px 20px 10px;
    }
    .pop-btn{
        display: flex;
        text-align: center;
        line-height: .8rem;
        p{
            font-size: .28rem;
            color: #08c;
            flex: 1;
            border-right: 1px solid #D5D5D6;
        }
        a{
            font-size: .28rem;
            color: #08c;
            display: block;
            flex:1;
        }
    }
    .popShow-enter,.popShow-leave-to{
        opacity: 0;
        transform: translate(-50%,-50%) scale(1.2);
    }
    .popShow-enter-active,.popShow-leave-active{
        transition: all .3s;
    }
</style>

