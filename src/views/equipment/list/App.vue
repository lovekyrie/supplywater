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

    .menu{
        font-size: .2rem;
        width: 100%!important;
        display: flex;
        display: -webkit-flex;
        border-bottom: 1px solid #e2e2e2;
        line-height: 0.5rem;
        height: 0.5rem;
        background: #f2f2f2;
    }
    .main{
        flex: 1;
        width: 100%!important;
        overflow-y: auto;
        .ivu-scroll-container{
            /*overflow-y:auto;*/
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
                span.btn{
                    position: absolute;
                    right: 20px;
                    bottom: 20px;
                    display: block;
                    padding: .05rem .2rem;
                    border: 1px solid #e2e2e2;
                    border-radius: 3px;
                }
            }
        }
    }
</style>

<template>
    <div id="container">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <myHeader :title="title" search="true" appBack="true"></myHeader>
        <div class="menu" v-if="estateNm">
            （{{estateNm}}）小区设备登记表
        </div>
        <p style="text-align: center; line-height: .3rem" v-show="total==0">暂无数据</p>
            <scroll  class="main" :on-reach-bottom="handleReachBottom">
                <Card dis-hover v-for="(item, index) in list" class="list" :key="index">
                    <div @click="toDetail(item.phDevicePk)">
                        <p>
                            <span>设备名称：</span>{{item.deviceNm}}
                        </p>
                        <p>
                            <span>设备编码：</span>{{item.deviceCd}}
                        </p>
                        <p>
                            <span>泵房编号：</span>{{item.phCd}}
                        </p>
                        <p>
                            <span>小区名称：</span>{{item.estateNm}}
                        </p>
                        <p>
                            <span>设备大类：</span>{{item.deviceBcatNm}}
                        </p>
                        <p>
                            <span>设备小类：</span>{{item.deviceScatNm}}
                        </p>
                        <img src="../components/img/toDetail.png"/>
                    </div>

                </Card>

            </scroll>
        <p style="text-align: center; line-height: .3rem" v-show="noMore">数据已加载完</p>
    </div>
</template>

<script>
    import Loading from "../../../hero/components/loading";
    import myHeader from "../components/myHead";
    export default {
        data() {
            return {
                title:'设备信息查询',
                estateNm:'', //当前显示的小区名字
                spinShow:'',  //loading
                total:0,
                pageNo:1,
                pageSize:10,
                noMore:false,
                list:[],
                search:{
                    // estatePk:'',//小区主键
                    districtCd:'', //行政区域
                    deviceNm:'', //设备名称
                    supplyer:'', //供货单位
                    deviceBcatCd:'', //设备大类
                    deviceScatCd:'',//小类
                    waterSupplyAreaCd:'',//区域
                    warranty:'', //质保
                    installTm:'', //安装
                    startUsingTm:'', //投用
                    warrantyPassed:'', //过保
                }
            }
        },
        components:{
            Loading,myHeader
        },
        mounted() {
            this.estateNm = this.until.getQueryString('estateNm')
            // this.search.estatePk = this.until.getQueryString('estatePk')

            let myData =  JSON.parse(this.until.getQueryString('search'))
            console.log(myData)
            if(myData){
                this.search.districtCd = myData.districtCd
                this.search.deviceNm = myData.deviceNm
                this.estateNm = myData.estateNm
                this.search.supplyer = myData.supplyer
                this.search.deviceBcatCd = myData.deviceBcatCd
                this.search.deviceScatCd = myData.deviceScatCd
                this.search.waterSupplyAreaCd = myData.waterSupplyAreaCd
                this.search.warranty = myData.warrantyDate+' '+myData.warrantyTime
                this.search.installTm = myData.installDate+' '+myData.installTime
                this.search.startUsingTm = myData.startUsingDate+' '+myData.startUsingTime
                this.search.warrantyPassed = myData.warrantyPassed
            }
            this.getList()
        },
        methods: {
            getList(){
                this.spinShow = true
                let $q = new Promise((resolve,reject)=>{
                    let query = new this.Query();

                    // query.buildWhereClause('estatePk',this.search.estatePk,'LK');

                    query.buildWhereClause('estateNm',this.estateNm,'LK');
                    query.buildWhereClause('districtCd',this.search.districtCd,'LK');
                    query.buildWhereClause('deviceNm',this.search.deviceNm,'LK');
                    query.buildWhereClause('supplyer',this.search.supplyer,'LK');
                    query.buildWhereClause('deviceBcatCd',this.search.deviceBcatCd,'LK');
                    query.buildWhereClause('deviceScatCd',this.search.deviceScatCd,'LK');
                    query.buildWhereClause('waterSupplyAreaCd',this.search.waterSupplyAreaCd,'LK');
                    query.buildWhereClause('warranty',this.search.warranty,'LK');
                    query.buildWhereClause('installTm',this.search.installTm,'LK');
                    query.buildWhereClause('startUsingTm',this.search.startUsingTm,'LK');

                    query.buildWhereClause('warrantyPassed',this.search.warrantyPassed,'LK');

                    query.buildPageClause(this.pageNo,this.pageSize);
                    let param = query.getParam();
                    this.until.get('/ph/device/pagex',param)
                        .then(res=>{
                            if(res.status == 200){

                                if(res.data.items){
                                    this.list.push(...res.data.items)
                                }

                                this.total = res.page.total
                                this.spinShow = false
                            }
                            resolve('ok');
                        },err=>{});
                });
                return $q;

            },
            toDetail(ipPk){
                let url = 'detail.html?ipPk='+ipPk
                window.location.href = url
            },
            //到底部时触发
            handleReachBottom () {
                return new Promise(resolve => {
                    setTimeout(() => {
                        if(this.total>this.list.length){
                            this.pageNo++
                            this.getList()
                        }else {
                            this.noMore = true
                        }

                        resolve()
                    }, 2000);
                });
            },

        },
    }
</script>


