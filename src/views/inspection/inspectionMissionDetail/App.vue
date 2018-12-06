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
                <p>巡检单位名称：{{info.dispatchFromNm}}</p>
                <p>小区名称：{{info.bmNm}}</p>
                <p>行政区域名称：{{info.sendTm}}</p>
                <p>供水模式：{{info.dealLimit}}</p>
                <p>设备套数：{{info.reportMan}}</p>
                <p>巡检计划时间：{{info.reportPhone }}</p>
                <p>计划完成时间：{{info.proLvNm}}</p>
                <p>巡检周期：{{info.districtNm}}</p>
                <p>巡检人姓名：{{info.address}}</p>
                <p>巡检人编号：{{info.proContent}}</p>
                <p>任务执行次数：{{info.receiveMsg}}</p>
                <p>巡检完成情况：{{info.arriveTm }}</p>
                <p>任务结束时间：{{info.startTm }}</p>
                <p>备注：{{info.receiveTm }}</p>
                <p>分类：{{info.endTm}}</p>
                <p>状态：{{info.receiveMan}}</p>
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
                this.until.get('/ph/dispatchSend/info/'+this.ipPk)
                    .then(res=>{
                        this.info = res.data
                    })
            }
        },


    }
</script>


