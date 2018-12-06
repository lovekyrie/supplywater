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
        width: 100%;
        overflow: auto;
        h3{
            width: 100%;
            font-size: 0.15rem;
            text-indent: 15px;
            background: #f0f0f0;
            border-top:1px solid #e1e1e1;
            border-bottom:1px solid #e1e1e1;
            height: 0.4rem;
            line-height: 0.4rem;
        }
        div{
            padding: 10px 15px;
            line-height: 0.3rem;
        }
    }
</style>

<template>
    <div id="container">
        <myHeader :title="title"></myHeader>
        <div class="main">
            <div>
                <p>泵房编号：{{info.phCd}}</p>
                <p>行政区域名称：{{info.districtNm}}</p>
                <p>小区名称：{{info.estateNm}}</p>
                <p>设备大类：{{info.deviceBcatNm}}</p>
                <p>设备小类：{{info.deviceScatNm}}</p>
                <p>供水区域名称：{{info.waterSupplyAreaNm}}</p>
                <p>设备顺序号：{{info.deviceSn }}</p>
                <p>设备名称：{{info.deviceNm}}</p>
                <p>规格型号：{{info.deviceModel}}</p>
                <p>技术参数：{{info.deviceTechParam}}</p>
                <p>设备类型：{{info.deviceKindNm}}</p>
                <p>设备功率：{{info.devicePower}}</p>
                <p>制造单位：{{info.manuUnit}}</p>
                <p>供货单位：{{info.supplyer}}</p>
                <p>出厂日期：{{info.factoryTm}}</p>
                <p>质保日期：{{info.warranty}}</p>
                <p>安装日期：{{info.installTm}}</p>
                <p>投用日期：{{info.startUsingTm}}</p>
                <p>出厂编号：{{info.factoryCd}}</p>
                <p>资产编号：{{info.assetCd}}</p>
                <p>数量：{{info.deviceQty}}</p>
                <p>资产价值（元）：{{info.valueAmt}}</p>
                <p>报废年限：{{info.scrapYear}}</p>
                <p>保修年限：{{info.guaranteePeriod}}</p>
                <p>负责人：{{info.principal}}</p>
                <p>维护账号：{{info.usNm}}</p>
                <p>使用情况：{{info.usage}}</p>
                <p>责任单位名称：{{info.actUnitNm}}</p>
                <p>巡检人：{{info.inspector}}</p>
                <p>保养周期（天）：{{info.maintCyc}}</p>
                <p>上次保养时间：{{info.lastMaint}}</p>
                <p>下次保养时间：{{info.nextMaint}}</p>
                <p>保养人：{{info.mainter}}</p>
                <p>备注：{{info.rmks}}</p>
                <p>专用参数：{{info.specialParam}}</p>
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
                title:'设备详情',
                ipPk:'',
                info:{},
            }
        },
        components:{
            Loading,myHeader
        },
        mounted() {
            this.ipPk = this.until.getQueryString('ipPk')
            this.getInfo()
        },
        methods: {
            getInfo(){
                let $q = new Promise((resolve,reject)=>{

                    this.until.get('/ph/device/info/'+this.ipPk)
                        .then(res=>{
                            if(res.status == 200){
                                this.info = res.data
                            }
                            resolve('ok');
                        },err=>{});
                });
                return $q;
            }
        },


    }
</script>


