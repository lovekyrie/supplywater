<style lang="less">
  #header{
    width: 100%;
    padding: 0;
    height: .8rem;
    background: #f8f8f8;
    border-bottom: 1px solid #e2e2e2;
    position: relative;
    font-size: .1rem;
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
        padding: .05rem;
        border: 1px solid #e2e2e2;
        border-radius: 3px;
      }
      img{
        width: .3rem;
      }
    }
    .add{
      left: 80%;
      span{
        position: absolute;
        top: 50%;
        font-size: .2rem;
        transform: translateY(-50%);
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
       <p class="add">
       <span v-if="add" @click="toAdd">新建</span>
       </p>
       <p class="right">
         <img src="./img/search.png" v-if="search" @click="goSearch()"/>
       </p>
  </div>
</template>

<script>

    export default {
        name: 'App',
        props:{
          title:{
            type:String,
            default:''
          },
          search:{
            type:Boolean,
            default:false
          },
          appBack:{
            type:Boolean,
            default:false
          },
          add:{
            type:Boolean,
            default:false
          }
        },
        
        mounted(){
           // this.abc();

        },
        methods: {
            back(){
                if(this.appBack){
                    this.app.InterfaceName('h5_historyBack',{})
                }else {
                    window.history.go(-1)
                }
            },

            goSearch(){
                let url = 'search.html'
                window.location.href = url
                // this.app.InterfaceName('h5_Jump',url)
            },
            toAdd(){
              let addUrl='add.html'
              window.location.href=addUrl
            }
        }
    }
</script>

