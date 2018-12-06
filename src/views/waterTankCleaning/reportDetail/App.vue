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
                <p>小区名称：{{info.dispatchFromNm}}</p>
                <p>水箱（池）编号：{{info.bmNm}}</p>
                <p>地点：{{info.sendTm}}</p>
                <p>水箱容量（㎥）：{{info.dealLimit}}</p>
                <p>清洗消毒日期：{{info.reportMan}}</p>
                <p>清洗消毒人员：{{info.reportPhone }}</p>
                <p>放水时间：自{{info.proLvNm}}起，到 止；共1h</p>
                <p>清洗消毒时间：自{{info.proLvNm}}起，到 止；共1h</p>
                <p>使用药液名称：{{info.address}}</p>
                <p>配制浓度：{{info.proContent}}</p>
                <p>配制人员：{{info.receiveMsg}}</p>
                <p>监督人：{{info.arriveTm }}</p>
                <p>注水时间：自{{info.proLvNm}}起，到 止；共1h</p>
                <p>清洗、消毒有关记录：{{info.receiveTm }}</p>
                <p>水样采送人：{{info.endTm}}</p>
                <p>送检时间：{{info.receiveMan}}</p>
                <p>取报告时间：</p>
                <p>报告编号：</p>
                <p>水质监测结果：</p>
                <p>不合格处理意见：</p>
                <p>记录人：</p>
                <p>负责人：</p>
                <p>审核时间：</p>
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
                title:'清洗报表详情',
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


