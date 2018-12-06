<style lang="less">
    body,html{
        width: 100%;
        height: 100%;
        background: #f2f2f2!important;
    }
    #container {
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        header{
            width: 100%;
            position: relative;
            padding: 0;
            >img{
                width: 100%;
                float: left;
                margin: 0!important;
            }
        }
        .main{
            flex: 1;
            font-size: .15rem;
            width: 100%;
            color: #666666;
            overflow: auto;
            >div{
                width: 100%;
                margin-bottom: 20px;
                background: #ffffff;
                .title{
                    font-size: .2rem;
                    color: #1b1b1b;
                    font-weight: bold;
                    padding-left: 25px;
                    border-bottom: 1px solid #e5e5e5;
                    height: .6rem;
                    display: flex;
                    display: -webkit-flex;
                    align-items: center;
                    overflow: hidden;
                    float: left;
                    width: 100%;
                    span{
                        background: #01afef;
                        display: block;
                        width: 5px;
                        height: 20px;
                        margin-right: 12px;
                    }
                }
                .content{
                    display: flex;
                    display: -webkit-flex;
                    flex-wrap: wrap;
					 width:100%;
                    span{
                        display: inline-block;
                        float: left;
                        text-align: center;
                        border-right: 1px solid #e5e5e5;

                        padding: .3rem 0;
						width: 25%;
                        box-sizing: border-box;
                        &:nth-child(4n){
                            border-right: 0;

                        }
                        img{
                            width: .6rem;
                            margin-bottom: .08rem;
                        }
                    }
                    p{
                        width: 100%;
                        padding: 0;
                        span{
                            border-bottom: 1px solid #e5e5e5;
                        }
                    }
                }

            }
        }
        footer{
            display: flex;
            display: -webkit-flex;
            border-top: 1px solid #e2e2e2;
            p{
                flex: 1;
                border-left: 1px solid #e2e2e2;
                text-align: center;
                line-height: .2rem;
                padding-top: .1rem;
                padding-bottom: .05rem;
                &:first-child{
                    border-left: 0;
                }
                img{
                    width: .2rem;
                }
            }
            p.active{
                color: #0381D8;
            }
        }
    }
</style>

<template>
    <div id="container">
        <!--<header>-->
            <!--<img src="./img/head_background.png"/>-->
        <!--</header>-->
        <div class="main">
            <div>
                <div class="title"><span></span>泵房管理</div>
                <div class="content">
                    <p>
                        <span @click="goYanShou()">
                            <img src="./img/yanshou.png"/><br/>
                            前期验收
                        </span>
                        <span @click="go('/views/pump/list.html')">
                            <img src="./img/bfda.png"/><br/>
                            泵房档案
                        </span>
                        <span @click="go('/views/equipment/list.html')">
                            <img src="./img/shebei.png"/><br/>
                            设备信息
                        </span>
                        <span @click="go('')">
                            <img src="./img/xunjian.png"/><br/>
                            设备巡检
                        </span>
                    </p>
                    <p>

                    </p>
                    <span @click="go('')">
                        <img src="./img/shuixiang.png"/><br/>
                        水箱清洗
                    </span>
                </div>
            </div>
            <div>
                <div class="title"><span></span>综合监控</div>
                <div class="content">
                    <span @click="go('')">
                        <img src="./img/tiaodu.png"/><br/>
                        调度监控
                    </span>
                    <span @click="go('')">
                        <img src="./img/jiangkong.png"/><br/>
                        门禁监控
                    </span>
                </div>
            </div>
            <div>
                <div class="title"><span></span>任务派单</div>
                <div class="content">
                    <span @click="go('/views/dispatch/list.html?type=1')">
                        <img src="./img/zhipai.png"/><br/>
                        工单指派
                    </span>
                    <span @click="go('/views/dispatch/list.html?type=2')">
                        <img src="./img/queren.png"/><br/>
                        工单确认
                    </span>
                    <span @click="go('/views/dispatch/list.html?type=3')">
                        <img src="./img/wancheng.png"/><br/>
                        完成工单
                    </span>
                </div>
            </div>
            <div>
                <div class="title"><span></span>应急救援</div>
                <div class="content">
                    <span @click="go('')">
                        <img src="./img/sos.png"/><br/>
                        救援文件
                    </span>
                </div>

            </div>
        </div>
        <!--<footer>-->
            <!--<p class="active">-->
                <!--<img src="./img/date.png"/><br/>-->
                <!--首页-->
            <!--</p>-->
            <!--<p>-->
                <!--<img src="./img/date.png"/><br/>-->
                <!--地图-->
            <!--</p>-->
            <!--<p>-->
                <!--<img src="./img/date.png"/><br/>-->
                <!--消息-->
            <!--</p>-->
            <!--<p>-->
                <!--<img src="./img/date.png"/><br/>-->
                <!--账号-->
            <!--</p>-->
        <!--</footer>-->
    </div>
</template>

<script>
  // import Divider from "vux/src/components/divider/index";
  export default {
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {
        //原生跳转
        go(url){
            this.app.InterfaceName('h5_Jump',url)
        },
        goYanShou(){
            this.app.InterfaceName('h5_beforcheck')
        }
    },

  }
</script>


