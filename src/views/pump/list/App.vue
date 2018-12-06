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
                    &:last-child{
                        text-align: right;
                        /*padding-right: 20px;*/
                        span{
                            display: inline-block;
                            width: 1rem;
                            text-align: center;
                            border: 1px solid #e2e2e2;
                            margin-left: .05rem;
                            line-height: .3rem;
                            height: .3rem;
                            border-radius: 5px;
                        }
                    }
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
        <p style="text-align: center; line-height: .3rem" v-show="total==0">暂无数据</p>

        <scroll  class="main" :on-reach-bottom="handleReachBottom">
                <Card dis-hover v-for="(item, index) in list" class="list" :key="index">
                    <div  @click="toDetail(item.phInfoPk)" >
                        <p>
                            <span>泵房编号：</span>{{item.phCd}}
                        </p>
                        <p>
                            <span>小区名称：</span>{{item.phNm}}
                        </p>
                        <p>
                            <span>分区情况：</span>{{item.waterSupplyAreaNm}}
                        </p>
                        <p>
                            <span>分区楼层：</span>{{item.rmks}}
                        </p>
                        <p>
                            <span>供水模式：</span>
                            <span v-if="item.negativePressure==1">无负压{{item.negativePressureNumber}}</span>
                            <span v-if="item.boxType==1">箱式{{item.boxTypeNumber}}</span>
                            <span v-if="item.waterBoxAndConversion==1">水箱+变频{{item.waterBoxAndConversionNumber}}</span>
                            <span v-if="item.powerFrequency==1">无负压{{item.powerFrequencyNumber}}</span>
                        </p>
                        <p>
                            <span>物业电话：</span>{{item.wyPhone}}
                        </p>
                        <img src="../components/img/toDetail.png"/>
                        <p>
                            <span @click.stop="map(item.lng,item.lat)">导航</span>
                            <span @click.stop="toEquip(item.estateNm)">拥有设备</span>
                        </p>

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
                title:'泵房档案查询',
                spinShow:false,
                noMore:false,
                pageNo:1,
                pageSize:10,
                total:0,
                list:[],

                districtCd:'',
                estateNm:'',//小区名称
                usageTm:'',//启用时间
                handOverTm:'',//交付时间
                phCd:'',  //泵房编号

            }
        },
        components:{
            Loading,myHeader
        },
        mounted() {
            let myData = JSON.parse(this.until.getQueryString('search'))
            console.log(myData)
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
                this.spinShow = true
                let $q = new Promise((resolve,reject)=>{
                    let query = new this.Query();

                    query.buildWhereClause('districtCd',this.districtCd,'LK');
                    query.buildWhereClause('estateNm',this.estateNm,'LK');
                    query.buildWhereClause('usageTm',this.usageTm,'LK');
                    query.buildWhereClause('handOverTm',this.handOverTm,'LK');

                    query.buildPageClause(this.pageNo,this.pageSize);
                    let param = query.getParam();
                    this.until.get('/ph/pumph/pagex',param)
                        .then(res=>{
                            if(res.status == 200){
                                this.spinShow = false
                                this.total = res.page.total
                                if(res.data.items){
                                    this.list.push(...res.data.items)
                                }

                            }
                            resolve('ok');
                        },err=>{});
                });
                return $q;

            },
            map(x,y){

                let url = y+','+x
                this.app.InterfaceName('h5_toPumbNavigation',url)
            },
            toDetail(ipPk){
                let url = 'detail.html?ipPk='+ipPk
                window.location.href = url
            },
            //到底部时触发
            handleReachBottom () {
                return new Promise(resolve => {
                    setTimeout(() => {
                        if(this.list.length < this.total){
                            this.pageNo++
                            this.getList()
                        }else {
                            this.noMore = true
                        }
                        resolve()
                    }, 2000);
                });
            },
            toEquip(estateNm){
                let url='../equipment/list.html?estateNm='+estateNm
                window.location.href = url

            }
        },

    }
</script>


