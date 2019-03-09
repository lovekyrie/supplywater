<style lang="less" type="text/less">
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
  width: 100% !important;
  overflow-y: auto;
  .ivu-scroll-container {
    /*overflow-y:auto;*/
    height: 100% !important;
    .ivu-card-body {
      position: relative;
      p {
        line-height: 0.3rem;
        &:last-child {
          text-align: right;
          /*padding-right: 20px;*/
          span {
            display: inline-block;
            width: 1rem;
            text-align: center;
            border: 1px solid #e2e2e2;
            margin-left: 0.05rem;
            line-height: 0.3rem;
            height: 0.3rem;
            border-radius: 5px;
          }
        }
      }
      img {
        position: absolute;
        right: 20px;
        top: 40%;
        width: 0.3rem;
        /*transform: rotate(180deg);*/
        /*-ms-transform: rotate(180deg);		!* IE 9 *!*/
        /*-webkit-transform: rotate(180deg);	!* Safari and Chrome *!*/
        /*-o-transform: rotate(180deg);		!* Opera *!*/
        /*-moz-transform: rotate(180deg);		!* Firefox *!*/
      }
      span.btn {
        position: absolute;
        right: 20px;
        bottom: 20px;
        display: block;
        padding: 0.05rem 0.2rem;
        border: 1px solid #e2e2e2;
        border-radius: 3px;
      }
    }
  }
}
</style>

<template>
  <div id="container">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <myHeader :title="title" search="true" appBack="true"></myHeader>
    <p style="text-align: center; line-height: .3rem" v-show="total==0">暂无数据</p>

    <scroll class="main" :on-reach-bottom="handleReachBottom">
      <Card dis-hover v-for="(item, index) in list" class="list" :key="index">
        <div @click="toDetail(item.deviceRepairPk,item.devicePk)">
          <p>
            <span>设备编号：</span>
            {{item.deviceCd}}
          </p>
          <p>
            <span>小区名称：</span>
            {{item.estateNm}}
          </p>
          <p>
            <span>设备名称：</span>
            {{item.deviceScatNm}}
          </p>
          <p>
            <span>维修单号：</span>
            {{item.billCode}}
          </p>
          <p>
            <span>申请时间：</span>
            {{item.applicationTm | toDate}}
          </p>
          <p>
            <span>申请单位：</span>
            {{item.applicantUnitNm}}
          </p>
          <p>
            <span>申请人：{{item.proposer}}</span>
          </p>
          <p>
            <span>处理状态：</span>
            {{item.statNm}}
          </p>
          <img src="../components/img/toDetail.png">
        </div>
      </Card>
    </scroll>
    <p style="text-align: center; line-height: .3rem" v-show="noMore">数据已加载完</p>
  </div>
</template>

<script>
import Loading from "../../../hero/components/loading";
import myHeader from "../components/myHead";
export default {
  data() {
    return {
      title: "设备维修查询",
      spinShow: false,
      noMore: false,
      pageNo: 1,
      pageSize: 10,
      total: 0,
      list: [],

      //搜索字段
      sbCd: "", //设备编号
      districtCd: "", //设备名称
      estateNm: "", //小区名称
      billCode: "", //维修单号
      applyTime: "", //申请时间
      applyUnit: "", //申请单位
      treatState: "" //处理状态
    };
  },
  components: {
    Loading,
    myHeader
  },
  mounted() {
    let myData = JSON.parse(this.until.getQueryString("search"));
    console.log(myData);
    if (myData) {
      this.sbCd = myData.sbCd;
      this.estateNm = myData.estateNm;
      this.districtCd = myData.districtCd;
      this.billCode = myData.repairNo;
      this.applyUnit = myData.applyUnit;
      this.treatState = myData.treatState;
    }

    let cookieVal = this.until.getCookie("yui2-token");
    if (!cookieVal) {
      let promise = this.until.login();
      promise.then(res => {
        this.getList();
      });
    } else {
      this.getList();
    }
  },
  filters: {
    toDate(i) {
      return i.split(" ")[0];
    }
  },
  methods: {
    getList() {
      this.spinShow = true;
      let $q = new Promise((resolve, reject) => {
        let query = new this.Query();

        //搜索功能函数,查询特定数据下的信息

        if (this.sbCd) {
          query.buildWhereClause("deviceCd", this.sbCd, "LK");
        }
        if (this.estateNm) {
          query.buildWhereClause("estateNm", this.estateNm, "LK");
        }
        if (this.districtCd) {
          query.buildWhereClause("deviceScatNm", this.districtCd, "LK");
        }
        if (this.billCode) {
          query.buildWhereClause("billCode", this.billCode, "LK");
        }
        if (this.applyUnit) {
          query.buildWhereClause("applicantUnitNm", this.applyUnit, "LK");
        }
        if (this.treatState) {
          query.buildWhereClause("statCd", this.treatState, "LK");
        }

        query.buildPageClause(this.pageNo, this.pageSize);
        let param = query.getParam();
        this.until.get("/ph/deviceRepair/page", param).then(
          res => {
            if (res.status == 200) {
              this.spinShow = false;
              this.total = res.page.total;
              if (res.data.items) {
                this.list.push(...res.data.items);
              }
            }
            resolve("ok");
          },
          err => {}
        );
      });
      return $q;
    },

    toDetail(repPk) {
      let url = "detail.html?repPk=" + repPk;
      window.location.href = url;
    },
    //到底部时触发
    handleReachBottom() {
      return new Promise(resolve => {
        setTimeout(() => {
          if (this.list.length < this.total) {
            this.pageNo++;
            this.getList();
          } else {
            this.noMore = true;
          }
          resolve();
        }, 2000);
      });
    }
  }
};
</script>


