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
                <p>文件名称：{{info.dispatchFromNm}}</p>
                <p>文件类型名称：{{info.bmNm}}</p>
                <p>内容：{{info.sendTm}}</p>
            </div>
            <h3>
                在线文档
            </h3>
            <div>0</div>
        </div>
    </div>
</template>

<script>
    import Loading from "../../../hero/components/loading";
    import myHeader from "../components/myHead";
    export default {
        data() {
            return {
                title:'专家库详情',
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


