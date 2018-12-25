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
            height: 100% !important;
            .ivu-card-body {
                position: relative;
                p {
                    line-height: 0.30rem;
                }
                img {
                    position: absolute;
                    right: 20px;
                    top: 40%;
                    width: .3rem;
                }
            }
        }
    }
</style>

<template>
    <div id="container">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <myHeader :title="title" search="searchPlan" appBack="true"></myHeader>
        <scroll class="main" :on-reach-bottom="handleReachBottom">
            <Card dis-hover v-for="(item, index) in list" class="list" :key="index">
                <div>
                    <p>
                        <span>设备名称：</span>{{item.deviceNm}}
                    </p>

                    <p>
                        <span>设备规格：</span>{{item.deviceSpec}}
                    </p>
                    <p>
                        <span>设备品牌：</span>{{item.deviceBrand}}
                    </p>
                    <p>
                        <span>数量：</span>{{item.num}}
                    </p>
                    <p>
                        <span>仓库名称：</span>{{item.warehouseNm}}
                    </p>
                    <p>
                        <span>仓库地址：</span>{{item.warehouseAddress}}
                    </p>
                    <p>
                        <span>负责人：</span>{{item.responUser}}
                    </p>
                    <p>
                        <span>联系电话：</span>{{item.userPhone}}
                    </p>
                </div>

            </Card>

        </scroll>

    </div>
</template>

<script>
    import Loading from "../../../hero/components/loading";
    import myHeader from "../components/myHead";
import { log } from 'util';

    export default {
        data() {
            return {
                spinShow: false,//加载中
                title: '备品备件查询',
                list: [],
                pageNo: 1,
                pageSize: 10,
                total: '',

                //    搜索数据
                warehouseCd: '', //仓库名称
                deviceNm: '',
                responUser: '', //品牌名称
                deviceSpec: '',//备品规格
                deviceBrand: '', //品牌名称
            }
        },
        components: {
            Loading, myHeader
        },
        mounted() {
            let myData = JSON.parse(this.until.getQueryString('search'))
            if (myData) {
                this.warehouseCd = myData.warehouseCd;
                this.deviceNm = myData.deviceNm;
                this.responUser = myData.responUser;
                this.deviceSpec = myData.responUser;
                this.deviceBrand = myData.deviceBrand;
            }
            this.getList()
        },
        methods: {
            getList() {
                let $q = new Promise((resolve, reject) => {
                    let query = new this.Query();

                    query.buildWhereClause('warehouseCd',this.warehouseCd,'LK');
                    query.buildWhereClause('deviceNm',this.deviceNm,'LK');
                    query.buildWhereClause('responUser',this.responUser,'LK');
                    query.buildWhereClause('deviceSpec',this.deviceSpec,'LK');
                    query.buildWhereClause('deviceBrand',this.deviceBrand,'LK');

                    query.buildPageClause(this.pageNo, this.pageSize);
                    let param = query.getParam();
                    this.until.get('/ph/stockManage/page', param)
                        .then(res => {
                            this.spinShow = false
                            if (res.status == 200 && res.data.items) {
                               
                                
                                this.list.push(...res.data.items)
                                this.total = res.page.total
                                 console.log(res.data.items);
                            }
                            resolve('ok');
                        }, err => {
                        });
                });
                return $q;
            },

            // change(val){
            //   this.type = val
            //   this.list = []
            //   this.pageNo = 1
            //     this.spinShow = true
            //   this.getList()
            // },
            //到底部时触发
            handleReachBottom() {
                return new Promise(resolve => {
                    setTimeout(() => {
                        if (this.list.length < this.total) {
                            this.spinShow = true
                            this.pageNo++
                            this.getList()
                        }
                        resolve()
                    }, 2000);
                });
            },

        },

        // filters:{
        //     state(val){
        //         if(val==0){
        //             val='未确认'
        //         }
        //         if(val==1){
        //             val='已确认'
        //         }
        //         if(val==2){
        //             val='已接单'
        //         }
        //         if(val==3){
        //             val='已处理'
        //         }
        //         if(val==4){
        //             val='已回访'
        //         }
        //         if(val==5){
        //             val='完成'
        //         }
        //         return val
        //     }
        // }
    }
</script>


