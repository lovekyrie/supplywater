<style lang="less" >
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
            >div{
                display: flex;
                display: -webkit-flex;
                height: 1.5rem;
                align-items: center;
                border-bottom: 1px solid #d2d2d2;
                p{
                    color: #333333;
                    flex: 1;
                    font-size: .3rem;
                    display: flex;
                    display: -webkit-flex;
                    align-items: center;
                    img{
                        margin-left: 40px;
                        margin-right: 30px;
                    }
                }
               /*  >img{
                    margin-right: 40px;
                    width: .3rem;
                } */
            }
        }
    }
</style>

<template>
 
    <div id="container">
        <myHeader  appBack="true"></myHeader>
       <!--  <header>
            <img src="./img/head_background.png"/>
            <p class="left">
                <img src="./img/backWhite.png" @click="back()"/>
            </p>
        </header> -->
        <div @click="toInspectionMission()">
            <p>
                <img src="./img/mission.png"/>
                巡检任务
            </p>
            <img src="../components/img/toDetail.png"/>
        </div>
        <div @click="toInspectionReprotList()">
            <p>
                <img src="./img/xunjianbaobiao.png"/>
                巡检报表
            </p>
            <img src="../components/img/toDetail.png"/>
        </div>
        <div @click="toOverdueInspection()">
            <p>
                <img src="./img/overdue.png"/>
                过期巡检
            </p>
            <img src="../components/img/toDetail.png"/>
        </div>
        <div @click="toOverdueInspectionGps()">
            <p>
                <img src="./img/guiji.png"/>
                巡检轨迹
            </p>
            <img src="../components/img/toDetail.png"/>
        </div>
       <!--  <div>
            <p>
                <img src="./img/weixiubaobiao.png"/>
                维修报表
            </p>
            <img src="../components/img/toDetail.png"/>
        </div> -->
    </div>
</template>

<script>
    import myHeader from "../components/myHead";
    export default {
        props:['appBack'],
        data() {
            return {
               title:'设备巡检',     
            }
        },
        components:{
            myHeader
        },
        mounted() {
            
        },
        methods: {

            toInspectionMission(){
                let url = 'inspectionMissionList.html'
                window.location.href = url
            },
            toInspectionReprotList(){
                let url='inspectionReportList.html'
                window.location.href = url
            },
            toOverdueInspection(){
                let url = 'OverdueInspectionList.html'
                window.location.href = url
            },
            toOverdueInspectionGps(){
                let url = 'inspectionGps.html'
                window.location.href = url
            },
            back(){
                if(this.appBack){
                    this.app.InterfaceName('h5_historyBack',{})
                }else {
                    window.history.go(-1)
                }
               
                // window.location.href = '../home/index.html'
               // this.app.InterfaceName('h5_historyBack',{})
            },
        },
    }
</script>


