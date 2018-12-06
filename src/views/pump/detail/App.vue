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
                <p>泵房名称：{{info.phNm}}</p>
                <p>行政区域：{{info.districtNm}}</p>
                <p>小区名称：{{info.estateNm}}</p>
                <p>备案名：{{info.recordNm}}</p>
                <p>供水区域：{{info.splyDistNm}}</p>
                <p>供水模式是否为负压：{{info.negativePressure | isIf}}</p>
                <p>无负压个数：{{info.negativePressureNumber}}</p>
                <p>供水模式是否为箱式：{{info.boxType | isIf}}</p>
                <p>箱式个数：{{info.boxTypeNumber}}</p>
                <p>供水模式是否水箱+变频：{{info.waterBoxAndConversion | isIf}}</p>
                <p>水箱+变频个数：{{info.waterBoxAndConversionNumber}}</p>
                <p>供水模式是否工频：{{info.powerFrequency | isIf}}</p>
                <p>工频个数：{{info.powerFrequencyNumber}}</p>
                <p>移交时间：{{info.handOverTm}}</p>
                <p>启用时间：{{info.usageTm}}</p>
                <p>质保日期：{{info.zhibaoTm}}</p>
                <p>小区户数：{{info.familyQty}}</p>
                <p>小区幢数：{{info.buildingQty}}</p>
                <p>负责人：{{info.principal}}</p>
                <p>物业电话：{{info.wyPhone}}</p>
                <p>分区情况：{{info.waterSupplyAreaNm}}</p>
                <p>所属社区：{{info.shequ}}</p>
                <p>社区电话：{{info.sqPhone}}</p>
                <p>生消是否分开：{{info.sxFlag}}</p>
                <p>网络类型：{{info.webType | webState}}</p>
                <p>IP地址：{{info.ipAddr}}</p>
                <p>服务器地址：{{info.serverAddr}}</p>
                <p>宽带账号：{{info.bbAc}}</p>
                <p>宽带密码：{{info.bbPwd}}</p>
                <p>宽带运营商：{{info.bbOperator}}</p>
                <p>泵房位置纬度：{{info.lat}}</p>
                <p>泵房位置经度：{{info.lng}}</p>
                <p>泵房位置：{{info.phAddr}}</p>
                <p>地图资料：<img :src="info.map"/></p>
                <p>设备供应商名称：{{info.deviceSupplyerNm}}</p>
                <p>巡检单位名称：{{info.inspUnitNm}}</p>
                <p>巡检周数（个月）：{{info.inspCyc}}</p>
                <p>上次巡检时间：{{info.lastInsp}}</p>
                <p>下次巡检时间：{{info.nextInsp}}</p>
                <p>巡检人：{{info.inspector}}</p>
                <p>备注：{{info.rmks}}</p>
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
                title:'泵房详情',
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

                    this.until.get('/ph/pumph/info/'+this.ipPk)
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
        filters:{
            isIf(val){
                if(val==0){
                    val = '否'
                }
                if(val==1){
                    val = '是'
                }
                return val
            },
            webState(val){
                if(val==0){
                    val = '无线'
                }
                if(val==1){
                    val = '有线'
                }
                return val
            }
        }

    }
</script>


