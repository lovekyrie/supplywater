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
                <p>水箱编号：{{info.dispatchFromNm}}</p>
                <p>小区名称：{{info.bmNm}}</p>
                <p>实际完成时间：{{info.sendTm}}</p>
                <p>星期：{{info.dealLimit}}</p>
                <p>是否停水：{{info.reportMan}}</p>
                <p>行政区域：{{info.reportPhone }}</p>
                <p>容积（吨）：{{info.proLvNm}}</p>
                <p>清理容积：{{info.districtNm}}</p>
                <p>水箱数量：{{info.address}}</p>
                <p>备注描述：{{info.proContent}}</p>
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


