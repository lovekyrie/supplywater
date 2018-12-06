<style lang="less">
    html,body{
        width: 100%;
        height: 100%;
        font-size: .1rem;
        #container{
            width: 100%;
            height: 100%;
            display: flex;
            display: -webkit-flex;
            flex-direction: column;
        }
    }


    .main{
        flex: 1;
        width: 100%!important;
        overflow-y: auto;
        .ivu-scroll-container{
            height: 100% !important;
            .ivu-card-body{
                position: relative;
                p{
                    line-height: 0.30rem;
                }
                img{
                    position: absolute;
                    right: 20px;
                    top:40%;
                    width: .3rem;
                }
                ul{
                    overflow: hidden;
                    width: 100%;
                    li{
                        width: 20%;
                        float: left;
                        line-height: 0.30rem;
                    }
                }
            }
        }
    }
</style>

<template>
    <div id="container">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <myHeader :title="title" search="searchPlan" indexBack="true"></myHeader>
            <scroll  class="main" :on-reach-bottom="handleReachBottom">
                <Card dis-hover v-for="(item, index) in list" class="list" :key="index" >
                    <div @click="toDetail(item.dispatchSendPk)">
                        <p>
                            <span>编号：</span>{{item.dispatchFromNm}}
                        </p>

                        <p>
                            <span>名称：</span>{{item.address}}
                        </p>
                        <p>
                            <span>通讯状态：</span>{{item.bmNm}}
                        </p>
                        <ul>
                            <li>
                                进水压力：<br/>
                                1#电流：<br/>
                                1#泵：
                            </li>
                            <li>
                                出水压力：<br/>
                                2#电流：<br/>
                                2#泵：
                            </li>
                            <li>
                                出水设定压力：<br/>
                                3#电流：<br/>
                                3#泵：
                            </li>
                            <li>
                                浊度：<br/>
                                4#电流：<br/>
                                4#泵：
                            </li>
                            <li>
                                余氯：
                            </li>
                        </ul>
                        <img src="../components/img/toDetail.png"/>
                    </div>

                </Card>

            </scroll>

    </div>
</template>

<script>
    import Loading from "../../../hero/components/loading";
    import myHeader from "../components/myHead";
    export default {
        data() {
            return {
                spinShow:false,//加载中
                title:'调度监控',
                list:[],
                pageNo:1,
                pageSize:10,
                total:''
            }
        },
        components:{
            Loading,myHeader
        },
        mounted() {
            let myData = JSON.parse(this.until.getQueryString('search'))
            if(myData){

                this.usageTm = myData.usageDate+' '+myData.usageTime
                this.handOverTm = myData.handOverDate+' '+myData.handOverTime

                this.districtCd = myData.districtCd
                this.estateNm = myData.estateNm
                this.phCd = myData.phCd
            }
            this.getList()
        },
        methods: {
            getList(){
                let $q = new Promise((resolve,reject)=>{
                    let query = new this.Query();
                    // query.buildWhereClause('dealStatus',this.search.dealStatus,'LK');
                    // query.buildWhereClause('proLvNm',this.search.proLvNm,'LK');
                    // query.buildWhereClause('bmNm',this.search.bmNm,'LK');
                    query.buildPageClause(this.pageNo,this.pageSize);
                    let param = query.getParam();
                    this.until.get('/ph/dispatchSend/page',param)
                        .then(res=>{
                            this.spinShow = false

                            if(res.status == 200 && res.data.items){
                                this.list.push(...res.data.items)
                                this.total = res.page.total
                            }
                            resolve('ok');
                        },err=>{});
                });
                return $q;

            },
            toDetail(ipPk){
                let url = 'detail.html?ipPk='+ipPk
                window.location.href = url
                // this.app.InterfaceName('h5_Jump',url)
            },
            change(val){
              this.type = val
              this.list = []
              this.pageNo = 1
                this.spinShow = true
              this.getList()
            },
            //到底部时触发
            handleReachBottom () {
                return new Promise(resolve => {
                    setTimeout(() => {
                        if(this.list.length < this.total){
                            this.spinShow = true
                            this.pageNo++
                            this.getList()
                        }
                        resolve()
                    }, 2000);
                });
            },

        },

    }
</script>


