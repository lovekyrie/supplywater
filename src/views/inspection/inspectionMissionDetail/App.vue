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
                <p>巡检单位名称：{{info.inspUnitNm}}</p>
                <p>小区名称：{{info.estateNm}}</p>
                <p>行政区域名称：{{info.districtNm}}</p>
                <p>供水模式：{{info.waterSupplyModeNm}}</p>
                <p>设备套数：{{info.deviceQty}}</p>
                <p>巡检计划时间：{{info.inspectPlanTime }}</p>
                <p>计划完成时间：{{info.inspectPlanDoneTime}}</p>
                <p>巡检周期：{{info.inspectCycle}}</p>
                <p>巡检人姓名：{{info.inspectorName}}</p>
                <p>巡检人编号：{{info.inspectorId}}</p>
                <p>任务执行次数：{{info.taskExeNum}}</p>
                <p>巡检完成情况：{{info.taskExeStatus }}</p>
                <p>任务结束时间：{{info.taskEndTime }}</p>
                <p>备注：{{info.rmks }}</p>
                <p>分类：{{info.catNm}}</p>
                <p>状态：{{info.statNm}}</p>
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
                title:'巡检任务详情',
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
                this.until.get('/ph/inspTask/info/'+this.ipPk)
                    .then(res=>{
                        this.info = res.data
                })
            }
        },


    }
</script>


