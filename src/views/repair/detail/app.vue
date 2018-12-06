<style lang="less" type="text/less">
    html,
    body {
        width: 100%;
        height: 100%;
        font-size: 0.1rem;
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
        width: 100%;
        overflow: auto;
        h3 {
            width: 100%;
            font-size: 0.15rem;
            text-indent: 15px;
            background: #f0f0f0;
            border-top: 1px solid #e1e1e1;
            border-bottom: 1px solid #e1e1e1;
            height: 0.4rem;
            line-height: 0.4rem;
        }
        div {
            padding: 10px 15px;
            line-height: 0.3rem;
        }
        table {
            width: 100%;
            background: #ffffff;
            border: 1px solid #e1e1e1;
            thead {
                tr {
                    display: flex;
                    flex-flow: row nowrap;
                    th {
                        padding: 10px 0;
                        color: #666666;
                        font-weight: normal;
                        text-align: center;
                        &:nth-of-type(1),
                        &:nth-of-type(5) {
                            width: 20%;
                        }
                        &:nth-of-type(3) {
                            width: 30%;
                        }
                        &:nth-of-type(2n) {
                            width: 10%;
                        }
                        &:not(:nth-last-of-type(1)) {
                            border-right: 1px solid #e1e1e1;
                        }
                    }
                }
            }
            tbody {
                tr {
                    display: flex;
                    flex-flow: row nowrap;
                    td {
                        padding: 10px 0;
                        color: #666666;
                        font-weight: normal;
                        text-align: center;
                        &:nth-of-type(1),
                        &:nth-of-type(5) {
                            width: 20%;
                        }
                        &:nth-of-type(3) {
                            width: 30%;
                        }
                        &:nth-of-type(2n) {
                            width: 10%;
                        }
                        &:not(:nth-last-of-type(1)) {
                            border-right: 1px solid #e1e1e1;
                        }
                    }
                }
            }
        }
    }
</style>

<template>
    <div id="container">
        <myHeader :title="title"></myHeader>
        <div class="main">
            <div>
                <p>设备编号：{{repInfo.deviceCd}}</p>
                <p>小区名称：{{repInfo.estateNm}}</p>
                <p>设备名称：{{repInfo.deviceScatNm}}</p>
            </div>
            <h3>维修申请</h3>
            <div>
                <p>维修单号：{{repInfo.billCode}}</p>
                <p>申请时间：{{repInfo.applicationTm}}</p>
                <p>申请单位：{{repInfo.applicantUnitNm}}</p>
                <p>申请人：{{repInfo.proposer}}</p>
                <p>联系电话：{{repInfo.mob }}</p>
                <p>维修单位：{{repInfo.repairUnitNm}}</p>
                <p>预算费用：{{repInfo.estimatedCost}}</p>
                <p>故障描述：{{repInfo.diagnosis}}</p>
            </div>
            <h3>维修过程</h3>
            <div>
                <p>维修级别：{{repInfo.repairLevel }}</p>
                <p>故障类型：{{repInfo.faultType}}</p>
                <p>维修人员：{{repInfo.serviceman}}</p>
                <p>维修状态：{{repInfo.statCd | toText}}</p>
                <p>完成时间：{{repInfo.complateTm}}</p>
                <p>维修用时（小时）：{{repInfo.repairUsedTm}}</p>
                <p>维修费用（元）：{{repInfo.repairCost}}</p>
                <p>故障分析及工作明细：{{repInfo.report}}</p>
            </div>
            <h3>更换配件</h3>
            <div>
                <p>是否更换配件：{{repInfo.replaceFittingNm}}</p>
                <!-- table -->
            </div>
            <table>
                <thead>
                <tr>
                    <th>配件编号</th>
                    <th>配件名称</th>
                    <th>规格型号</th>
                    <th>品牌</th>
                    <th>数量</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in repInfo.repairStockDtoxes">
                    <td>{{item.stockManageVo.deviceCd}}</td>
                    <td>{{item.stockManageVo.deviceNm}}</td>
                    <td>{{item.stockManageVo.deviceSpec}}</td>
                    <td>{{item.stockManageVo.deviceBrand}}</td>
                    <td>{{item.stockManageVo.num}}</td>
                </tr>
                </tbody>
            </table>

            <h3>反馈信息</h3>
            <div>
                <p>客户评价：{{repInfo.clientEvel}}</p>
                <p>详细意见：{{repInfo.option}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import Loading from "../../../hero/components/loading";
    import myHeader from "../components/myHead";

    export default {
        data() {
            return {
                title: "设备维修详情",
                regPk: "",
                repInfo: {},
            };
        },
        components: {
            Loading,
            myHeader
        },
        filters: {
            toText(i) {
                if (i) {
                    switch (i) {
                        case '30020.150':
                            return '待设备科确认';
                            break;
                        case '30020.160':
                            return '待上级领导确认';
                            break;
                        case '30020.160':
                            return '已确认';
                            break;
                        case '30020.160':
                            return '进行中';
                            break;
                        case '30020.160':
                            return '已完成';
                            break;
                        default:
                            return null;
                    }
                }

            }
        },
        mounted() {
            this.repPk = this.until.getQueryString("repPk");
            this.getInfo();
        },
        methods: {
            getInfo() {
                this.until.get("/ph/repairProcess/info/" + this.repPk).then(res => {
                    this.repInfo = res.data;
                })
            }
        }
    };
</script>


