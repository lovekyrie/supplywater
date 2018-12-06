<style lang="less">
  #header{
    width: 100%;
    padding: 0;
    height: .8rem;
    background: #f8f8f8;
    border-bottom: 1px solid #e2e2e2;
    position: relative;
    p{
      height: .8rem;
      overflow: hidden;
      position: absolute;
      width: 100%;
    }
    img{
      width:.35rem;
      margin-left: .1rem;
    }
    .left{
      display: flex;
      display: -webkit-flex;
      align-items: center;
      font-size: .3rem;
      color: #333333;
        width: 2rem;
        z-index: 2;
    }
    .center{
      text-align: center;
      font-size: .3rem;
      color: #333333;
      line-height: .8rem;

    }
    .right{
      display: flex;
      display: -webkit-flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: .1rem;
      span{
        padding: .05rem 0.1rem;
        border: 1px solid #e2e2e2;
        border-radius: 3px;
          font-size: .2rem;
      }
      img{
        width: .3rem;
        margin: 0 .2rem;
      }
    }
  }
</style>

<template>
   <div id="header">
       <p class="left" >
         <img src="./img/back.png" @click="back()"/>
       </p>
       <p class="center">
         {{title}}
       </p>
       <p class="right">
         <span v-if="newCreated" @click="goCreate()">新建</span>
         <img src="./img/search.png" v-if="search" @click="goSearch(search)"/>
       </p>
  </div>
</template>

<script>

    export default {
        name: 'App',
        props:['title','newCreated','search','indexBack'],
        mounted(){
           // this.abc();

        },
        methods: {
            back(){
                if(this.indexBack){
                    // window.location.href = 'index.html'
                }else {
                    window.history.go(-1)
                }
            },
            goCreate(){

                let url = 'add.html'
                window.location.href = url
            },
            goSearch(val){
                let url = 'search.html'
                window.location.href = url
            }
        }
    }
</script>

