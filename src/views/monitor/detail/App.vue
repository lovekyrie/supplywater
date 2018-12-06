<style lang="less">
    html,body{
        width: 100%;
        height: 100%;
        font-size: .1rem;
        background: #f2f2f2;
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
            background: #ffffff;
            border-top:1px solid #e2e2e2 ;
            border-bottom:1px solid #e2e2e2 ;
            margin-top:15px;
            &:first-child{
                text-align: center;
            }
            >img{
                width: auto;
                max-width: 100%;
            }
            p{
                padding-left: .5rem;
            }
        }
    }
</style>

<template>
    <div id="container">
        <myHeader :title="title"></myHeader>
        <div class="main">
            <div>
                <img :src="info.dispatchFromNm"/>
            </div>
            <div>
                <p>生产厂家：{{info.dispatchFromNm}}</p>
                <p>品牌：{{info.bmNm}}</p>
                <p>型号：{{info.sendTm}}</p>
                <p>功率：{{info.dealLimit}}</p>
                <p>流量：{{info.reportMan}}</p>
                <p>扬程：{{info.reportPhone }}</p>
                <p>额定电流：{{info.proLvNm}}</p>
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
                title:'调度监控详情',
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


