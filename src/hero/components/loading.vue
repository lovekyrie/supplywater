<template>
    <div class="hero-loading" v-show="show">
        <div class="loading-box">
            <div class="loading-line">
                <div class="loading-leaf leaf-0"></div>
                <div class="loading-leaf leaf-1"></div>
                <div class="loading-leaf leaf-2"></div>
                <div class="loading-leaf leaf-3"></div>
                <div class="loading-leaf leaf-4"></div>
                <div class="loading-leaf leaf-5"></div>
                <div class="loading-leaf leaf-6"></div>
                <div class="loading-leaf leaf-7"></div>
                <div class="loading-leaf leaf-8"></div>
                <div class="loading-leaf leaf-9"></div>
                <div class="loading-leaf leaf-10"></div>
                <div class="loading-leaf leaf-11"></div>
            </div>
            <p class="loading-msg">{{text}}</p>
        </div>
    </div>
</template>
<script>
  export default {
    name: "loading",
    data(){
      return{
        // show:true
      }
    },
    props:['text','show'],
    methods:{}
  }
</script>
<style lang="less">
.hero-loading{
    position: fixed;
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 3000;
    left: 0;
    top:0;
    background-color: transparent;

    .loading-box{
        transform: translate(-50%,-50%);
        position: absolute;
        left: 50%;
        top: 50%;
        width: 35%;
        min-height: 120px;
        background-color: rgba(40,40,40,.75);
        padding: 10px 8px;
        border-radius: 5px;

        .loading-line{
            position: absolute;
            width: 0;
            z-index: 4000;
            left: 50%;
            top: 38%;
        }
        .loading-msg{
            text-align: center;
            font-size: 14px;
            margin-top: 80px;
            color: white;
        }
    }
}
.loading-leaf{
    position: absolute;
    top: -1px;
    opacity: .25;

    &:before{
        content: '';
        position:absolute;
        width: 9px;
        height: 3px;
        background-color: #d1d1d5;
        box-shadow:rgba(0,0,0,.0980392)0 0 1px;
        border-radius: 1px;
        transform-origin:left 50% 0;
    }
}
.leaf-0{
    animation: opa-0 1.25s linear infinite;
    &:before{
        transform:rotate(0deg) translate(9px,0);
    }
}
@keyframes opa-0 {
    0.01%, 0%, 60.01%, 100%{opacity:.25}
    0.02%{opacity:1}
}
.leaf-1{
    animation: opa-1 1.25s linear infinite;
    &:before{
        transform:rotate(30deg) translate(9px,0);
    }
}
@keyframes opa-1 {
    0%, 68.3433%, 8.34333%, 100%{opacity:.25}
    8.35333%{opacity:1}
}
.leaf-2{
    animation: opa-2 1.25s linear infinite;
    &:before{
        transform:rotate(60deg) translate(9px,0);
    }
}
@keyframes opa-2 {
    0%, 16.6767%, 76.6767%, 100%{opacity:.25}
    16.6867%{opacity:1}
}
.leaf-3{
    animation: opa-3 1.25s linear infinite;
    &:before{
        transform:rotate(90deg) translate(9px,0);
    }
}
@keyframes opa-3 {
    0%, 25.01%, 85.01%, 100%{opacity:.25}
    25.02%{opacity:1}
}
.leaf-4{
    animation: opa-4 1.25s linear infinite;
    &:before{
        transform:rotate(120deg) translate(9px,0);
    }
}
@keyframes opa-4 {
    0%, 33.3433%, 93.3433%, 100%{opacity:.25}
    33.3533%{opacity:1}
}
.leaf-5{
    animation: opa-5 1.25s linear infinite;
    &:before{
        transform:rotate(150deg) translate(9px,0);
    }
}
@keyframes opa-5 {
    0%, 100%{opacity:.270958333333333}
    1.67667%, 41.6767%{opacity: .25;}
    41.6867%{opacity:1}
}
.leaf-6{
    animation: opa-6 1.25s linear infinite;
    &:before{
        transform:rotate(180deg) translate(9px,0);
    }
}
@keyframes opa-6 {
    0%, 100%{opacity:.375125}
    10.01%, 50.01%{opacity: .25;}
    50.02%{opacity:1}
}
.leaf-7{
    animation: opa-7 1.25s linear infinite;
    &:before{
        transform:rotate(210deg) translate(9px,0);
    }
}
@keyframes opa-7 {
    0%, 100%{opacity:.479291666666667}
    18.3433%, 58.3433%{opacity: .25;}
    58.3533%{opacity:1}
}
.leaf-8{
    animation: opa-8 1.25s linear infinite;
    &:before{
        transform:rotate(240deg) translate(9px,0);
    }
}
@keyframes opa-8 {
    0%, 100%{opacity:.583458333333333}
    26.6767%, 66.6767%{opacity: .25;}
    66.6867%{opacity:1}
}
.leaf-9{
    animation: opa-9 1.25s linear infinite;
    &:before{
        transform:rotate(270deg) translate(9px,0);
    }
}
@keyframes opa-9 {
    0%, 100%{opacity:.687625}
    35.01%, 75.01%{opacity: .25;}
    75.02%{opacity:1}
}
.leaf-10{
    animation: opa-10 1.25s linear infinite;
    &:before{
        transform:rotate(300deg) translate(9px,0);
    }
}
@keyframes opa-10 {
    0%, 100%{opacity:.791791666666667}
    43.3433%, 83.3433%{opacity: .25;}
    83.3533%{opacity:1}
}
.leaf-11{
    animation: opa-11 1.25s linear infinite;
    &:before{
        transform:rotate(330deg) translate(9px,0);
    }
}
@keyframes opa-11 {
    0%, 100%{opacity:.895958333333333}
    51.6767%, 91.6767%{opacity: .25;}
    91.6867%{opacity:1}
}
</style>