<style lang="less" type="text/less">
    html,
    body {
        width: 100%;
        height: 100%;
        font-size: 0.1rem;
        #container {
            width: 100%;
            height: 100%;
            background-color: #f0f0f0;
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
            font-size: 0.16rem;
            text-indent: 15px;
            background: #f0f0f0;
            border-top: 1px solid #e1e1e1;
            border-bottom: 1px solid #e1e1e1;
            height: 0.4rem;
            line-height: 0.4rem;
        }
        .line {
            height: .16rem;
            background-color: #f0f0f0;
            border-top: 1px solid #e1e1e1;
            border-bottom: 1px solid #e1e1e1;
        }
        div {
            line-height: 0.2rem;
        }

        .deviceInfo {
            background-color: #ffffff;
            padding: .08rem 0 .08rem 10%;
            border-bottom: 1px solid #e1e1e1;
            p {
                font-size: .14rem;
                line-height: .3rem;
            }
        }

        /*图片旁的文字*/
        .text {
            width: 100%;
            position: relative;
            .ntu, .cl, .press2, .hz, .dy, .du, .statNm, .press1, .dl1, .dl2, .dl3 {
                position: absolute;
                font-size: .14rem;
                font-weight: 500;
                color: rgb(60, 60, 60);
                z-index: 999;
            }

            .ntu {
                top: 30%;
                left: 2.5%;
            }
            .cl {
                top: 38%;
                left: 2.5%;
            }
            .press2 {
                right: 2%;
                top: 40%;
            }
            .hz {
                right: 2%;
                top: 48%;
            }
            .dy {
                right: 2%;
                top: 56%;
            }
            .du {
                right: 2%;
                top: 64%;
            }
            .statNm {
                right: 2%;
                top: 72%;
            }
            .press1 {
                left: 28%;
                top: 22%;
            }
            .dl1 {
                left: 32%;
                top: 28%;
            }
            .dl2 {
                left: 38%;
                top: 50%;
            }
            .dl3 {
                top: 82%;
                left: 46%;
            }
            /*激活图片*/
            .actImg {
                position: absolute;
                width: 5%;
            }

            /*图片*/
            .devImg {
                width: 100%;
                display: flex;
                display: -webkit-flex;
                justify-content: center;
                background-color: #ffffff;

                > img {
                    width: 70%;
                    height: 100%;
                }
            }
        }

    }
</style>

<template>
    <div id="container">
        <myHeader :title="title"></myHeader>
        <div class="main">
            <h3>{{repInfo.address}}{{repInfo.datetimes}}</h3>
            <!--设备文字信息-->
            <div class="text">
                <span class="ntu">浊度：
                    <span style="font-size: .15rem;color: blue;text-decoration: underline">{{repInfo.ntu}}</span>
                NTU
                </span>

                <span class="cl">余氯：
                    <span style="font-size: .15rem;color: blue;text-decoration: underline">{{repInfo.cl}}</span>
                mg/l
                </span>

                <span class="press2">出水压力：
                    <span style="font-size: .15rem;color: blue;text-decoration: underline">{{repInfo.press2}}</span>
                MPa
                </span>

                <span class="hz">频率：
                    <span style="font-size: .15rem;color: blue;text-decoration: underline">{{repInfo.hz}}</span>
                Hz
                </span>

                <span class="dy">电压：
                    <span style="font-size: .15rem;color: blue;text-decoration: underline">{{repInfo.dy}}</span>
                V
                </span>

                <span class="du">电度：
                    <span style="font-size: .15rem;color: blue;text-decoration: underline">{{repInfo.du}}</span>
                kw.h
                </span>

                <span class="statNm">状态：
                    <span style="font-size: .15rem;color: blue;text-decoration: underline">自动</span>
                </span>

                <span class="press1">进水压力：
                    <span style="font-size: .15rem;color: blue;text-decoration: underline">{{repInfo.press1}}</span>
                MPa
                </span>

                <span class="dl1">电流：
                    <span style="font-size: .15rem;color: blue;text-decoration: underline">{{repInfo.dl1}}</span>
                A
                </span>

                <span class="dl2">电流：
                    <span style="font-size: .15rem;color: blue;text-decoration: underline">{{repInfo.dl2}}</span>
                A
                </span>

                <span class="dl3">电流：
                    <span style="font-size: .15rem;color: blue;text-decoration: underline">{{repInfo.dl3}}</span>
                A
                </span>
                <!--激活图片-->
                <img class="actImg" ref="actImg" src="http://111.2.25.208:6081/img/emqumentImg/PG3.bmp">

                <!--图片-->
                <div class="devImg">
                    <img src="http://111.2.25.208:6081/img/emqumentImg/PS3.bmp">
                </div>
            </div>
            <div class="line"></div>
            <div class="deviceInfo">
                <p>生产厂家：{{repInfo.product}}</p>
                <p>品牌：{{repInfo.pp}}</p>
                <p>型号：{{repInfo.xh}}</p>
                <p>功率：{{repInfo.gl}}</p>
                <p>流量：{{repInfo.ll}}</p>
                <p>扬程：{{repInfo.yc}}</p>
                <p>额定电流：{{repInfo.dl}}</p>
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
                title: "调度监控详情",
                pk: "",
                repInfo: {

                },
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
            this.pk = this.until.getQueryString("pk");
            this.getInfo();
        },
        methods: {
            getInfo() {
                this.until.get("/ph/equipment/info/" + this.pk).then(res => {
                    this.repInfo = res.data;
                }).then(()=>{
                    let img = this.$refs.actImg;
                    if(this.repInfo.dl1){
                        img.style.left = '44%';
                        img.style.top = '10%';

                    }
                    if(this.repInfo.dl2){
                        img.style.left = '53%';
                        img.style.top = '35%';
                    }
                    if(this.repInfo.dl3){
                        img.style.width = '5.8%'
                        img.style.left = '63%';
                        img.style.top = '60%';
                    }
                })
            }
        }
    };
</script>


