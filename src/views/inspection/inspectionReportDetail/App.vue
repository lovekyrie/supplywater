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
        >div{
            padding: 10px 15px;
            line-height: 0.3rem;
            div{
                display: flex;
                display: -webkit-flex;
                margin: 5px 0;
                p:last-child{
                    flex: 1;
                }
            }
        }
    }
</style>

<template>
    <div id="container">
        <myHeader :title="title"></myHeader>
        <div class="main">
            <h3>基础信息</h3>
            <div>
                <p>设备名称：{{info.inspectorName}}</p>
                <p>设备编号：{{info.bmNm}}</p>
                <p>小区名称：{{info.estateName}}</p>
                <p>巡检日期：{{info.dealLimit}}</p>
                <p>巡检单位：{{info.inspectUnit}}</p>
                <p>巡检人：{{info.reportPhone }}</p>
                <p>供水方式：{{info.waterSupplyMode}}</p>
                <p>供水分区：{{info.waterSupplyArea}}</p>
                <p>其他需要说明的问题：{{}}</p>
            </div>
            <h3>泵房设施</h3>
            <div>
                <p>水泵运行编号：{{info.pumpRunningIdSuperHigh }}</p>
                <p>进水压力（Mpa）：{{info.inletPressureSuperHigh}}</p>
                <p>出水压力（Mpa）：{{info.effluentPressureSuperHigh }}</p>
                <p>电流（A）：{{info.electricCurrentSuperHigh }}</p>
                <p>变频器频率（Hz）：{{info.converterFrequencySuperHigh }}</p>
                <p>电度表读数（度）：{{info.ammeterDegree }}</p>
                <div style="border-top: 1px solid #f2f2f2; margin-top: 15px; padding-top: 10px">
                    <p>
                        1、电源控制箱：
                    </p>
                    <p>
                        接线：<br/>
                        空气开关：<br/>
                        电子元气件：<br/>
                        电度表：
                    </p>
                </div>
                <div>
                    <p>
                        2、电源控制箱：
                    </p>
                    <p>
                        指示灯：<br/>
                        防水：<br/>
                        防尘：<br/>
                        内接电路：<br/>
                        电气元件：<br/>
                        每季对控制柜进行除尘：  <br/>
                        除尘日期：
                    </p>
                </div>
                <div>
                    <p>
                        3、变频器：
                    </p>
                    <p>
                        运转：<br/>
                        是否在最佳工作状态：
                    </p>
                </div>
                <div>
                    <p>
                        4、PLC运转：正常
                    </p>
                </div>
                <div>
                    <p>5、</p>
                    <p>
                        远程通讯状态：正常<br/>
                        数据远传参数：正常
                    </p>

                </div>
                <div>
                    <p>
                        6、
                    </p>
                    <p>
                        压力表：<br/>
                        压力变送器：
                    </p>
                </div>
                <div>
                    <p>
                        7、水泵：
                    </p>
                    <p>
                        运行：<br/>
                        噪音：<br/>
                        震动：<br/>
                        泵体是否发热：<br/>
                        水泵排气：<br/>
                        机械密封：
                    </p>
                </div>
                <div>
                    <p>
                        8、电机：
                    </p>
                    <p>
                        运行：<br/>
                        电机电流：<br/>
                        电机是否发热：
                    </p>
                </div>
                <div>
                    <p>
                        9、
                    </p>
                    <p>
                        水泵、管道、阀门、压力水容器等密封情况：
                    </p>
                </div>
                <div>
                    <p>
                        10、
                    </p>
                    <p>
                        每季检查水泵远程启闭功能是否完好：<br/>
                        检查日期：
                    </p>
                </div>
                <div>
                    <p>
                        11、排污泵控制箱：
                    </p>
                    <p>
                        接线：<br/>
                        空气开关：<br/>
                        电子元气件：<br/>
                        排污泵运行情况：
                    </p>
                </div>
                <div>
                    <p>
                        12、
                    </p>
                    <p>
                        无负压设备罐体排污情况：
                    </p>
                </div>
            </div>
            <h3>水箱（池）</h3>
            <div>
                <p>1、水箱（池）与水泵联运系统运转情况：{{info.waterPoolAndPumpLinkage }}</p>
                <div>
                    <p>
                        2、
                    </p>
                    <p>
                        电动蝶阀使用情况：<br/>
                        液位控制器使用情况：<br/>
                        浮球阀使用情况：
                    </p>
                </div>
                <p>3、每季检查电动碟阀远程启闭功能完好情况：{{info.checkElectricBufferValveRemoteOnOffPerSeason}}；检查日期</p>
                <p>4、水箱（池）是否有泄露现象：{{info.waterPoolLeaking}}</p>
                <p>5、水箱（池）水位是否正常：{{info.waterLevelOfPool}}  水位显示 米</p>
                <p>6、水箱加盖上锁情况：{{info.waterPoolCoverLocked}}</p>
            </div>
            <h3>门禁视频</h3>
            <div>
                <div>
                    <p>
                        1、门禁系统使用情况：
                    </p>
                    <p>
                        刷卡开门：<br/>
                        水位报警：
                    </p>
                </div>
                <div>
                    <p>
                        2、视频系统使用情况：
                    </p>
                    <p>
                        球体摄像头方向：
                    </p>
                </div>
            </div>
            <h3>其他设施</h3>
            <div>
                <p>
                 1、泵房潮湿情况评定：
                </p>
                <p>
                    2、泵房照明情况：
                </p>
                <p>
                    3、泵房内设备整洁情况：
                </p>
                <p>
                    4、灭火器情况：
                </p>
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
                title:'报表详情',
                ipPk:'',
                info:{},
            }
        },
        components:{
            Loading,myHeader
        },
        mounted() {
            this.title = this.until.getQueryString('title')+'详情'
            this.ipPk = this.until.getQueryString('ipPk')
            this.getInfo()
        },
        methods: {
            getInfo(){
                this.until.get('/ph/InspReport/info/'+this.ipPk)
                    .then(res=>{
                        this.info = res.data
                    })
            }
        },


    }
</script>


