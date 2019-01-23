<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
  font-size: 0.1rem;
  #container {
    width: 100%;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
  }
}

.main {
  flex: 1;
  width: 100%;
  overflow: auto;
  font-size: 12px;
  h3 {
    width: 100%;
    font-size: 0.15rem;
    text-indent: 15px;
    background: #f0f0f0;
    border-top: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
    height: 0.4rem;
    line-height: 0.4rem;
  }
  div {
    padding: 10px 15px;
    line-height: 0.3rem;
  }
  table {
    width: 100%;
    background: #ffffff;
    border: 1px solid #e1e1e1;
    thead {
      tr {
        display: flex;
        flex-flow: row nowrap;
         border-bottom: 1px solid #e1e1e1;
        th {
          padding: 10px 0;
          color: #666666;
          font-weight: normal;
          text-align: center;
          &:nth-of-type(1),
          &:nth-of-type(5) {
            width: 20%;
          }
          &:nth-of-type(3) {
            width: 30%;
          }
          &:nth-of-type(2n) {
            width: 15%;
          }
          &:not(:nth-last-of-type(1)){
            border-right: 1px solid #e1e1e1;
          }
        }
      }
    }
     tbody {
      tr {
        display: flex;
        flex-flow: row nowrap;
        td {
          padding: 10px 0;
          color: #666666;
          font-weight: normal;
          text-align: center;
          &:nth-of-type(1),
          &:nth-of-type(5) {
            width: 20%;
          }
          &:nth-of-type(3) {
            width: 30%;
          }
          &:nth-of-type(2n) {
            width: 15%;
          }
          &:not(:nth-last-of-type(1)){
            border-right: 1px solid #e1e1e1;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div id="container">
    <myHeader :title="title"></myHeader>
    <div class="main">
      <div>
        <p>维修单状态：{{info.statNm}}</p>
        <p>设备编号：{{info.deviceCd}}</p>
        <p>小区名称：{{info.phNm}}</p>
        <p>设备名称：{{info.deviceNm}}</p>
        <p>维修单号：{{info.billCode}}</p>
        <p>申请时间：{{info.applicationTm}}</p>
        <p>申请单位：{{info.applicantUnitNm}}</p>
        <p>申请人：{{info.proposer}}</p>
        <p>联系电话：{{info.mob }}</p>
        <p>维修单位：{{info.repairUnitNm}}</p>
        <p>预算费用：{{info.estimatedCost}}</p>
        <p>故障描述：{{info.diagnosis}}</p>
         <h3>配件</h3>
        <p>是否更换配件：{{info.replaceFittingNm}}</p>
        <p>配件名称：{{info.stockNm}}</p>
        <p>配件规格：{{info.stockSpec}}</p>
        <p>配件品牌：{{info.stockBrand}}</p>
      </div>
      <!-- <h3>更换配件</h3> -->
    </div>
  </div>
</template>

<script>
import Loading from "../../../hero/components/loading";
import myHeader from "../components/myHead";
export default {
  data() {
    return {
      title: "设备维修详情",
      ipPk: "",
      devicePk:'',
      info: {},
      deviceInfo:{},
      data1: []
    };
  },
  components: {
    Loading,
    myHeader
  },
  mounted() {
    this.ipPk = this.until.getQueryString("ipPk");
    this.devicePk=this.until.getQueryString("pk")

    this.getInfo();
    //this.getDeviceInfo();
  },
  methods: {
    getInfo() {
      this.until.get("/ph/deviceRepair/info/" + this.ipPk).then(res => {
        this.info = res.data;
        console.log(this.info);
        
      });
    },
    // getDeviceInfo(){
    //   this.until.get("/ph/device/info/"+this.devicePk).then(
    //     res=>{
    //       if(res.status==='200'){
    //         this.deviceInfo=res.data
    //       }
    //     }
    //   )
    // }
  }
};
</script>


