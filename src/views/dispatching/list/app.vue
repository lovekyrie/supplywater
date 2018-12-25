<style lang="less" type="text/less">
    html, body {
        width: 100%;
        height: 100%;
        font-size: .1rem;
        #container {
            width: 100%;
            height: 100%;
            display: flex;
            display: -webkit-flex;
            flex-direction: column;
        }
    }

    .main {
        flex: 1;
        width: 100% !important;
        overflow-y: auto;
        .ivu-scroll-container {
            /*overflow-y:auto;*/
            height: 100% !important;
            .ivu-card-body {
                position: relative;
                p {
                    line-height: 0.30rem;
                    &:last-child {
                        text-align: right;
                        /*padding-right: 20px;*/
                        span {
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
                img {
                    position: absolute;
                    right: 20px;
                    top: 40%;
                    width: .3rem;
                    /*transform: rotate(180deg);*/
                    /*-ms-transform: rotate(180deg);		!* IE 9 *!*/
                    /*-webkit-transform: rotate(180deg);	!* Safari and Chrome *!*/
                    /*-o-transform: rotate(180deg);		!* Opera *!*/
                    /*-moz-transform: rotate(180deg);		!* Firefox *!*/
                }
                span.btn {
                    position: absolute;
                    right: 20px;
                    bottom: 20px;
                    display: block;
                    padding: .05rem .2rem;
                    border: 1px solid #e2e2e2;
                    border-radius: 3px;
                }
            }

            /*水压等信息内容*/
            .deviceInfo{
                width: 100%;
                tr{
                    height: .3rem;
                }
                td.active{
                    color: red;
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

        <scroll class="main" :on-reach-bottom="handleReachBottom">
            <Card dis-hover v-for="(item, index) in list" class="list" :key="index">
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
                    <!--水压信息-->
                    <table class="deviceInfo">
                        <tr>
                            <td>进水压力：{{item.press1}}</td>
                            <td>出水压力：{{item.press2}}</td>
                            <td>出水设定压力：{{item.pressset}}</td>
                            <td>浊度：{{item.ntu}}</td>
                            <td>余氯：{{item.cl}}</td>
                        </tr>
                        <tr>
                            <td>1#电流：{{item.dl1}}</td>
                            <td>2#电流：{{item.dl2}}</td>
                            <td>3#电流：{{item.dl3}}</td>
                            <td>4#电流：{{item.dl4}}</td>
                        </tr>
                        <tr>
                            <td :class="{active:item.pump1bp=='1'}">1#泵：{{item.pump1bp | display}}</td>
                            <td :class="{active:item.pump2bp=='1'}">2#泵：{{item.pump2bp | display}}</td>
                            <td :class="{active:item.pump3bp=='1'}">3#泵：{{item.pump3bp | display}}</td>
                            <td :class="{active:item.pump4bp=='1'}">4#泵：{{item.pump4bp | display}}</td>
                        </tr>
                    </table>
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
                title: '调度监控查询',
                spinShow: true,
                noMore: false,
                pageNo: 1,
                pageSize: 10,
                total: 1,
                list: [],

                //搜索字段
                monEquipmentPk:'', //编号
                product:'', //设备名称
                address:'', //泵站名称
                area:'', //区域

            }
        },
        components: {
            Loading, myHeader
        },
        mounted() {
            let myData = JSON.parse(this.until.getQueryString('search'))
            console.log(myData);
            if (myData) {
                this.monEquipmentPk = myData.monEquipmentPk;
                this.product = myData.product;
                this.address = myData.address;

                if(myData.area){
                    switch (myData.area){
                        case '70000.10':this.area = '鄞州';break;
                        case '70000.20':this.area = '海曙';break;
                        case '70000.30':this.area = '江北';break;
                        case '70000.40':this.area = '镇海';break;
                        case '70000.50':this.area = '北仑';break;
                        case '70000.60':this.area = '江东';break;
                        default:this.area='';break;
                    }
                }

                // this.usageTm = myData.usageDate+' '+myData.usageTime
                // this.handOverTm = myData.handOverDate+' '+myData.handOverTime
                //
                // this.districtCd = myData.districtCd
                // this.estateNm = myData.estateNm
                // this.phCd = myData.phCd
            }

            this.getList()
        },
        filters: {
            display(i){
                if(i=='1'){
                    return i = '变频';
                }else{
                    return i = '停止';
                }
            }
        },
        methods: {
            getList() {
                this.spinShow = false;
                let $q = new Promise((resolve, reject) => {
                    let query = new this.Query();

                    //搜索功能函数,查询特定数据下的信息
                    query.buildWhereClause('monEquipmentPk', this.monEquipmentPk, 'LK');
                    query.buildWhereClause('product', this.product, 'LK');
                    query.buildWhereClause('address', this.address, 'LK');
                    query.buildWhereClause('area', this.area, 'LK');



                    // query.buildWhereClause('districtCd',this.districtCd,'LK');
                    // query.buildWhereClause('estateNm',this.estateNm,'LK');
                    // query.buildWhereClause('usageTm',this.usageTm,'LK');
                    // query.buildWhereClause('handOverTm',this.handOverTm,'LK');

                    query.buildPageClause(this.pageNo, this.pageSize);
                    let param = query.getParam();
                    this.until.get('/ph/equipment/pagex', param)
                        .then(res => {
                            if (res.status == 200) {
                                this.spinShow = false
                                this.total = res.page.total
                                if (res.data.items) {
                                    this.list.push(...res.data.items)
                                }

                            }
                            resolve('ok');
                        }, err => {
                        });
                });
                return $q;

            },

            toDetail(pk) {
                let url = 'detail.html?pk=' + pk;
                window.location.href = url
            },
            //到底部时触发
            handleReachBottom() {
                return new Promise(resolve => {
                    setTimeout(() => {
                        if (this.list.length < this.total) {
                            this.pageNo++
                            this.getList()
                        } else {
                            this.noMore = true
                        }
                        resolve()
                    }, 2000);
                });
            },
        },

    }
</script>


