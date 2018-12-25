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
                    /*transform: rotate(180deg);*/
                    /*-ms-transform: rotate(180deg);		!* IE 9 *!*/
                    /*-webkit-transform: rotate(180deg);	!* Safari and Chrome *!*/
                    /*-o-transform: rotate(180deg);		!* Opera *!*/
                    /*-moz-transform: rotate(180deg);		!* Firefox *!*/
                }

            }
        }
    }
</style>

<template>
    <div id="container">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <myHeader :title="title" search="OverdueInspectionList"></myHeader>

            <scroll  class="main" :on-reach-bottom="handleReachBottom">
                <Card dis-hover v-for="(item, index) in list" class="list" :key="index" >
                    <div @click="toDetail(item.inspTaskPk)">
                        <p>
                            <span>区域：</span>{{item.districtNm}}
                        </p>
                        <p>
                            <span>供水模式：</span>{{item.waterSupplyModeNm}}
                        </p>
                        <p>
                            <span>小区名称：</span>{{item.estateNm}}
                        </p>
                        <p>
                            <span>巡检单位：</span>{{item.inspUnitNm}}
                        </p>
                        <p>
                            <span>巡检时间：</span>{{item.inspectPlanTime}}
                        </p>
                        <p>
                            <span>巡检人：</span>{{item.inspectorName}}
                        </p>
                        <p>
                            <span>巡检状态：</span>{{item.taskExeStatus | state}}
                        </p>
                        <p>
                            <span>任务结束时间：</span>{{item.taskEndTime}}
                        </p>
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
                title:'过期巡检',
                type:1, //tab类型
                list:[],
                listTotal:[],
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
                    query.buildWhereClause("taskExeStatus","逾期");
                    query.buildPageClause(this.pageNo,this.pageSize);
                    let param = query.getParam();
                    this.until.get('/ph/inspTask/page',param)
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
                let url = 'inspectionReportDetail.html?ipPk='+ipPk+'&title='+this.title
                window.location.href = url
                
            },
            change(val){
              this.type = val
              this.list = []
              this.listTotal = []
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
            toEdit(ipPk,val){
                let url='edit.html?type='+val+'&ipPk='+ipPk
                window.location.href = url
            }
        },

        filters:{
            state(val){
                if(val==0){
                    val='未确认'
                }
                if(val==1){
                    val='已确认'
                }
                if(val==2){
                    val='已接单'
                }
                if(val==3){
                    val='已处理'
                }
                if(val==4){
                    val='已回访'
                }
                if(val==5){
                    val='完成'
                }
                return val
            }
        }
    }
</script>


