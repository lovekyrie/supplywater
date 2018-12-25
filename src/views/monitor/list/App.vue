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
        <myHeader :title="title" search="searchPlan" appBack="true"></myHeader>
            <scroll  class="main" :on-reach-bottom="handleReachBottom">
                <Card dis-hover v-for="(item, index) in list" class="list" :key="index" >
                    <div @click="toDetail(item.monEquipmentPk)">
                        <p>
                            <span>编号：</span>{{item.monEquipmentPk}}
                        </p>

                        <p>
                            <span>名称：</span>{{item.address}}
                        </p>
                        <p>
                            <span>通讯状态：</span>{{item.datetimes}}
                        </p>
                        <ul>
                            <li>
                                进水压力：{{item.press1}}<br/>
                                1#电流：{{item.dl1}}<br/>
                                1#泵：{{item.pump1bp==0?'停止':'变频'}}
                            </li>
                            <li>
                                出水压力： {{item.press2}}<br/>
                                2#电流：{{item.dl2}}<br/>
                                2#泵：{{item.pump2bp==0?'停止':'变频'}}
                            </li>
                            <li>
                                出水设定压力：{{item.pressset}}<br/> 
                                3#电流：{{item.dl3}}<br/>
                                3#泵：{{item.pump3bp==0?'停止':'变频'}}
                            </li>
                            <li>
                                浊度：{{item.ntu}}<br/>
                                4#电流：{{item.dl4}}<br/>
                                4#泵：{{item.pump4bp==0?'停止':'变频'}}
                            </li>
                            <li>
                                余氯：{{item.cl}}
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
                    //this.until.get('/ph/dispatchSend/page',param)
                     this.until.get('/ph/equipment/pagex',param)
                     .then(res=>{
                            this.spinShow = false

                            if(res.status == 200 && res.data.items){
                                this.list.push(...res.data.items)
                                console.log(this.list);
                                
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


